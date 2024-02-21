import { Box, Heading } from "@chakra-ui/react";
import { usePersistedStore } from "../stores/persistedStore";

export function Statistics() {
  const storedUnits = usePersistedStore((state) => state.storedUnits);

  return (
    <Box id="statistics">
      <Heading as="h1">STATS VIEW</Heading>
      {storedUnits.map((unit) => (
        <Box>{JSON.stringify(unit)}</Box>
      ))}
    </Box>
  );
}
