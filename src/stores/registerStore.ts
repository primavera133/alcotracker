import { create } from "zustand";

interface RegisterState { 
    name: string;
    setName: (value: string) => void;
    
    num: string;
    setNum: (value: string) => void;
    _num: number;
    set_Num: (value: number) => void;

    abv: string;
    setAbv: (value: string) => void;
    _abv: number;
    set_Abv: (value: number) => void;
    
    vol: string;
    setVol: (value: string) => void;
    _vol: number;
    set_Vol: (value: number) => void;

    units: number;
    setUnits: (value: number) => void;

    resetForm: () => void;
}

export const useRegisterStore = create<RegisterState>()((set) => ({
    name: "",
    setName: value => set({ name: value}),

    num: "1",
    setNum: value => set({ num: value}),
    _num: 1,
    set_Num: value => set({ _num: value}),

    abv: "",
    setAbv: value => set({ abv: value}),
    _abv: 0,
    set_Abv: value => set({ _abv: value}),

    vol: "",
    setVol: value => set({ vol: value}),
    _vol: 0,
    set_Vol: value => set({ _vol: value}),

    units: 0,
    setUnits: value => set({units: value}),

    resetForm: () => set({
        name: "",
        num: "1",
        _num: 1,
        abv: "",
        _abv: 0,
        vol: "",
        _vol: 0,
        units: 0
    })
  }))