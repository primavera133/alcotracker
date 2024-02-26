import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRegisterStore } from "../stores/registerStore";
import { calculateUnits } from "../utils/calculateUnits";

export function Units() {
  const name = useRegisterStore((state) => state.name);
  const _num = useRegisterStore((state) => state._num);
  const _abv = useRegisterStore((state) => state._abv);
  const _vol = useRegisterStore((state) => state._vol);

  const units = useRegisterStore((state) => state.units);
  const setUnits = useRegisterStore((state) => state.setUnits);

  useEffect(() => {
    if (!_num || !_abv || !_vol) return;

    setUnits(calculateUnits(_num, _abv, _vol));
  }, [_num, _abv, _vol, setUnits]);

  return (
    <Box pb={4}>
      {name && _abv && _vol ? (
        <>
          {_num ? <>{_num} </> : <>1 </>}
          {name}
          {_num > 1 && <>s</>}
          <> </>equals to {units} units of alcohol
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}
