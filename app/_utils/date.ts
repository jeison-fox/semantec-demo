import { endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns";

import { promptDateFormat } from "@/constants/date";

/**
 * Gets the date range starting from today to 7 days ago in MM-DD-YYYY format.
 *
 * @returns {object} An object containing today's date and the date from 7 days ago.
 * @property {string} start_date - Today's date.
 * @property {string} end_date - The date from 7 days ago.
 */
export const getLast7DaysDateRange = (): DateRange => {
  const today = new Date();
  const startDate = format(subDays(today, 7), promptDateFormat);
  const endDate = format(subDays(today, 1), promptDateFormat);

  return { start_date: startDate, end_date: endDate };
};

/**
 * Gets the date range starting from today to 30 days ago in MM-DD-YYYY format.
 *
 * @returns {object} An object containing today's date and the date from 30 days ago.
 * @property {string} start_date - Today's date.
 * @property {string} end_date - The date from 30 days ago.
 */
export const getLast30DaysDateRange = (): DateRange => {
  const today = new Date();
  const startDate = format(subDays(today, 30), promptDateFormat);
  const endDate = format(subDays(today, 1), promptDateFormat);

  return { start_date: startDate, end_date: endDate };
};

/**
 * Gets the date range for the previous month.
 *
 * @returns {object} An object containing the start and end dates of the previous month in MM-DD-YYYY format.
 * @property {string} start_date - The first day of the previous month.
 * @property {string} end_date - The last day of the previous month.
 */
export const gePastMonthDateRange = (): DateRange => {
  const today = new Date();
  const startDate = format(startOfMonth(subMonths(today, 1)), promptDateFormat);
  const endDate = format(endOfMonth(subMonths(today, 1)), promptDateFormat);

  return { start_date: startDate, end_date: endDate };
};

/**
 * Retrieves a specific date range based on a preset value.
 *
 * This function determines the appropriate date range based on the provided preset.
 * For example, if the preset is "pastMonth", the function will return the start and
 * end dates of the last month. It will default to "30 days ago" if the preset doesn't
 * match any known values or if it's "custom".
 *
 * @param {DateRangePreset} preset - The preset value which determines the date range.
 * It can be one of the following: "pastMonth", "30days", "7days", or "custom".
 *
 * @returns {DateRange} An object containing the start and end dates.
 */
export const getFixedDateRange = (preset: DateRangePreset): DateRange => {
  switch (preset) {
    case "pastMonth":
      return gePastMonthDateRange();
    case "30days":
      return getLast30DaysDateRange();
    case "7days":
      return getLast7DaysDateRange();
    case "custom":
    default:
      return getLast30DaysDateRange();
  }
};
