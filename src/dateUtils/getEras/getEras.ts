import { DateTimeOptionsWithoutMin } from "../types";

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
 * @param {string} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {Exclude<Format, "min">} [options.format="full"] - The format to use. Default is "full".
 *
 * @returns {string[]} The eras in the specified locale and format.
 */
export function getEras(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return erasData[locale][format];
}
