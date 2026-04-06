import { getAdministrativeRegions } from "./getAdministrativeRegions";
import { type AdministrativeRegionsOptions, type Region, type RegionWithoutUnits } from "./types";

type AdministrativeRegionByIsoCodeOptions = { isocode: string } & AdministrativeRegionsOptions;

/**
 * Returns the administrative region with the provided ISO code.
 *
 * @param {AdministrativeRegionByIsoCodeOptions} options - The options for ISO code, locale, whether to include Mount Athos and the level area ("region" | "unit" | "municipality") to retrieve
 *
 * @returns {Region | RegionWithoutUnits | undefined} The administrative region with the specified ISO code, or `undefined` if no such region exists.
 */
export function getAdministrativeRegionByIsoCode(
  options: AdministrativeRegionByIsoCodeOptions,
): Region | RegionWithoutUnits | undefined {
  const { isocode, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.iso31662 === isocode);
}
