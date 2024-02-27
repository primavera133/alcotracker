import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { ListRecords } from "../components/ListRecords";
import { alcoTrackerDB } from "../db/db";
import { queryGetRecords } from "../db/getRecords";
import { useRecordsStore } from "../stores/recordsStore";

const batchSize = 10;

export function Records() {
  const recordsCount = useRecordsStore((state) => state.recordsCount);
  const setRecordsCount = useRecordsStore((state) => state.setRecordsCount);
  const recordsOffset = useRecordsStore((state) => state.recordsOffset);
  const setRecordsOffset = useRecordsStore((state) => state.setRecordsOffset);

  const setRecords = useRecordsStore((state) => state.setRecords);

  useEffect(() => {
    (async () => {
      setRecordsCount(await alcoTrackerDB.count("records"));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      setRecords(await queryGetRecords(batchSize, recordsOffset));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordsOffset]);

  const loadPrevious = async () => {
    setRecordsOffset(recordsOffset - batchSize);
  };

  const loadNext = async () => {
    setRecordsOffset(recordsOffset + batchSize);
  };

  return (
    <>
      <Box id="statistics" maxWidth={"lg"}>
        <Heading as="h1" m={4}>
          Your listed records
        </Heading>

        <Box mx={4}>
          <ListRecords />
        </Box>

        <Box>
          <Button
            onClick={loadPrevious}
            isDisabled={recordsOffset - batchSize < 0}
          >
            Previous
          </Button>
          <Button
            onClick={loadNext}
            isDisabled={recordsOffset + batchSize > recordsCount}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
