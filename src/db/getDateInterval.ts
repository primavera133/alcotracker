import { isAfter, isBefore } from "date-fns";
import { alcoTrackerDB } from "./db";

export const queryGetDateInterval = async (dateStart: Date, dateEnd: Date) => {
  try {
    const results: any[] = [];

    let cursor = await alcoTrackerDB
      .transaction("records", "readonly")
      .store.index("by-date")
      .openCursor(null, "prev");

    while (cursor) {
      if (
        isAfter(cursor.value.date, dateStart) &&
        isBefore(cursor.value.date, dateEnd)
      ) {
        results.push(cursor.value);
      }
      cursor = await cursor.continue();
    }

    return results;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};
