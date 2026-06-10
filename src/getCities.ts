import citiesEl from "./data/cities-el.json";
import citiesEn from "./data/cities-en.json";
import { type Locale, type City } from "./types";

const cities = { el: citiesEl, en: citiesEn } as const;

type CitiesOptions = { locale?: Locale };

/**
 * Returns a list of cities based on the provided locale.
 *
 * @param {CitiesOptions} [options={}] - Options for fetching cities.
 * @param {string} [options.locale="el"] - The locale to use when retrieving cities. Defaults to "el".
 *
 * @returns {City[]} - An array of cities for the specified locale.
 */
export function getCities({ locale = "el" }: CitiesOptions = {}): City[] {
  return cities[locale];
}
