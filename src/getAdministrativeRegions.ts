import type { AdministrativeRegionsOptions, Region, RegionWithoutUnits } from "./types";
import administrativeRegionsEl from "./data/administrative-regions-el.json";
import administrativeRegionsEn from "./data/administrative-regions-en.json";

export const MOUNT_ATHOS_REGION_ID = 14;

const administrativeRegions = {
  el: administrativeRegionsEl,
  en: administrativeRegionsEn,
} as const;

const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
};

/**
 * Returns the administrative regions based on the provided options.
 *
 * **Note**: The returned data should be treated as read-only.
 * Mutating the returned objects or arrays may affect future calls and other consumers of this library.
 *
 * @param {AdministrativeRegionsOptions} options - The options for locale, whether to include Mount Athos and the level area ("region" | "unit" | "municipality") to retrieve
 *
 * @returns {Region[] | RegionWithoutUnits[]} The administrative regions in the specified locale and the level area to retrieve.
 */
export function getAdministrativeRegions({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeRegionsOptions = {}): Region[] | RegionWithoutUnits[] {
  const regionsData = includeMountAthos
    ? administrativeRegions[locale]
    : administrativeRegionsWithoutMountAthos[locale];

  if (level === "region") {
    return regionsData.map(({ units: _unit, ...region }) => region);
  }

  if (level === "unit") {
    return regionsData.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
    }));
  }

  return regionsData;
}
