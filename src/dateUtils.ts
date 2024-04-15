import datesData from "../data/dates.json";

type Format = "full" | "short" | "min";

type BaseDateTimeOptions = {
  locale?: "el" | "en";
  format?: Format;
};

/**
 * Returns the days based on the provided options.
 * @param {BaseDateTimeOptions} options - The options for locale and format.
 * @returns {string[]} The days in the specified locale and format.
 */
export function getDays(options: BaseDateTimeOptions = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.days[locale][format];
}

type MonthsBaseDateTimeOptions = Omit<BaseDateTimeOptions, "format"> & {
  format?: Format | "alternative";
};

/**
 * Returns the months based on the provided options.
 * @param {MonthsBaseDateTimeOptions} options - The options for locale and format.
 * @returns {string[]} The months in the specified locale and format.
 */
export function getMonths(options: MonthsBaseDateTimeOptions = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.months[locale][format];
}

type DateTimeOptionsWithoutMin = Omit<BaseDateTimeOptions, "format"> & {
  format?: Exclude<Format, "min">;
};

/**
 * Returns the quarters based on the provided options.
 * @param {DateTimeOptionsWithoutMin} options - The options for locale and format.
 * @returns {string[]} The quarters in the specified locale and format.
 */
export function getQuarters(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.quarters[locale][format];
}

/**
 * Returns the eras based on the provided options.
 * @param {DateTimeOptionsWithoutMin} options - The options for locale and format.
 * @returns {string[]} The eras in the specified locale and format.
 */
export function getEras(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.eras[locale][format];
}
