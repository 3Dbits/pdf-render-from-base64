import {
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  Text,
  Tooltip,
  useToast,
  HStack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Dispatch, SetStateAction, useState } from "react";

interface Base64Storage {
  date: Date;
  pdfBase64: string;
  pdfName?: string;
}

interface IProps {
  pdfString: string;
  setPdf: Dispatch<SetStateAction<string>>;
}

function SavedBase64({ pdfString, setPdf }: IProps) {
  const [base64List, setBase64List] = useState([] as Base64Storage[]);
  const toast = useToast();

  const saveNewBase64 = () => {
    if (pdfString.length === 0) {
      toast({
        title: "Base64 is empty!",
        description: "Please input some text to save Base64.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setBase64List((prevState) => [
      {
        date: new Date(),
        pdfBase64: pdfString,
        pdfName: pdfString.substring(0, 10) + "...",
      },
      ...prevState,
    ]);
  };

  const deleteBase64 = (index: number) => {
    setBase64List((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Session storage! If you close tab or browser, the list will selfdestruct!"
        bg="gray.300"
        color="black"
        closeDelay={300}
        placement="right"
        aria-label="A tooltip"
      >
        <Button shadow="lg" onClick={saveNewBase64}>
          Click to stash!
        </Button>
      </Tooltip>
      <Box maxHeight="80vh" backgroundColor="white">
        {base64List.map((base64, index) => (
          <Box
            shadow="lg"
            p="3"
            rounded="md"
            key={base64.pdfBase64}
            onClick={() => setPdf(base64.pdfBase64)}
            width="130px"
          >
            <HStack>
              <Text>
                {base64.date.getHours()}:
                {String(base64.date.getMinutes()).padStart(2, "0")}
              </Text>
              <Spacer />
              <IconButton
                size="xs"
                aria-label="Delete stashed base64 item"
                icon={<DeleteIcon />}
                onClick={() => deleteBase64(index)}
              />
            </HStack>
            <Editable defaultValue={base64.pdfName}>
              <EditablePreview />
              <EditableTextarea />
            </Editable>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default SavedBase64;
