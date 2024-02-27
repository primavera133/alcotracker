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
import { MdArrowRight, MdClose, MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { StoredRecord, alcoTrackerDB } from "../db/db";
import { useRecordsStore } from "../stores/recordsStore";
import { useRegisterStore } from "../stores/registerStore";
import { AddUnits } from "./AddUnits";
import { Form } from "./Form";
import { Units } from "./Units";

export function ListRecords({ onClose }: { onClose?: () => void }) {
  const [selectedRecord, setSelectedRecord] = useState<StoredRecord | null>(
    null
  );
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDeleteable, setIsDeletable] = useState<boolean>(false);

  const records = useRecordsStore((state) => state.records);
  const groupedRecords = useRecordsStore((state) => state.groupedRecords);
  const setGroupedRecords = useRecordsStore((state) => state.setGroupedRecords);
  const deleteRecord = useRecordsStore((state) => state.deleteRecord);

  const setRecordId = useRegisterStore((state) => state.setRecordId);
  const setCreatedAt = useRegisterStore((state) => state.setCreatedAt);
  const resetForm = useRegisterStore((state) => state.resetForm);

  useEffect(() => {
    if (records) setGroupedRecords(records);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records]);

  useEffect(() => {
    if (isEditable && selectedRecord && selectedRecord.recordId) {
      setRecordId(selectedRecord.recordId);
      setCreatedAt(selectedRecord.createdAt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable, selectedRecord]);

  const handleItemClick = (record: StoredRecord) => {
    setIsDeletable(false);
    if (selectedRecord?.recordId !== record.recordId) {
      return setSelectedRecord(record);
    }
    resetForm();
    setSelectedRecord(null);
  };

  const handleEditRecord = () => {
    setIsEditable(true);
  };

  const handleClose = async () => {
    resetForm();
    setIsEditable(false);
    setSelectedRecord(null);
    if (onClose) onClose();
  };

  const handleDeleteRecord = () => {
    if (!selectedRecord?.recordId) return;
    alcoTrackerDB.delete("records", selectedRecord.recordId);
    deleteRecord(selectedRecord);
    setSelectedRecord(null);
    setIsDeletable(false);
  };

  if (!groupedRecords) return null;
  return (
    <List>
      {Object.keys(groupedRecords).map((records, idx) => (
        <ListItem key={records} mb={4}>
          <Heading as="h2" size={"md"}>
            {records}
          </Heading>
          <List my={2}>
            {groupedRecords[records]?.map((record, idx) => (
              <ListItem key={`item-${idx}`} my={2}>
                {selectedRecord?.recordId !== record.recordId ? (
                  <Flex
                    onClick={() => handleItemClick(record)}
                    alignItems="center"
                  >
                    <ListIcon as={MdArrowRight} />
                    <strong>
                      {record.num} {record.name}
                    </strong>
                    , {record.units} units
                  </Flex>
                ) : (
                  <Card my={4}>
                    <CardBody>
                      <Flex justify="space-between">
                        <Heading
                          as="h4"
                          mb={4}
                          size="md"
                          onClick={() => handleItemClick(record)}
                        >
                          {record.num} {record.name}
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
                            <ListItem>
                              Date: {format(record.date, "yyyy-MM-dd : HH:mm")}
                            </ListItem>
                            <ListItem>ABV: {record.abv}%</ListItem>
                            <ListItem mb={2}>Volume: {record.vol} cl</ListItem>
                            <ListItem>
                              <strong>Calculated units: {record.units}</strong>
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
                              my={4}
                              onClick={handleEditRecord}
                            >
                              Edit record
                            </Button>

                            {!isDeleteable && (
                              <Button
                                leftIcon={<TiDelete />}
                                variant="solid"
                                size="md"
                                my={4}
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
                                my={4}
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
  );
}
