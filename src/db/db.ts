import { DBSchema, IDBPDatabase, openDB } from "idb";

export interface StoredRecord {
  recordId?: IDBKeyRange;
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

export const storedRecordsValidator = (obj: any): obj is StoredRecord => {
  const result =
    !!obj &&
    Array.isArray(obj) &&
    obj.length > 1 &&
    typeof obj[0] === "object" &&
    (typeof obj[0]?.recordId === "number" ||
      typeof obj[0]?.recordId === "undefined") &&
    typeof obj[0].createdAt === "string" &&
    typeof obj[0].updatedAt === "string" &&
    typeof obj[0].name === "string" &&
    typeof obj[0].date === "string" &&
    typeof obj[0].num === "string" &&
    typeof obj[0]._num === "number" &&
    typeof obj[0].abv === "string" &&
    typeof obj[0]._abv === "number" &&
    typeof obj[0].vol === "string" &&
    typeof obj[0]._vol === "number" &&
    typeof obj[0].units === "number";

  return result;
};

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
  return true;
};
