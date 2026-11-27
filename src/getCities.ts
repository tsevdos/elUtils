import citiesEl from "./data/cities-el.json";
import citiesEn from "./data/cities-en.json";
import { type Locale, type City } from "./types";
import { immutableSnapshot } from "./helpers/immutable";

const cities = immutableSnapshot({ el: citiesEl, en: citiesEn });

type CitiesOptions = { locale?: Locale };

/**
 * Returns a list of cities based on the provided locale.
 *
 * The returned data is deeply immutable.
 *
 * @param {CitiesOptions} [options={}] - Options for fetching cities.
 * @param {"el" | "en"} [options.locale="el"] - The locale to use when retrieving cities. Defaults to "el".
 *
 * @returns {readonly City[]} A deeply immutable array of cities for the specified locale.
 */
export function getCities({ locale = "el" }: CitiesOptions = {}): readonly City[] {
  return cities[locale];
}
