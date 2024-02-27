import { alcoTrackerDB } from "./db";

export const queryGetRecords = async (limit: number, offset: number) => {
  try {
    const results: any[] = [];
    let idx = 0;

    let cursor = await alcoTrackerDB
      .transaction("records", "readonly")
      .store.index("by-date")
      .openCursor(null, "prev");

    while (cursor && idx < offset) {
      cursor = await cursor.continue();
      idx++;
    }

    while (cursor && results.length < limit) {
      results.push(cursor.value);
      cursor = await cursor.continue();
      // idx++;
    }

    return results;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};
