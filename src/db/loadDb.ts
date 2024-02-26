import { subDays } from "date-fns";
import { calculateUnits } from "../utils/calculateUnits";
import { alcoTrackerDB } from "./db";

export const loadDB = () => {
  const now = new Date();
  const amount = 5;
  const records = [];
  const drinks = [
    {
      name: "öl",
      abv: "5",
      _abv: 5,
      vol: "33",
      _vol: 33,
    },
    { name: "pilsner urquel", abv: "5.4", _abv: 5.4, vol: "60", _vol: 60 },
    { name: "rött vin", abv: "12", _abv: 12, vol: "20", _vol: 20 },
  ];

  for (let i = 0; i < amount; i++) {
    const idx = Math.floor(Math.random() * drinks.length);
    records.push({
      name: drinks[idx].name,
      date: subDays(now, i).toISOString(),
      abv: drinks[idx].abv,
      _abv: drinks[idx]._abv,
      num: `${idx + 1}`,
      _num: idx + 1,
      vol: drinks[idx].vol,
      _vol: drinks[idx]._vol,
      units: calculateUnits(idx + 1, drinks[idx]._abv, drinks[idx]._vol),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  }

  records.forEach((r) => {
    alcoTrackerDB.add("records", r);
  });
};
