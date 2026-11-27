import { getCities } from "./getCities";
import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import { type Locale, type City } from "./types";
import { deepFreeze } from "./helpers/immutable";

type CityBySearchTermOptions = { searchTerm: string; locale?: Locale };

/**
 * Searches city names in the specified locale.
 *
 * Greek searches ignore accents and selected punctuation; English searches are case-insensitive.
 * An empty search term matches all cities in the selected locale.
 *
 * @param {CityBySearchTermOptions} options - The options for the search.
 * @param {string} options.searchTerm - The term to search for in the city names.
 * @param {"el" | "en"} [options.locale="el"] - The locale to search. Defaults to Greek.
 *
 * @returns {readonly City[] | null} The deeply immutable matching cities, or `null` if there are no matches.
 */
export function searchCityByName({ searchTerm, locale = "el" }: CityBySearchTermOptions): readonly City[] | null {
  const cities = getCities({ locale });
  const normalizedSearchTerm = normalizeAndUppercaseGreekString(searchTerm);
  let citiesByName: City[] = [];

  if (locale === "el") {
    citiesByName = cities.filter((city) => normalizeAndUppercaseGreekString(city.name).includes(normalizedSearchTerm));
  }

  if (locale === "en") {
    citiesByName = cities.filter((city) => city.name.toUpperCase().includes(searchTerm.toUpperCase()));
  }

  return citiesByName?.length ? deepFreeze(citiesByName) : null;
}
