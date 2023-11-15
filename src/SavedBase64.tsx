import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface Base64Storage {
  date: Date;
  pdfBase64: string;
}

interface IProps {
  pdfString: string;
  setPdf: Dispatch<SetStateAction<string>>;
}

function SavedBase64({ pdfString, setPdf }: IProps) {
  const [base64List, setBase64List] = useState([] as Base64Storage[]);
  const saveNewBase64 = () => {
    setBase64List((prevState) => [
      ...prevState,
      { date: new Date(), pdfBase64: pdfString },
    ]);
  };

  return (
    <>
      <Link href="https://base64topdf.netlify.app/">
        <Image src="/Screenshot_21.png" alt="logo" />
      </Link>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Button shadow="lg" p="2" onClick={saveNewBase64}>
            Click to save!
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            Session storage! If you close tab or browser list will selfdestruct!
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {base64List.map((base64) => (
        <Box
          shadow="lg"
          p="3"
          key={base64.pdfBase64}
          onClick={() => setPdf(base64.pdfBase64)}
        >
          <Text>
            {base64.date.getHours()}:{base64.date.getMinutes()}:
            {base64.date.getSeconds()}
          </Text>
          <Text>{base64.pdfBase64.substring(0, 20)}...</Text>
        </Box>
      ))}
    </>
  );
}

export default SavedBase64;
