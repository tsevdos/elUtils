import datesData from "../data/dates.json";

type Format = "full" | "short" | "min";

type BaseDateTimeOptions = {
  locale?: "el" | "en";
  format?: Format;
};

/**
 * Returns the days based on the provided options.
 *
 * @param {BaseDateTimeOptions} [options={}] - The options for locale and format.
 * @param {string} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {Format} [options.format="full"] - The format to use. Default is "full".
 *
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
 *
 * @param {MonthsBaseDateTimeOptions} [options={}] - The options for locale and format.
 * @param {string} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {Format | "alternative"} [options.format="full"] - The format to use. Default is "full".
 *
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

export const MINUTE_IN_MS = 60 * 1000;
export const HOUR_IN_MS = 60 * MINUTE_IN_MS;
export const DAY_IN_MS = 24 * HOUR_IN_MS;
export const WEEK_IN_MS = 7 * DAY_IN_MS;
export const MONTH_IN_MS = 4 * WEEK_IN_MS;
export const YEAR_IN_MS = MONTH_IN_MS * 12;

type Tense = "past" | "present" | "future";

export function getTense(duration: number): Tense {
  const tense = Math.sign(duration);
  if (tense > 0) return "future";
  // eslint-disable-next-line no-compare-neg-zero
  if (tense === 0 || tense === -0) return "present";
  return "past";
}

type Unit = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

/**
 * Determines the unit by which we want to apply
 * our localized relative timing
 * @param duration time in milliseconds
 * @returns type of unit, eg "minute", "year" etc
 */
export function getTimeUnit(duration: number): Unit {
  if (duration >= YEAR_IN_MS) return "year";
  if (duration >= MONTH_IN_MS) return "month";
  if (duration >= WEEK_IN_MS) return "week";
  if (duration >= DAY_IN_MS) return "day";
  if (duration >= HOUR_IN_MS) return "hour";
  if (duration >= MINUTE_IN_MS) return "minute";

  return "second";
}

export function getSecondsText(duration: number, tense: Tense): string {
  const durationInMS = duration / 1000;
  if (duration <= 5 * 1000) {
    return "molis tora";
  }
  if (tense === "past") {
    return `prin apo ${durationInMS} deuterolepta`;
  }
  return `se ${durationInMS} deuterolepta`;
}

export function getMinutesText(duration: number, tense: Tense): string {
  const durationInMinutes = duration / MINUTE_IN_MS;
  const minutesNoun = duration > MINUTE_IN_MS ? "lepta" : "lepto";
  if (tense === "past") {
    return `${durationInMinutes} ${minutesNoun} prin`;
  }
  return `se ${durationInMinutes} ${minutesNoun}`;
}

export function getHoursText(duration: number, tense: Tense): string {
  const durationInHours = duration / HOUR_IN_MS;
  const hoursNoun = duration > HOUR_IN_MS ? "ores" : "ora";
  if (tense === "past") {
    return `${durationInHours} ${hoursNoun} prin`;
  }
  return `se ${durationInHours} ${hoursNoun}`;
}

export function getDaysText(duration: number, tense: Tense): string {
  const durationInDays = duration / DAY_IN_MS;
  const daysNoun = duration > DAY_IN_MS ? "meres" : "mera";
  if (tense === "past") {
    return `${durationInDays} ${daysNoun} prin`;
  }
  return `se ${durationInDays} ${daysNoun}`;
}

export function getWeeksText(duration: number, tense: Tense): string {
  const durationInWeeks = duration / WEEK_IN_MS;
  const weeksNoun = duration > WEEK_IN_MS ? "evdomades" : "evdomada";
  if (tense === "past") {
    return `${durationInWeeks} ${weeksNoun} prin`;
  }
  return `se ${durationInWeeks} ${weeksNoun}`;
}

export function getMonthsText(duration: number, tense: Tense): string {
  const durationInMonths = duration / MONTH_IN_MS;
  const monthsNoun = duration > MONTH_IN_MS ? "mines" : "mina";
  if (tense === "past") {
    return `${durationInMonths} ${monthsNoun} prin`;
  }
  return `se ${durationInMonths} ${monthsNoun}`;
}

export function getYearsText(duration: number, tense: Tense): string {
  const durationInYears = duration / YEAR_IN_MS;
  const yearsNoun = duration > YEAR_IN_MS ? "xronia" : "xrono";
  if (tense === "past") {
    return `${durationInYears} ${yearsNoun} prin`;
  }
  return `se ${durationInYears} ${yearsNoun}`;
}

export function getRelativeTimeText(unit: Unit, duration: number, tense: Tense): string | null {
  if (unit === "second") {
    return getSecondsText(duration, tense);
  }
  if (unit === "minute") {
    return getMinutesText(duration, tense);
  }
  if (unit === "hour") {
    return getHoursText(duration, tense);
  }
  if (unit === "day") {
    return getDaysText(duration, tense);
  }
  if (unit === "week") {
    return getWeeksText(duration, tense);
  }
  if (unit === "month") {
    return getMonthsText(duration, tense);
  }
  if (unit === "year") {
    return getYearsText(duration, tense);
  }
  return null;
}

type RelativeTimeFormatOptions = { locale: string; style: "formal" | "informal" | "long" | "short" };

/**
 * We are doing all this because we cannot use the relevant Intl.Duration namespace,
 * since it is not yet supported in TypeScript.
 * When it will get supported then we need to use this instead.
 */
export function relativeTimeFormat(d1: Date, d2: Date, options?: RelativeTimeFormatOptions): string | null {
  // const { locale, style } = options;
  console.log("foo", options);

  // this is needed to calculate 1) past or future 2) time unit
  const duration = d1.getTime() - d2.getTime();
  const tense = getTense(duration);
  const absoluteTimeDifference = Math.abs(duration);

  // this is needed for the text that we should render to the user
  // based on the options.style we can choose the rendering style
  const unit = getTimeUnit(absoluteTimeDifference);

  // we also need to calculate how many of these units we have
  return getRelativeTimeText(unit, absoluteTimeDifference, tense);
}
