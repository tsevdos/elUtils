import DatesData from "../../data/dates.json";

type DateTimeOptions = {
  locale?: "el" | "en";
  format?: "full" | "short" | "min" | "alternative";
};
export const getDays = (options: DateTimeOptions = {}) => {
  const { locale = "el", format = "full" } = options;

  return DatesData.days[locale][format] as string[];
};

export const getMonths = (options: DateTimeOptions = {}) => {
  const { locale = "el", format = "full" } = options;

  return DatesData.months[locale][format] as string[];
};

export const getQuarters = (options: DateTimeOptions = {}) => {
  const { locale = "el", format = "full" } = options;

  return DatesData.quarters[locale][format] as string[];
};

export const getEras = (options: DateTimeOptions = {}) => {
  const { locale = "el", format = "full" } = options;

  return DatesData.eras[locale][format] as string[];
};
