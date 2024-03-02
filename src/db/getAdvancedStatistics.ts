import {
  differenceInWeeks,
  format,
  isAfter,
  isBefore,
  subDays,
} from "date-fns";
import { alcoTrackerDB } from "./db";

export interface AdvancedStatistics {
  // weeklyResults: { [key: string]: number };
  weeklyAverage: number;
  weeklyAverageLastMonth: number;
  weeklyAverageLastThreeMonths: number;
  earliestWeek: string;
  amountOfWeeksInTotal: number;
  daysOfAlcohol: number;
  daysOfAlcoholLastMonth: number;
  daysOfAlcoholLastThreeMonths: number;
}

export const queryGetAdvancedStatistics =
  async (): Promise<AdvancedStatistics> => {
    try {
      const now = new Date();
      const startOfLastMonth = subDays(now, 30);
      const startOfLastThreeMonths = subDays(now, 90);

      let totalUnits = 0;
      let totalUnitsLastMonth = 0;
      let totalUnitsLastThreeMonths = 0;

      let daysOfAlcohol = new Set<string>();
      let daysOfAlcoholLastMonth = new Set();
      let daysOfAlcoholLastThreeMonths = new Set();

      let earliestWeek = now.toISOString();

      // const weeklyResults: { [key: string]: number } = {};

      let cursor = await alcoTrackerDB
        .transaction("records", "readonly")
        .store.index("by-date")
        .openCursor(null, "prev");

      while (cursor) {
        const { date, units } = cursor.value;
        const formattedDate = format(date, "yyyy-MM-dd");

        totalUnits += units;
        daysOfAlcohol.add(formattedDate);

        if (isAfter(date, startOfLastMonth)) {
          totalUnitsLastMonth += units;
          daysOfAlcoholLastMonth.add(formattedDate);
        }

        if (isAfter(date, startOfLastThreeMonths)) {
          totalUnitsLastThreeMonths += units;
          daysOfAlcoholLastThreeMonths.add(formattedDate);
        }

        if (isBefore(date, earliestWeek)) earliestWeek = date;

        // const yearWeek = `${getYear(date)}-${getWeek(date, {
        //   weekStartsOn: 1,
        // })}`;
        // weeklyResults[yearWeek] = (weeklyResults[yearWeek] || 0) + units;

        cursor = await cursor.continue();
      }

      const amountOfWeeksInTotal = differenceInWeeks(now, earliestWeek) + 1;

      const weeklyAverage = totalUnits / amountOfWeeksInTotal;
      const weeklyAverageLastMonth = totalUnitsLastMonth / (30 / 7);
      const weeklyAverageLastThreeMonths = totalUnitsLastThreeMonths / (90 / 7);

      return {
        // weeklyResults,
        weeklyAverage,
        weeklyAverageLastMonth,
        weeklyAverageLastThreeMonths,
        earliestWeek,
        amountOfWeeksInTotal,
        daysOfAlcohol: daysOfAlcohol.size,
        daysOfAlcoholLastMonth: daysOfAlcoholLastMonth.size,
        daysOfAlcoholLastThreeMonths: daysOfAlcoholLastThreeMonths.size,
      };
    } catch (error) {
      console.error("Error querying database:", error);
      throw error;
    }
  };
