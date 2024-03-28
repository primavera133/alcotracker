import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface DbState {
  initialized: boolean;
  setInitialized: (value: boolean) => void;
}

export const useDbStore = create<DbState>()(
  immer((set) => ({
    initialized: false,
    setInitialized: (value) => set({ initialized: value }),
  }))
);
