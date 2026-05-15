import { getAdministrativeRegions } from "./getAdministrativeRegions";
import { AdministrativeUnitsOptions, Region, Unit, UnitWithoutMunicipalities } from "./types";

/**
 * Returns the administrative units based on the provided options.
 *
 * @param {AdministrativeUnitsOptions} options - The options for locale, whether to include Mount Athos, and the level area ("unit" | "municipality") to retrieve
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
