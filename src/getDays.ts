import type { BaseDateTimeOptions } from "./types";

export const daysData = {
  el: {
    full: ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"],
    short: ["Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ", "Κυρ"],
    min: ["Δ", "Τ", "Τ", "Π", "Π", "Σ", "Κ"],
  },
  en: {
    full: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    min: ["M", "T", "W", "T", "F", "S", "S"],
  },
} as const;

/**
 * Returns the days based on the provided options.
 *
 * @param {BaseDateTimeOptions} [options={}] - The options for locale and format.
 * @param {"el" | "en"} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {"full" | "short" | "min"} [options.format="full"] - The format to use. Default is "full".
 *
 * @returns {readonly string[]} The immutable days in the specified locale and format.
 */
export function getDays(options: BaseDateTimeOptions = {}): readonly string[] {
  const { locale = "el", format = "full" } = options;

  return Object.freeze([...daysData[locale][format]]);
}
