import { Box, Button, useToast } from "@chakra-ui/react";
import { usePersistedStore } from "../stores/persistedStore";
import { useRegisterStore } from "../stores/registerStore";

export function AddUnits() {
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

  const addStoredUnit = usePersistedStore((state) => state.addStoredUnit);

  const toast = useToast();

  const handleAddUnits = () => {
    const now = new Date().toISOString();
    addStoredUnit({
      name,
      date: dateTime.toISOString(),
      num,
      _num,
      abv,
      _abv,
      vol,
      _vol,
      units,
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

  if (!units) return null;

  return (
    <Box pb={4}>
      <Button onClick={handleAddUnits}>Add {units} Units</Button>
    </Box>
  );
}
