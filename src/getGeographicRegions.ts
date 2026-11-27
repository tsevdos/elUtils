import geographicRegionsEl from "./data/geographic-regions-el.json";
import geographicRegionsEn from "./data/geographic-regions-en.json";
import { type Locale, type GeographicRegion } from "./types";
import { immutableSnapshot } from "./helpers/immutable";

const geographicRegions = immutableSnapshot({
  el: geographicRegionsEl,
  en: geographicRegionsEn,
});

type GeographicRegionOptions = { locale?: Locale };

/**
 * Returns the geographic regions in the provided locale.
 *
 * The returned data is deeply immutable.
 *
 * @param {GeographicRegionOptions} [options={}] - Options for selecting the locale.
 * @param {"el" | "en"} [options.locale="el"] - The locale of region names. Defaults to Greek.
 *
 * @returns {readonly GeographicRegion[]} The deeply immutable geographic regions in the specified locale.
 */
export function getGeographicRegions({ locale = "el" }: GeographicRegionOptions = {}): readonly GeographicRegion[] {
  return geographicRegions[locale];
}
