import { getCountries } from "./getCountries";
import type { Country, Locale } from "./types";

type GetCountryOptions = {
  locale?: Locale;
  type: "id" | "iso31661-a2" | "iso31661-a3" | "tld";
  value: string;
};

/**
 * Finds a country by its ID, ISO 3166-1 code, or top-level domain.
 *
 * @param {GetCountryOptions} options - The lookup criteria.
 * @param {"el" | "en"} [options.locale="el"] - The locale of the returned country.
 * @param {"id" | "iso31661-a2" | "iso31661-a3" | "tld"} options.type - The country identifier to search by.
 * @param {string} options.value - The identifier value to match.
 *
 * @returns {Country | null} The matching country, or `null` if no country matches.
 */
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
