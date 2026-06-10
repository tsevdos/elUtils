import { getCities } from "./getCities";
import { type Locale, type City } from "./types";

type CityByIdOptions = { id: number; locale?: Locale };

/**
 * Returns a city by its ID based on the provided options.
 *
 * @param {CityByIdOptions} options - The options for fetching the city by ID.
 * @param {number} options.id - The ID of the city to retrieve.
 * @param {string} [options.locale="el"] - The locale to use when retrieving cities. Defaults to "el".
 *
 * @returns {City|undefined} - The city with the specified ID, or `undefined` if not found.
 */
export function getCityById(options: CityByIdOptions): City | undefined {
  const { id, locale = "el" } = options;
  const citiesData = getCities({ locale });

  return citiesData.find((city) => city.id === id);
}
