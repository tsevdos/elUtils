import { getCountries } from "./getCountries";
import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import type { Country, Locale } from "./types";

type SearchCountryByNameOptions = {
  locale?: Locale;
  searchTerm: string;
};

/**
 * This function searches for countries by name based on the provided options.
 *
 * @param {SearchCountryByNameOptions} options - The options for searching countries by name.
 * @param {string} [options.locale="el"] - The locale to use. Default is "el".
 * @param {string} options.searchTerm - The term to search for in country names.
 *
 * @returns {Country[] | null} The countries that match the search term, or null if no matches are found.
 */
export function searchCountryByName({ locale = "el", searchTerm }: SearchCountryByNameOptions): Country[] | null {
  const countries = getCountries({ locale });
  const normalizedSearchTerm = normalizeAndUppercaseGreekString(searchTerm);
  let countriesByName: Country[] = [];

  if (locale === "el") {
    countriesByName = countries.filter(({ name, completeName, officialName }) => {
      return (
        normalizeAndUppercaseGreekString(name).includes(normalizedSearchTerm) ||
        normalizeAndUppercaseGreekString(completeName).includes(normalizedSearchTerm) ||
        normalizeAndUppercaseGreekString(officialName).includes(normalizedSearchTerm)
      );
    });
  }

  if (locale === "en") {
    countriesByName = countries.filter(({ name, completeName, officialName }) => {
      return (
        name.toUpperCase().includes(searchTerm.toUpperCase()) ||
        completeName.toUpperCase().includes(searchTerm.toUpperCase()) ||
        officialName.toUpperCase().includes(searchTerm.toUpperCase())
      );
    });
  }

  return countriesByName?.length ? countriesByName : null;
}
