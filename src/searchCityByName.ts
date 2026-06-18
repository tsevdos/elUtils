import { getCities } from "./getCities";
import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import { type Locale, type City } from "./types";

type CityBySearchTermOptions = { searchTerm: string; locale?: Locale };

/**
 * Searches for cities by name in a specified locale.
 *
 * This function filters cities based on the provided search term. For the Greek locale (`"el"`),
 * it uses a specialized string comparison function to handle Greek-specific comparisons.
 * For other locales, it performs a case-insensitive comparison.
 *
 * @param {CityBySearchTermOptions} options - The options for the search.
 * @param {string} options.searchTerm - The term to search for in the city names.
 * @param {string} [options.locale="el"] - The locale to search in (default is `"el"` for Greek).
 *
 * @returns {City[]|null} A list of cities that match the search term, or `null` if no matches are found.
 */
export function searchCityByName({ searchTerm, locale = "el" }: CityBySearchTermOptions): City[] | null {
  const cities = getCities({ locale });
  const normalizedSearchTerm = normalizeAndUppercaseGreekString(searchTerm);
  let citiesByName: City[] = [];

  if (locale === "el") {
    citiesByName = cities.filter((city) => normalizeAndUppercaseGreekString(city.name).includes(normalizedSearchTerm));
  }

  if (locale === "en") {
    citiesByName = cities.filter((city) => city.name.toUpperCase().includes(searchTerm.toUpperCase()));
  }

  return citiesByName?.length ? citiesByName : null;
}
