import { getAdministrativeRegions } from "./getAdministrativeRegions";
import { type AdministrativeRegionsOptions, type Region, type RegionWithoutUnits } from "./types";

type AdministrativeRegionByIsoCodeOptions = { isocode: string } & AdministrativeRegionsOptions;

/**
 * Returns an administrative region by its ISO 3166-2 code.
 *
 * @param {AdministrativeRegionByIsoCodeOptions} options - The ISO code and optional region lookup settings.
 * @param {string} options.isocode - The ISO 3166-2 code to match (for example, `"GR-A"`).
 * @param {"el" | "en"} [options.locale="el"] - The locale of region names. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos in the lookup.
 * @param {"region" | "unit" | "municipality"} [options.level="municipality"] - The level of region data to retrieve.
 *
 * @returns {Region | RegionWithoutUnits | undefined} The matching region, or `undefined` if no region has that code.
 */
export function getAdministrativeRegionByIsoCode(
  options: AdministrativeRegionByIsoCodeOptions,
): Region | RegionWithoutUnits | undefined {
  const { isocode, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.iso31662 === isocode);
}
