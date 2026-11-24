import { getAdministrativeRegions } from "./getAdministrativeRegions";
import type { AdministrativeUnitsOptions, Region, Unit, UnitWithoutMunicipalities } from "./types";

/**
 * Returns the administrative units based on the provided options.
 *
 * @param {AdministrativeUnitsOptions} [options={}] - Options for selecting the locale,
 * Mount Athos inclusion, and unit data level.
 * @param {"el" | "en"} [options.locale="el"] - The locale of unit and municipality names. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos.
 * @param {"unit" | "municipality"} [options.level="municipality"] - Whether to include municipalities in each unit.
 *
 * @returns {Unit[] | UnitWithoutMunicipalities[]} The administrative units in the specified locale and level.
 */
export function getAdministrativeUnits({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeUnitsOptions = {}): Unit[] | UnitWithoutMunicipalities[] {
  const administrativeUnits = (getAdministrativeRegions({ locale, includeMountAthos }) as Region[]).flatMap(
    ({ units }) => [...units],
  ) as Unit[];

  if (level === "unit") {
    return administrativeUnits.map(({ municipalities: _municipalities, ...unit }) => unit);
  }

  return administrativeUnits;
}
