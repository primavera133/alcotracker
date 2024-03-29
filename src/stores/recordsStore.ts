import { format } from "date-fns";
import { produce } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { StoredRecord } from "../db/db";

interface GroupedStoredRecords {
  [key: string]: StoredRecord[];
}

interface RecordsState {
  recordsCount: number;
  setRecordsCount: (value: number) => void;
  recordsOffset: number;
  setRecordsOffset: (value: number) => void;
  records?: StoredRecord[];
  setRecords: (value: StoredRecord[]) => void;
  groupedRecords?: GroupedStoredRecords;
  setGroupedRecords: (value: StoredRecord[]) => void;
  updateRecord: (value: StoredRecord) => void;
  deleteRecord: (value: StoredRecord) => void;
}

const normaliseList = (records: StoredRecord[]) => {
  const result: any = records.reduce((prev: any, curr: StoredRecord) => {
    const date = format(new Date(curr.date), "yyyy-MM-dd");
    (prev[date] = prev[date] || []).push(curr);
    return prev;
  }, {});
  return result;
};

export const useRecordsStore = create<RecordsState>()(
  immer((set) => ({
    recordsCount: 0,
    setRecordsCount: (value) => set({ recordsCount: value }),
    recordsOffset: 0,
    setRecordsOffset: (value) => set({ recordsOffset: value }),
    setRecords: (value) => set({ records: value }),
    setGroupedRecords: (value) => set({ groupedRecords: normaliseList(value) }),
    updateRecord: (value) =>
      set(
        produce((draft) => {
          const idx = draft.records.findIndex(
            (r: StoredRecord) => r.recordId === value.recordId
          );
          draft.records[idx] = value;
          draft.groupedRecords = normaliseList(draft.records);
        })
      ),
    deleteRecord: (value) =>
      set(
        produce((draft) => {
          const idx = draft.records.findIndex(
            (r: StoredRecord) => r.recordId === value.recordId
          );
          draft.records.splice(idx, 1);
          draft.groupedRecords = normaliseList(draft.records);
        })
      ),
  }))
);
