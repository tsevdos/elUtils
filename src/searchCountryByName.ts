import { getCountries } from "./getCountries";
import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import type { Country, Locale } from "./types";

type SearchCountryByNameOptions = {
  locale?: Locale;
  searchTerm: string;
};

/**
 * Searches countries by name in the selected locale.
 *
 * The search checks each country's `name`, `completeName`, and `officialName`.
 * Greek searches ignore accents and selected punctuation; English searches are case-insensitive.
 * An empty search term matches all countries in the selected locale.
 *
 * @param {SearchCountryByNameOptions} options - The options for searching countries by name.
 * @param {"el" | "en"} [options.locale="el"] - The locale to search. Defaults to Greek.
 * @param {string} options.searchTerm - The term to search for in country names.
 *
 * @returns {Country[] | null} The matching countries, or `null` if there are no matches.
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
