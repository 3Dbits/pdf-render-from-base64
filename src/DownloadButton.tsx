import { Button, useToast } from "@chakra-ui/react";
import saveAs from "file-saver";

interface DownloadButtonProps {
  pdf: string;
}

function DownloadButton({ pdf }: DownloadButtonProps) {
  const toast = useToast();
  const downloadPdf = () => {
    if (pdf.length === 0) {
      toast({
        title: "Base64 is empty!",
        description: "Please input Base64 to render PDF.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const byteCharacters = atob(pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      saveAs(blob, "download.pdf");
    } catch (error) {
      toast({
        title: "Base64 is not representing valid PDF!",
        description: "Please input correct Base64 to render PDF.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button shadow="lg" p="2" onClick={downloadPdf}>
      Download PDF
    </Button>
  );
}

export default DownloadButton;
