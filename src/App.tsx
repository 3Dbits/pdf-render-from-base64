import { Textarea, Grid, GridItem } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import SavedBase64 from "./SavedBase64";

function App() {
  const [pdf, setPdf] = useState("");

  const handeStringChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPdf(e.target.value);
  };

  return (
    <Grid
      templateAreas={`"sidebar textarea"
                      "sidebar pdfrender"`}
      gridTemplateColumns={"150px 1fr"}
    >
      <GridItem pl="2" pt="2" area={"sidebar"}>
        <SavedBase64 pdfString={pdf} setPdf={setPdf} />
      </GridItem>
      <GridItem pt="2" area={"textarea"}>
        <Textarea
          placeholder="Input Base64 text to render PDF"
          _placeholder={{ textAlign: "center" }}
          size="xs"
          h="20"
          onChange={handeStringChange}
          value={pdf}
        />
      </GridItem>
      <GridItem pt="2" area={"pdfrender"}>
        {pdf.length !== 0 && (
          <embed
            src={`data:application/pdf;base64,${pdf}`}
            type="application/pdf"
            width="100%"
            height="1000px"
          ></embed>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
