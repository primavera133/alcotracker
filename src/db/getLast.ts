import { alcoTrackerDB } from "./db";

export const queryGetLast = async (limit: number) => {
  try {
    const results: any[] = [];

    let cursor = await alcoTrackerDB
      .transaction("records", "readonly")
      .store.index("by-date")
      .openCursor(null, "prev");

    while (cursor && results.length < limit) {
      results.push(cursor.value);
      cursor = await cursor.continue();
    }

    return results;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};
