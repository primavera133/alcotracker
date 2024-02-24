import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StoredItem } from "../db/db";
import { queryGetLast } from "../db/getLast";

export function List() {
  const [records, setRecords] = useState<StoredItem[]>();

  useEffect(() => {
    (async () => {
      const lastRecords = await queryGetLast(10);
      setRecords(lastRecords);
    })();
  }, []);

  return (
    <Box id="statistics">
      <Heading as="h1">LIST VIEW</Heading>

      <UnorderedList>
        {records?.map((r, idx) => (
          <ListItem key={`item-${idx}`}>{JSON.stringify(r)} </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
