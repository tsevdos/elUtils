import { getAdministrativeRegions } from "./getAdministrativeRegions";
import type { AdministrativeUnitsOptions, Region, Unit, UnitWithoutMunicipalities } from "./types";
import { deepFreeze } from "./helpers/immutable";

/**
 * Returns the administrative units based on the provided options.
 *
 * @param {AdministrativeUnitsOptions} [options={}] - Options for selecting the locale,
 * Mount Athos inclusion, and unit data level.
 * @param {"el" | "en"} [options.locale="el"] - The locale of unit and municipality names. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos.
 * @param {"unit" | "municipality"} [options.level="municipality"] - Whether to include municipalities in each unit.
 *
 * @returns {readonly Unit[] | readonly UnitWithoutMunicipalities[]} The deeply immutable units in the specified locale and level.
 */
export function getAdministrativeUnits({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeUnitsOptions = {}): readonly Unit[] | readonly UnitWithoutMunicipalities[] {
  const administrativeUnits = (
    getAdministrativeRegions({
      locale,
      includeMountAthos,
    }) as readonly Region[]
  ).flatMap(({ units }) => [...units]) as Unit[];

  if (level === "unit") {
    return deepFreeze(administrativeUnits.map(({ municipalities: _municipalities, ...unit }) => unit));
  }

  return deepFreeze(administrativeUnits);
}
