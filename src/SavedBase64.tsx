import {
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
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
        <Button shadow="lg" p="2" onClick={saveNewBase64}>
          Click to stash!
        </Button>
      </Tooltip>
      <Box maxHeight="80vh">
        {base64List.map((base64) => (
          <Box
            shadow="lg"
            p="3"
            key={base64.pdfBase64}
            onClick={() => setPdf(base64.pdfBase64)}
            width="107px"
          >
            <Text>
              {base64.date.getHours()}:{base64.date.getMinutes()}:
              {base64.date.getSeconds()}
            </Text>
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
