import geographicRegionsEl from "./data/geographic-regions-el.json";
import geographicRegionsEn from "./data/geographic-regions-en.json";
import { type Locale, type GeographicRegion } from "./types";

const geographicRegions = {
  el: geographicRegionsEl,
  en: geographicRegionsEn,
} as const;

type GeographicRegionOptions = { locale?: Locale };

/**
 * Returns the geographic regions in the provided locale.
 *
 * **Note**: The returned array and its objects are shared data and should be treated as read-only.
 * Mutating them may affect future calls and other consumers of this library.
 *
 * @param {GeographicRegionOptions} [options={}] - Options for selecting the locale.
 * @param {"el" | "en"} [options.locale="el"] - The locale of region names. Defaults to Greek.
 *
 * @returns {GeographicRegion[]} The geographic regions in the specified locale.
 */
export function getGeographicRegions({ locale = "el" }: GeographicRegionOptions = {}): GeographicRegion[] {
  return geographicRegions[locale];
}
