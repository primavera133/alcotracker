import { DBSchema, IDBPDatabase, openDB } from "idb";

interface Item {
  date: string;
  name: string;
  num: string;
  _num: number;
  abv: string;
  _abv: number;
  vol: string;
  _vol: number;
  units: number;
}

export interface StoredItem {
  itemId: string;
  item: Item;
  createdAt: string;
  updatedAt: string;  
}

interface AlcoTrackerDB extends DBSchema {
  items: {
    value: StoredItem;
    key: string;
    indexes: { 'by-date': number };
  };
}

export let alcoTrackerDB: IDBPDatabase<AlcoTrackerDB>;

const dbName = "alcotracker-db"
const dbVersion = 1

export const initDB = async () => {
  alcoTrackerDB = await openDB<AlcoTrackerDB>(dbName, dbVersion, {
    upgrade(db){
      const itemStore = db.createObjectStore('items', {
        keyPath: 'itemId',
      });
      itemStore.createIndex('by-date', 'date');
    } 
  })
}

