import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StoredItem, alcoTrackerDB } from "../db/db";

export function Statistics() {
  const [results, setResults] = useState<StoredItem[]>();

  useEffect(() => {
    (async () => {
      setResults(await alcoTrackerDB.getAll("items"));
    })();
  }, []);

  return (
    // this week
    // Last week
    // Weekly average since first
    // Weekly average last 3 months
    // days of alcohol intake last 3 months

    <Box id="statistics">
      <Heading as="h1">STATS VIEW</Heading>

      <UnorderedList>
        {results?.map((r, idx) => (
          <ListItem key={`item-${idx}`}>{JSON.stringify(r)} </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
