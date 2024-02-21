export const calculateUnits = (_num: number, _abv: number, _vol: number): number => {
    if (!_abv || !_vol) return 0;
    if (!_num) return 0;
  
    return _num * ((_abv * _vol) / 100);
  };
  