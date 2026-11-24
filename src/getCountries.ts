import countriesEl from "../data/countries-el.json";
import countriesEn from "../data/countries-en.json";
import type { Locale, Country } from "./types";

const allCountries = { el: countriesEl, en: countriesEn } as const;

type CountriesOptions = {
  locale?: Locale;
};

/**
 * Returns all countries in the selected locale.
 *
 * **Note**: The returned array and its objects are shared data and should be treated as read-only.
 * Mutating them may affect future calls and other consumers of this library.
 *
 * @param {CountriesOptions} [options={}] - Options for selecting the locale.
 * @param {"el" | "en"} [options.locale="el"] - The locale of the country names. Defaults to Greek.
 *
 * @returns {Country[]} All countries in the selected locale.
 */
export function getCountries({ locale = "el" }: CountriesOptions = {}): Country[] {
  return allCountries[locale];
}
