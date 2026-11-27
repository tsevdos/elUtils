import type { AdministrativeRegionsOptions, Region, RegionWithoutUnits } from "./types";
import administrativeRegionsEl from "./data/administrative-regions-el.json";
import administrativeRegionsEn from "./data/administrative-regions-en.json";
import { deepFreeze, immutableSnapshot } from "./helpers/immutable";

export const MOUNT_ATHOS_REGION_ID = 14;

const administrativeRegions = immutableSnapshot({
  el: administrativeRegionsEl,
  en: administrativeRegionsEn,
});

const administrativeRegionsWithoutMountAthos = deepFreeze({
  el: administrativeRegions.el.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
});

/**
 * Returns the administrative regions based on the provided options.
 *
 * The returned data is deeply immutable.
 *
 * @param {AdministrativeRegionsOptions} [options={}] - Options for selecting the locale,
 * Mount Athos inclusion, and data level.
 * @param {"el" | "en"} [options.locale="el"] - The locale of region, unit, and municipality names. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos.
 * @param {"region" | "unit" | "municipality"} [options.level="municipality"] - The nesting level to return.
 *
 * @returns {readonly Region[] | readonly RegionWithoutUnits[]} The deeply immutable regions in the specified locale and data level.
 */
export function getAdministrativeRegions({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeRegionsOptions = {}): readonly Region[] | readonly RegionWithoutUnits[] {
  const regionsData = includeMountAthos
    ? administrativeRegions[locale]
    : administrativeRegionsWithoutMountAthos[locale];

  if (level === "region") {
    return deepFreeze(regionsData.map(({ units: _unit, ...region }) => region));
  }

  if (level === "unit") {
    return deepFreeze(
      regionsData.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      })),
    );
  }

  return regionsData;
}
