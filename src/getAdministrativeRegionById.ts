import { getAdministrativeRegions } from "./getAdministrativeRegions";
import type { AdministrativeRegionsOptions, Region, RegionWithoutUnits } from "./types";

type AdministrativeRegionByIdOptions = { id: number } & AdministrativeRegionsOptions;

/**
 * Returns the administrative region with the provided ID.
 *
 * @param {AdministrativeRegionByIdOptions} options - The options for ID, locale, whether to include Mount Athos and the level area ("region" | "unit" | "municipality") to retrieve
 *
 * @returns {Region | RegionWithoutUnits | undefined} The administrative region with the specified ID, or `undefined` if no such region exists.
 */
export function getAdministrativeRegionById(
  options: AdministrativeRegionByIdOptions,
): Region | RegionWithoutUnits | undefined {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.id === id);
}
