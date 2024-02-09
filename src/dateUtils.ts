import datesData from "../data/dates.json";

type Format = "full" | "short" | "min";

type BaseDateTimeOptions = {
  locale?: "el" | "en";
  format?: Format;
};

export function getDays(options: BaseDateTimeOptions = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.days[locale][format];
}

type MonthsBaseDateTimeOptions = Omit<BaseDateTimeOptions, "format"> & {
  format?: Format | "alternative";
};

export function getMonths(options: MonthsBaseDateTimeOptions = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.months[locale][format];
}

type DateTimeOptionsWithoutMin = Omit<BaseDateTimeOptions, "format"> & {
  format?: Exclude<Format, "min">;
};

export function getQuarters(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.quarters[locale][format];
}

export function getEras(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.eras[locale][format];
}
