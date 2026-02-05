import datesData from "./dates.json";
import { BaseDateTimeOptions, Format } from "./types";

type DateTimeOptionsWithoutMin = Omit<BaseDateTimeOptions, "format"> & {
  format?: Exclude<Format, "min">;
};

/**
 * Returns the quarters based on the provided options.
 *
 * @param {DateTimeOptionsWithoutMin} [options={}] - The options for locale and format.
 * @param {string} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {Exclude<Format, "min">} [options.format="full"] - The format to use. Default is "full".
 *
 * @returns {string[]} The quarters in the specified locale and format.
 */
export function getQuarters(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.quarters[locale][format];
}

/**
 * Returns the eras based on the provided options.
 *
 * @param {DateTimeOptionsWithoutMin} [options={}] - The options for locale and format.
 * @param {string} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {Exclude<Format, "min">} [options.format="full"] - The format to use. Default is "full".
 *
 * @returns {string[]} The eras in the specified locale and format.
 */
export function getEras(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.eras[locale][format];
}

type Holiday = {
  date: string;
  name: string;
};

/**
 * Calculates movable Greek holidays based on the given year and locale.
 *
 * @param {number} year - The year for which to calculate the holidays.
 * @param {string} [locale="el"] - The locale to use for holiday names. Default is "el".
 *
 * @returns {Holiday[]} An array of objects representing the movable holidays for the specified year and locale.
 */
function calculateMovableGreekHolidays(year: number, locale: "el" | "en"): Holiday[] {
  let e = 10;

  if (year > 1600) {
    const year2 = Math.floor(year / 100);
    e = 10 + year2 - 16 - Math.floor((year2 - 16) / 4);
  }

  if (year < 1583) {
    e = 0;
  }

  const a = year % 19;
  const b = (19 * a + 15) % 30;
  const c = (year + Math.floor(year / 4) + b) % 7;
  const L = b - c;
  const p = L + e;
  const d = 1 + ((p + 27 + Math.floor((p + 6) / 40)) % 31);
  const m = 3 + Math.floor((p + 26) / 30) - 1;
  const oneDay = 60 * 1000 * 60 * 24;
  const easter = new Date(Date.UTC(year, m, d));
  const cleanMonday = new Date(easter.getTime() + oneDay * -48).toISOString();
  const goodFriday = new Date(easter.getTime() + oneDay * -2).toISOString();
  const easterMonday = new Date(easter.getTime() + oneDay).toISOString();
  const pentecost = new Date(easter.getTime() + oneDay * 50).toISOString();
  const movableGreekHolidaysDates = {
    cleanMonday: `${year}-${cleanMonday.substring(5, 7)}-${cleanMonday.substring(8, 10)}`,
    goodFriday: `${year}-${goodFriday.substring(5, 7)}-${goodFriday.substring(8, 10)}`,
    easterMonday: `${year}-${easterMonday.substring(5, 7)}-${easterMonday.substring(8, 10)}`,
    pentecost: `${year}-${pentecost.substring(5, 7)}-${pentecost.substring(8, 10)}`,
  };

  return datesData.holidays[locale]
    .filter(({ moveable }) => moveable)
    .map(({ date, name }) => ({
      date: movableGreekHolidaysDates[date as keyof typeof movableGreekHolidaysDates],
      name,
    }));
}

type GetHolidaysOptions = {
  locale?: "el" | "en";
};

/**
 * Gets Greek holidays for the given year, including both fixed and movable.
 *
 * @param {string} year - The year for which to fetch the holidays.
 * @param {GetHolidaysOptions} [options={}] - The options for locale.
 * @param {string} [options.locale="el"] - The locale to use for formatting. Default is "el".
 *
 * @returns {Holiday[]} An array of holiday objects.
 */
export function getHolidays(year: string, options: GetHolidaysOptions = {}): Holiday[] {
  const { locale = "el" } = options;
  const y = parseInt(year);
  const nonMovableHolidays = datesData.holidays[locale]
    .filter(({ moveable }) => !moveable)
    .map(({ date, name }) => ({ date: `${year}-${date}`, name }));
  const movableHolidays: Holiday[] = calculateMovableGreekHolidays(y, locale);
  const holidays = [...nonMovableHolidays, ...movableHolidays].sort((a, b) => a.date.localeCompare(b.date));

  return holidays;
}
