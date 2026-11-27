import type { DateTimeOptionsWithoutMin } from "./types";

export const erasData = {
  el: {
    full: ["προ Χριστού", "μετά Χριστόν"],
    short: ["π.Χ.", "μ.Χ."],
  },
  en: {
    full: ["Before Christ", "Anno Domini"],
    short: ["BC", "AD"],
  },
} as const;

/**
 * Returns the eras based on the provided options.
 *
 * @param {DateTimeOptionsWithoutMin} [options={}] - The options for locale and format.
 * @param {"el" | "en"} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {"full" | "short"} [options.format="full"] - The format to use. Default is "full".
 *
 * @returns {readonly string[]} The immutable eras in the specified locale and format.
 */
export function getEras(options: DateTimeOptionsWithoutMin = {}): readonly string[] {
  const { locale = "el", format = "full" } = options;

  return Object.freeze([...erasData[locale][format]]);
}
