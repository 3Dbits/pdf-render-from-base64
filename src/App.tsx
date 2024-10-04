import {
  Textarea,
  Link,
  Image,
  Flex,
  Box,
  Button,
  VStack,
  useClipboard,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import SavedBase64 from "./SavedBase64";
import DownloadButton from "./DownloadButton";

function App() {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  const handeStringChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handeStringClear = () => {
    setValue("");
  };

  return (
    <Flex gap="2" p="2" h="100vh">
      <VStack minW="32">
        <Link href="https://base64topdf.netlify.app/">
          <Image src="/3DBitsPDF2.png" alt="logo" />
        </Link>
        <DownloadButton pdf={value} />
        <SavedBase64 pdfString={value} setPdf={setValue} />
      </VStack>
      <Box flex="1">
        <Flex gap="2" mb="2">
          <Textarea
            placeholder="Input Base64 text to render PDF"
            _placeholder={{ textAlign: "center" }}
            size="xs"
            h="20"
            onChange={handeStringChange}
            value={value}
          />
          <VStack minW="20">
            <Button onClick={onCopy} size="sm" shadow="lg">
              {hasCopied ? "Copied!" : "Copy"}
            </Button>
            <Button onClick={handeStringClear} size="sm" shadow="lg">
              Clear
            </Button>
          </VStack>
        </Flex>
        {value.length !== 0 && (
          <embed
            src={`data:application/pdf;base64,${value}`}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ maxHeight: "calc(100vh - 100px)" }}
          />
        )}
      </Box>
    </Flex>
  );
}

export default App;
