import { DateTimeOptionsWithoutMin } from "../types";

export const quartersData = {
  el: {
    full: ["1ο τρίμηνο", "2ο τρίμηνο", "3ο τρίμηνο", "4ο τρίμηνο"],
    short: ["Τ1", "Τ2", "Τ3", "Τ4"],
  },
  en: {
    full: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
    short: ["Q1", "Q2", "Q3", "Q4"],
  },
} as const;

/**
 * Returns the quarters based on the provided options.
 *
 * @param {DateTimeOptionsWithoutMin} [options={}] - The options for locale and format.
 * @param {"el" | "en"} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {"full" | "short"} [options.format="full"] - The format to use. Default is "full".
 *
 * @returns {string[]} The quarters in the specified locale and format.
 */
export function getQuarters(options: DateTimeOptionsWithoutMin = {}): string[] {
  const { locale = "el", format = "full" } = options;

  return [...quartersData[locale][format]];
}
