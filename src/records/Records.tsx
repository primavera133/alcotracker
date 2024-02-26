import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaGlassWater } from "react-icons/fa6";
import { MdClose, MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { AddUnits } from "../components/AddUnits";
import { Form } from "../components/Form";
import { Units } from "../components/Units";
import { StoredRecord, alcoTrackerDB } from "../db/db";
import { queryGetLast } from "../db/getLast";
import { useRecordsStore } from "../stores/recordsStore";
import { useRegisterStore } from "../stores/registerStore";

export function Records() {
  const [selectedRecord, setSelectedRecord] = useState<StoredRecord | null>(
    null
  );
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDeleteable, setIsDeletable] = useState<boolean>(false);

  const setRecords = useRecordsStore((state) => state.setRecords);
  const groupedRecords = useRecordsStore((state) => state.groupedRecords);
  const setGroupedRecords = useRecordsStore((state) => state.setGroupedRecords);
  const deleteRecord = useRecordsStore((state) => state.deleteRecord);

  const setRecordId = useRegisterStore((state) => state.setRecordId);
  const setCreatedAt = useRegisterStore((state) => state.setCreatedAt);
  const resetForm = useRegisterStore((state) => state.resetForm);

  useEffect(() => {
    (async () => {
      const lastRecords = await queryGetLast(10);
      setRecords(lastRecords);
      setGroupedRecords(lastRecords);
    })();
  }, []);

  useEffect(() => {
    if (isEditable && selectedRecord && selectedRecord.recordId) {
      setRecordId(selectedRecord.recordId);
      setCreatedAt(selectedRecord.createdAt);
    }
  }, [isEditable, selectedRecord]);

  const handleItemClick = (record: StoredRecord) => {
    setIsDeletable(false);
    if (selectedRecord?.recordId !== record.recordId) {
      return setSelectedRecord(record);
    }
    resetForm();
    setSelectedRecord(null);
  };

  const editRecord = () => {
    setIsEditable(true);
  };

  const handleClose = async () => {
    resetForm();
    setIsEditable(false);
    setSelectedRecord(null);
  };

  const handleDeleteRecord = () => {
    if (!selectedRecord?.recordId) return;
    alcoTrackerDB.delete("records", selectedRecord.recordId);
    deleteRecord(selectedRecord);
    setSelectedRecord(null);
    setIsDeletable(false);
  };

  return (
    <>
      <Box id="statistics" maxWidth={"lg"}>
        <Heading as="h1" mb={4}>
          Your listed records
        </Heading>

        {groupedRecords && (
          <List>
            {Object.keys(groupedRecords).map((records, idx) => (
              <ListItem key={records} mb={4}>
                <Heading as="h2" size={"md"}>
                  {records}
                </Heading>
                <List>
                  {groupedRecords[records]?.map((record, idx) => (
                    <ListItem key={`item-${idx}`} my={2}>
                      {selectedRecord?.recordId !== record.recordId ? (
                        <Flex onClick={() => handleItemClick(record)}>
                          <ListIcon as={FaGlassWater} ml={4} />
                          <strong>{record.name}</strong>, {record.units} units
                        </Flex>
                      ) : (
                        <Card m={4}>
                          <CardBody>
                            <Flex justify="space-between">
                              <Heading
                                as="h4"
                                size="md"
                                mb={2}
                                onClick={() => handleItemClick(record)}
                              >
                                {record.name}, {record.units} units
                              </Heading>
                              <Box>
                                <IconButton
                                  icon={<MdClose />}
                                  aria-label="close"
                                  onClick={() => handleItemClick(record)}
                                  size="s"
                                />
                              </Box>
                            </Flex>
                            {isEditable && selectedRecord ? (
                              <Box>
                                <Form record={selectedRecord} />
                                <Units />
                                <AddUnits
                                  update={true}
                                  onClose={() => handleClose()}
                                />
                              </Box>
                            ) : (
                              <>
                                <List mb={2}>
                                  <ListItem>Amount: {record.num}</ListItem>
                                  <ListItem>ABV: {record.abv}%</ListItem>
                                  <ListItem mb={2}>
                                    Volume: {record.vol} cl
                                  </ListItem>
                                  <ListItem>
                                    Created at:{" "}
                                    {format(
                                      record.createdAt,
                                      "yyyy-MM-dd : HH:mm:ss"
                                    )}
                                  </ListItem>
                                  <ListItem mb={4}>
                                    Updated at:
                                    {format(
                                      record.updatedAt,
                                      "yyyy-MM-dd : HH:mm:ss"
                                    )}
                                  </ListItem>
                                </List>
                                <Flex
                                  direction="row"
                                  alignItems="flex-end"
                                  flexWrap="wrap"
                                >
                                  <Button
                                    leftIcon={<MdEdit />}
                                    variant="solid"
                                    size="md"
                                    mr={4}
                                    mb={4}
                                    onClick={editRecord}
                                  >
                                    Edit record
                                  </Button>

                                  {!isDeleteable && (
                                    <Button
                                      leftIcon={<TiDelete />}
                                      variant="solid"
                                      size="md"
                                      mr={4}
                                      mb={4}
                                      onClick={() => setIsDeletable(true)}
                                    >
                                      Delete record
                                    </Button>
                                  )}
                                  {isDeleteable && (
                                    <Button
                                      leftIcon={<TiDelete />}
                                      variant="solid"
                                      size="md"
                                      mr={4}
                                      mb={4}
                                      colorScheme="red"
                                      onClick={handleDeleteRecord}
                                    >
                                      Click again to delete record
                                    </Button>
                                  )}
                                </Flex>
                              </>
                            )}
                          </CardBody>
                        </Card>
                      )}
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  );
}
