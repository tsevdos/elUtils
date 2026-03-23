import greekRelativeTimeTranslations from "../data/relative-time-translations-el.json";
import englishRelativeTimeTranslations from "../data/relative-time-translations-en.json";

export const MINUTE_IN_MS = 60 * 1000;
export const HOUR_IN_MS = 60 * MINUTE_IN_MS;
export const DAY_IN_MS = 24 * HOUR_IN_MS;
export const WEEK_IN_MS = 7 * DAY_IN_MS;
export const MONTH_IN_MS = 4 * WEEK_IN_MS;
export const YEAR_IN_MS = MONTH_IN_MS * 12;

type RelativeTimeLocale = "gr" | "en";
type Tense = "past" | "present" | "future";
type Unit = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";
type RelativeTimeTexts = "in" | "ago" | "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years";

type TranslationsMap = {
  [K in RelativeTimeLocale]: {
    [T in RelativeTimeTexts]: T extends "in" | "ago" ? string : { singular: string; plural: string };
  };
};

const translationsMap: TranslationsMap = {
  gr: { ...greekRelativeTimeTranslations },
  en: { ...englishRelativeTimeTranslations },
};

function getTense(duration: number): Tense {
  const tense = Math.sign(duration);
  if (tense > 0) return "future";
  if (tense === 0) return "present";
  return "past";
}

/**
 * Determines the unit by which we want to apply
 * our localized relative timing
 *
 * @param duration - Time in milliseconds
 * @returns Type of unit, e.g. "minute", "year" etc
 */
function getTimeUnit(duration: number): Unit {
  if (duration >= YEAR_IN_MS) return "year";
  if (duration >= MONTH_IN_MS) return "month";
  if (duration >= WEEK_IN_MS) return "week";
  if (duration >= DAY_IN_MS) return "day";
  if (duration >= HOUR_IN_MS) return "hour";
  if (duration >= MINUTE_IN_MS) return "minute";

  return "second";
}

function getSecondsText(duration: number, tense: Tense, locale: RelativeTimeLocale): string {
  const durationInMS = duration / 1000;
  if (duration <= 5 * 1000) {
    return translationsMap[locale].seconds.singular;
  }
  if (tense === "past") {
    return `${durationInMS} ${translationsMap[locale].seconds.plural} ${translationsMap[locale].ago}`;
  }
  return `${translationsMap[locale].in} ${durationInMS} ${translationsMap[locale].seconds.plural}`;
}

function getMinutesText(duration: number, tense: Tense, locale: RelativeTimeLocale): string {
  const durationInMinutes = duration / MINUTE_IN_MS;
  const minutesNoun =
    duration > MINUTE_IN_MS ? translationsMap[locale].minutes.plural : translationsMap[locale].minutes.singular;
  if (tense === "past") {
    return `${durationInMinutes} ${minutesNoun} ${translationsMap[locale].ago}`;
  }
  return `${translationsMap[locale].in} ${durationInMinutes} ${minutesNoun}`;
}

function getHoursText(duration: number, tense: Tense, locale: RelativeTimeLocale): string {
  const durationInHours = duration / HOUR_IN_MS;
  const hoursNoun =
    duration > HOUR_IN_MS ? translationsMap[locale].hours.plural : translationsMap[locale].hours.singular;
  if (tense === "past") {
    return `${durationInHours} ${hoursNoun} ${translationsMap[locale].ago}`;
  }
  return `${translationsMap[locale].in} ${durationInHours} ${hoursNoun}`;
}

function getDaysText(duration: number, tense: Tense, locale: RelativeTimeLocale): string {
  const durationInDays = duration / DAY_IN_MS;
  const daysNoun = duration > DAY_IN_MS ? translationsMap[locale].days.plural : translationsMap[locale].days.singular;
  if (tense === "past") {
    return `${durationInDays} ${daysNoun} ${translationsMap[locale].ago}`;
  }
  return `${translationsMap[locale].in} ${durationInDays} ${daysNoun}`;
}

function getWeeksText(duration: number, tense: Tense, locale: RelativeTimeLocale): string {
  const durationInWeeks = duration / WEEK_IN_MS;
  const weeksNoun =
    duration > WEEK_IN_MS ? translationsMap[locale].weeks.plural : translationsMap[locale].weeks.singular;
  if (tense === "past") {
    return `${durationInWeeks} ${weeksNoun} ${translationsMap[locale].ago}`;
  }
  return `${translationsMap[locale].in} ${durationInWeeks} ${weeksNoun}`;
}

function getMonthsText(duration: number, tense: Tense, locale: RelativeTimeLocale): string {
  const durationInMonths = duration / MONTH_IN_MS;
  const monthsNoun =
    duration > MONTH_IN_MS ? translationsMap[locale].months.plural : translationsMap[locale].months.singular;
  if (tense === "past") {
    return `${durationInMonths} ${monthsNoun} ${translationsMap[locale].ago}`;
  }
  return `${translationsMap[locale].in} ${durationInMonths} ${monthsNoun}`;
}

function getYearsText(duration: number, tense: Tense, locale: RelativeTimeLocale): string {
  const durationInYears = duration / YEAR_IN_MS;
  const yearsNoun =
    duration > YEAR_IN_MS ? translationsMap[locale].years.plural : translationsMap[locale].years.singular;
  if (tense === "past") {
    return `${durationInYears} ${yearsNoun} ${translationsMap[locale].ago}`;
  }
  return `${translationsMap[locale].in} ${durationInYears} ${yearsNoun}`;
}

function getRelativeTimeText(unit: Unit, duration: number, tense: Tense, locale: RelativeTimeLocale): string | null {
  if (unit === "second") return getSecondsText(duration, tense, locale);
  if (unit === "minute") return getMinutesText(duration, tense, locale);
  if (unit === "hour") return getHoursText(duration, tense, locale);
  if (unit === "day") return getDaysText(duration, tense, locale);
  if (unit === "week") return getWeeksText(duration, tense, locale);
  if (unit === "month") return getMonthsText(duration, tense, locale);
  if (unit === "year") return getYearsText(duration, tense, locale);
  return null;
}

type RelativeTimeFormatOptions = {
  locale?: RelativeTimeLocale;
  style?: "formal" | "informal" | "long" | "short";
};

/**
 * Formats the relative time between two dates (e.g. "2 hours ago", "in 3 days").
 *
 * Uses custom translations instead of Intl.RelativeTimeFormat since this supports
 * Greek (gr) and English (en) with consistent output.
 *
 * @param d1 - The first date (typically "now" when expressing past/future)
 * @param d2 - The second date to compare against
 * @param options - Optional locale and style (style reserved for future use)
 * @returns Formatted relative time string or null
 */
export function relativeTimeFormat(d1: Date, d2: Date, options?: RelativeTimeFormatOptions): string | null {
  const { locale = "gr" } = options ?? {};

  const duration = d1.getTime() - d2.getTime();
  const tense = getTense(duration);
  const absoluteTimeDifference = Math.abs(duration);
  const unit = getTimeUnit(absoluteTimeDifference);

  return getRelativeTimeText(unit, absoluteTimeDifference, tense, locale);
}
