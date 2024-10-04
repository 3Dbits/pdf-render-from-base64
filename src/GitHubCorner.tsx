import { Box, Link, Text } from "@chakra-ui/react";

const GitHubCorner = () => {
  return (
    <Link href="https://github.com/3Dbits" isExternal>
      <Box
        position="fixed"
        bottom="1"
        left="1"
        px="2"
        zIndex="1000"
        border="2px"
        borderRadius="xl"
        backgroundColor="blue.300"
        h="8"
      >
        <Text color="black" as="b" className="pixelify-sans">
          3DBits
        </Text>
      </Box>
    </Link>
  );
};

export default GitHubCorner;
