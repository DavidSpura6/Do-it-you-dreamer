import { getCurrentWeek } from "./weekdays";

export const getSimpleDate = (date: Date) =>
  `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;

export const getDateFromSimpleDate = (date: string) =>
  new Date(date.replaceAll("_", " "));

export const getWeekDayNameFromSimpleDate = (date: string) => {
  const week = getCurrentWeek();
  const day = week.find((day) => getSimpleDate(day.date) === date);
  return day!.name;
};
