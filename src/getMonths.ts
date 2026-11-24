import type { BaseDateTimeOptions, Format } from "./types";

export const monthsData = {
  el: {
    full: [
      "Ιανουάριος",
      "Φεβρουάριος",
      "Μάρτιος",
      "Απρίλιος",
      "Μάιος",
      "Ιούνιος",
      "Ιούλιος",
      "Αύγουστος",
      "Σεπτέμβριος",
      "Οκτώβριος",
      "Νοέμβριος",
      "Δεκέμβριος",
    ],
    alternative: [
      "Ιανουαρίου",
      "Φεβρουαρίου",
      "Μαρτίου",
      "Απριλίου",
      "Μαΐου",
      "Ιουνίου",
      "Ιουλίου",
      "Αυγούστου",
      "Σεπτεμβρίου",
      "Οκτωβρίου",
      "Νοεμβρίου",
      "Δεκεμβρίου",
    ],
    short: ["Ιαν", "Φεβ", "Μάρ", "Απρ", "Μάι", "Ιούν", "Ιούλ", "Αύγ", "Σεπ", "Οκτ", "Νοέ", "Δεκ"],
    min: ["Ι", "Φ", "Μ", "Α", "Μ", "Ι", "Ι", "Α", "Σ", "Ο", "Ν", "Δ"],
  },
  en: {
    full: [
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
    ],
    alternative: [
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
    ],
    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    min: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  },
} as const;

type MonthsBaseDateTimeOptions = Omit<BaseDateTimeOptions, "format"> & {
  format?: Format | "alternative";
};

/**
 * Returns the months based on the provided options.
 *
 * @param {MonthsBaseDateTimeOptions} [options={}] - The options for locale and format.
 * @param {"el" | "en"} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {"full" | "short" | "min" | "alternative"} [options.format="full"] - The format to use. Default is "full".
 *
 * @returns {string[]} The months in the specified locale and format.
 */
export function getMonths(options: MonthsBaseDateTimeOptions = {}): string[] {
  const { locale = "el", format = "full" } = options;

  return [...monthsData[locale][format]];
}
