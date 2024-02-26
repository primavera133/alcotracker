import { Box, Button, useToast } from "@chakra-ui/react";
import { MdSave } from "react-icons/md";
import { StoredRecord, alcoTrackerDB } from "../db/db";
import { useRecordsStore } from "../stores/recordsStore";
import { useRegisterStore } from "../stores/registerStore";

interface AddUnitsProps {
  update?: boolean;
  onClose?: () => void;
}

export function AddUnits({ update = false, onClose }: AddUnitsProps) {
  const recordId = useRegisterStore((state) => state.recordId);
  const createdAt = useRegisterStore((state) => state.createdAt);
  const name = useRegisterStore((state) => state.name);
  const dateTime = useRegisterStore((state) => state.dateTime);
  const num = useRegisterStore((state) => state.num);
  const _num = useRegisterStore((state) => state._num);
  const abv = useRegisterStore((state) => state.abv);
  const _abv = useRegisterStore((state) => state._abv);
  const vol = useRegisterStore((state) => state.vol);
  const _vol = useRegisterStore((state) => state._vol);

  const units = useRegisterStore((state) => state.units);
  const resetForm = useRegisterStore((state) => state.resetForm);
  const updateRecord = useRecordsStore((state) => state.updateRecord);
  const setGroupedRecords = useRecordsStore((state) => state.setGroupedRecords);

  const toast = useToast();

  const getFormBaseState = () => {
    return {
      name,
      date: dateTime.toISOString(),
      num,
      _num,
      abv,
      _abv,
      vol,
      _vol,
      units,
    };
  };

  const handleAddUnits = () => {
    const now = new Date().toISOString();
    alcoTrackerDB.add("records", {
      ...getFormBaseState(),
      createdAt: now,
      updatedAt: now,
    });

    resetForm();
    toast({
      title: `${units} units added.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleUpdateRecord = () => {
    if (!update || !createdAt || !recordId) return;
    const now = new Date().toISOString();

    const updatedRecord: StoredRecord = {
      ...getFormBaseState(),
      recordId: recordId,
      createdAt: createdAt,
      updatedAt: now,
    };

    alcoTrackerDB.put("records", updatedRecord);
    updateRecord(updatedRecord);

    if (onClose) onClose();

    toast({
      title: `record updated.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  if (!units) return null;

  return (
    <Box p={2}>
      {update ? (
        <Button leftIcon={<MdSave />} onClick={handleUpdateRecord}>
          Update record
        </Button>
      ) : (
        <Button leftIcon={<MdSave />} onClick={handleAddUnits}>
          Add {units} Units
        </Button>
      )}
    </Box>
  );
}
