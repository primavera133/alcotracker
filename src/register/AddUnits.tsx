import { Box, Button } from "@chakra-ui/react";
import { usePersistedStore } from "../stores/persistedStore";
import { useRegisterStore } from "../stores/registerStore";

export function AddUnits() {
  const name = useRegisterStore((state) => state.name);
  const num = useRegisterStore((state) => state.num);
  const _num = useRegisterStore((state) => state._num);
  const abv = useRegisterStore((state) => state.abv);
  const _abv = useRegisterStore((state) => state._abv);
  const vol = useRegisterStore((state) => state.vol);
  const _vol = useRegisterStore((state) => state._vol);

  const units = useRegisterStore((state) => state.units);

  const addStoredUnit = usePersistedStore((state) => state.addStoredUnit);

  const handleAddUnits = () => {
    addStoredUnit({ name, num, _num, abv, _abv, vol, _vol, units });
  };

  if (!units) return null;

  return (
    <Box pb={4}>
      <Button onClick={handleAddUnits}>Add {units} Units</Button>
    </Box>
  );
}
