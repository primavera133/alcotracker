import { DBSchema, IDBPDatabase, openDB } from "idb";

export interface RecordBase {}

export interface StoredRecord extends RecordBase {
  recordId?: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  date: string;
  num: string;
  _num: number;
  abv: string;
  _abv: number;
  vol: string;
  _vol: number;
  units: number;
}

interface AlcoTrackerDB extends DBSchema {
  records: {
    value: StoredRecord;
    key: string;
    indexes: { "by-date": number };
  };
}

export let alcoTrackerDB: IDBPDatabase<AlcoTrackerDB>;

const dbName = "alcotracker-db";
const dbVersion = 1;

export const initDB = async () => {
  alcoTrackerDB = await openDB<AlcoTrackerDB>(dbName, dbVersion, {
    upgrade(db) {
      const recordStore = db.createObjectStore("records", {
        keyPath: "recordId",
        autoIncrement: true,
      });
      recordStore.createIndex("by-date", "date");
    },
  });
};
