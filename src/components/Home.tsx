import { Box, Heading, Image, Text } from "@chakra-ui/react";

export function Home() {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Alcotracker
      </Heading>
      <Text mb={4}>The privacy-first alcohol tracker</Text>
      <Image
        boxSize={"32rem"}
        objectFit="contain"
        src="/alcotracker.jpeg"
        mb={4}
      />
      Version {process.env.REACT_APP_VERSION}
    </Box>
  );
}
