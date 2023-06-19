import dayjs, { Dayjs } from "dayjs";

export type Unit = "year" | "decade";

export const stringToDate = (unit: Unit, input: string | null): Dayjs => {
  if (input !== null && unit === "year") {
    const year = input + "-01-01";
    return dayjs(year);
  } else {
    return dayjs();
  }
};

export const dateToString = (unit: Unit, date: Dayjs): string => {
  if (unit === "year") {
    return date.format("YYYY");
  } else {
    return date.format();
  }
};
