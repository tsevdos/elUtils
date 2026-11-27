import { getAdministrativeRegions } from "./getAdministrativeRegions";
import type { AdministrativeRegionsOptions, Region, RegionWithoutUnits } from "./types";

type AdministrativeRegionByIdOptions = { id: number } & AdministrativeRegionsOptions;

/**
 * Returns an administrative region by ID.
 *
 * @param {AdministrativeRegionByIdOptions} options - The ID and optional region lookup settings.
 * @param {number} options.id - The administrative region ID.
 * @param {"el" | "en"} [options.locale="el"] - The locale of region names. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos in the lookup.
 * @param {"region" | "unit" | "municipality"} [options.level="municipality"] - The level of region data to retrieve.
 *
 * @returns {Region | RegionWithoutUnits | undefined} The deeply immutable matching region, or `undefined` if not found.
 */
export function getAdministrativeRegionById(
  options: AdministrativeRegionByIdOptions,
): Region | RegionWithoutUnits | undefined {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.id === id);
}
