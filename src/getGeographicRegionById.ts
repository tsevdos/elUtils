import { type GeographicRegion, type Locale } from "./types";
import { getGeographicRegions } from "./getGeographicRegions";

type GeographicRegionByIdOptions = { id: number; locale?: Locale };

/**
 * Returns a geographic region by ID.
 *
 * @param {GeographicRegionByIdOptions} options - The ID and optional locale.
 * @param {number} options.id - The geographic region ID.
 * @param {"el" | "en"} [options.locale="el"] - The locale of region names. Defaults to Greek.
 *
 * @returns {GeographicRegion | undefined} The matching region, or `undefined` if no region has that ID.
 */
export function getGeographicRegionById(options: GeographicRegionByIdOptions): GeographicRegion | undefined {
  const { id, locale = "el" } = options;
  const geographicRegions = getGeographicRegions({ locale });

  return geographicRegions.find((region) => region.id === id);
}
