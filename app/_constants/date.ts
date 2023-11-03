import { eachYearOfInterval, endOfToday, subYears } from "date-fns";

export const last20years: number[] = eachYearOfInterval({
  start: subYears(endOfToday(), 19),
  end: endOfToday(),
}).map((date) => date.getFullYear());

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const promptDateFormat: string = "yyyy-MM-dd";
