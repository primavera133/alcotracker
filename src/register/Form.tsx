import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRegisterStore } from "../stores/registerStore";

export function Form() {
  const name = useRegisterStore((state) => state.name);
  const setName = useRegisterStore((state) => state.setName);
  const num = useRegisterStore((state) => state.num);
  const setNum = useRegisterStore((state) => state.setNum);
  const set_Num = useRegisterStore((state) => state.set_Num);

  const abv = useRegisterStore((state) => state.abv);
  const setAbv = useRegisterStore((state) => state.setAbv);
  const set_Abv = useRegisterStore((state) => state.set_Abv);

  const vol = useRegisterStore((state) => state.vol);
  const setVol = useRegisterStore((state) => state.setVol);
  const set_Vol = useRegisterStore((state) => state.set_Vol);

  useEffect(() => {
    const _num = parseInt(num, 10);
    if (isNaN(_num)) {
      setNum("");
      return set_Num(1);
    }
    set_Num(_num);
  }, [num, setNum, set_Num]);

  useEffect(() => {
    const _abv = parseFloat(abv);
    set_Abv(_abv);
  }, [abv, set_Abv]);

  useEffect(() => {
    const _vol = parseFloat(vol.replace(",", "."));
    set_Vol(_vol);
  }, [vol, set_Vol]);

  return (
    <FormControl pb={4}>
      <Box px={2} mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormHelperText>Put a name on your drink</FormHelperText>
      </Box>
      <Box px={2} mb={4}>
        <FormLabel>Number</FormLabel>
        <Input
          type="text"
          value={num ?? ""}
          onChange={(e) => setNum(e.target.value)}
        />
        <FormHelperText>How strong was it?</FormHelperText>
      </Box>
      <Box px={2} mb={4}>
        <FormLabel>ABV %</FormLabel>
        <Input
          type="text"
          value={abv ?? ""}
          onChange={(e) => setAbv(e.target.value)}
        />
        <FormHelperText>How strong was it?</FormHelperText>
      </Box>
      <Box px={2} mb={4}>
        <FormLabel>Volume cl</FormLabel>
        <Input
          type="text"
          value={vol ?? ""}
          onChange={(e) => setVol(e.target.value)}
        />
        <FormHelperText>How large was it?</FormHelperText>
      </Box>
    </FormControl>
  );
}
