import { StoredRecord, alcoTrackerDB } from "./db";

export const loadDB = () => {
  const now = new Date();
  const records: StoredRecord[] = [
    {
      name: "öl",
      date: now.toISOString(),
      abv: "5",
      _abv: 5,
      num: "1",
      _num: 1,
      vol: "33",
      _vol: 33,
      units: 1.65,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      name: "öl",
      date: now.toISOString(),
      abv: "5",
      _abv: 5,
      num: "1",
      _num: 1,
      vol: "33",
      _vol: 33,
      units: 1.65,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
  ];
  records.forEach((r) => {
    alcoTrackerDB.add("records", r);
  });
};
