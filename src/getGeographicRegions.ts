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
 * @param {GeographicRegionOptions} options - The options for locale.
 *
 * @returns {GeographicRegion[]} The geographic regions in the specified locale.
 */
export function getGeographicRegions({ locale = "el" }: GeographicRegionOptions = {}): GeographicRegion[] {
  return geographicRegions[locale];
}
