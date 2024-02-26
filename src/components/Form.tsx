import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { StoredRecord } from "../db/db";
import { useRegisterStore } from "../stores/registerStore";

interface FormProps {
  record?: StoredRecord | null;
}

export function Form({ record }: FormProps) {
  const name = useRegisterStore((state) => state.name);
  const setName = useRegisterStore((state) => state.setName);

  const dateTime = useRegisterStore((state) => state.dateTime);
  const setDateTime = useRegisterStore((state) => state.setDateTime);

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
    if (record) {
      setName(record.name);
      setDateTime(new Date(record.date));
      setNum(record.num);
      setAbv(record.abv);
      setVol(record.vol);
    }
  }, [record, setName, setDateTime, setNum, setAbv, setVol]);

  useEffect(() => {
    const _num = parseInt(num, 10);
    if (isNaN(_num)) {
      setNum("");
      return set_Num(1);
    }
    set_Num(_num);
  }, [num, setNum, set_Num]);

  useEffect(() => {
    const _abv = parseFloat(abv.replace(",", "."));
    set_Abv(_abv);
  }, [abv, set_Abv]);

  useEffect(() => {
    const _vol = parseFloat(vol.replace(",", "."));
    set_Vol(_vol);
  }, [vol, set_Vol]);

  const offset = dateTime.getTimezoneOffset();
  const localDateTime = new Date(dateTime.getTime() - offset * 60000);
  const formattedDateTimeValue = localDateTime.toISOString().slice(0, 16);

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
        <FormLabel>Date</FormLabel>
        <Input
          type="datetime-local"
          value={formattedDateTimeValue}
          onChange={(e) => setDateTime(new Date(e.target.value))}
        />
        <FormHelperText>When did you drink?</FormHelperText>
      </Box>
      <Box px={2} mb={4}>
        <FormLabel>Number</FormLabel>
        <Input
          type="text"
          value={num ?? ""}
          onChange={(e) => {
            setNum(e.target.value);
          }}
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
