import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import { getCountries } from "./getCountries";
import type { Country } from "./types";

export const MOUNT_ATHOS_PREFECTURE_ID = 55;

type Locale = "el" | "en";

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

type GetCountryOptions = {
  locale?: Locale;
  type: "id" | "iso31661-a2" | "iso31661-a3" | "tld";
  value: string;
};

export function getCountry({ locale = "el", type = "id", value = "" }: GetCountryOptions): Country | null {
  const countries = getCountries({ locale });

  switch (type) {
    case "id":
      return countries.find((country) => country.id === value) ?? null;
    case "iso31661-a2":
      return countries.find((country) => country.iso31661.A2 === value) ?? null;
    case "iso31661-a3":
      return countries.find((country) => country.iso31661.A3 === value) ?? null;
    case "tld":
      return countries.find((country) => country.tld === value) ?? null;
    default:
      return null;
  }
}
