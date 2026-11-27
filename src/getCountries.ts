import countriesEl from "../data/countries-el.json";
import countriesEn from "../data/countries-en.json";
import type { Locale, Country } from "./types";
import { immutableSnapshot } from "./helpers/immutable";

const allCountries = immutableSnapshot({ el: countriesEl, en: countriesEn });

type CountriesOptions = {
  locale?: Locale;
};

/**
 * Returns all countries in the selected locale.
 *
 * The returned data is deeply immutable.
 *
 * @param {CountriesOptions} [options={}] - Options for selecting the locale.
 * @param {"el" | "en"} [options.locale="el"] - The locale of the country names. Defaults to Greek.
 *
 * @returns {readonly Country[]} All countries in the selected locale, deeply immutable.
 */
export function getCountries({ locale = "el" }: CountriesOptions = {}): readonly Country[] {
  return allCountries[locale];
}
