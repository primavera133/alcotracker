import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoredUnit {
  name: string;
  num: string;
  _num: number;
  abv: string;
  _abv: number;
  vol: string;
  _vol: number;
  units: number;
}

interface PersistedState {
  storedUnits: StoredUnit[];
  addStoredUnit: (value: StoredUnit) => void;
}

export const usePersistedStore = create<PersistedState>()(
  persist(
    (set, get) => ({
      storedUnits: JSON.parse(localStorage.getItem("storedUnits") || "[]"),
      addStoredUnit: (value) =>
        set((state) => {
          const updatedUnits = [...state.storedUnits, value];
          localStorage.setItem("storedUnits", JSON.stringify(updatedUnits));
          return { storedUnits: updatedUnits };
        }),
    }),
    {
      name: "alcotracker",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
