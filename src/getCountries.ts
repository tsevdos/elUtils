import countriesEl from "../data/countries-el.json";
import countriesEn from "../data/countries-en.json";
import type { Locale, Country } from "./types";

const allCountries = { el: countriesEl, en: countriesEn } as const;

type CountriesOptions = {
  locale?: Locale;
};

/**
 * This function returns all the countries based on the provided options.
 *
 * @param {CountriesOptions} [options={}] - The options for the countries.
 * @param {string} [options.locale="el"] - The locale to use. Default is "el".
 *
 * @returns {Country[]} The countries that match the given options, or all countries if no options are provided.
 */
export function getCountries({ locale = "el" }: CountriesOptions = {}): Country[] {
  return allCountries[locale];
}
