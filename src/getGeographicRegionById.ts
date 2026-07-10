import { type GeographicRegion, type Locale } from "./types";
import { getGeographicRegions } from "./getGeographicRegions";

type GeographicRegionByIdOptions = { id: number; locale?: Locale };

/**
 * Returns the geographic region with the specific ID.
 *
 * @param {GeographicRegionByIdOptions} options - The options for ID and locale.
 *
 * @returns {GeographicRegion | undefined} The geographic region with the specified ID, or `undefined` if no such region exists.
 */
export function getGeographicRegionById(options: GeographicRegionByIdOptions): GeographicRegion | undefined {
  const { id, locale = "el" } = options;
  const geographicRegions = getGeographicRegions({ locale: locale });

  return geographicRegions.find((region) => region.id === id);
}
