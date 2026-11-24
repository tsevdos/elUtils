import { getAdministrativeUnits } from "./getAdministrativeUnits";
import { type Unit, type UnitWithoutMunicipalities, type AdministrativeUnitsOptions } from "./types";

type AdministrativeUnitByIdOptions = { id: number } & AdministrativeUnitsOptions;

/**
 * Returns an administrative unit by ID.
 *
 * @param {AdministrativeUnitByIdOptions} options - The ID and optional unit lookup settings.
 * @param {number} options.id - The administrative unit ID.
 * @param {"el" | "en"} [options.locale="el"] - The locale of unit names. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos in the lookup.
 * @param {"unit" | "municipality"} [options.level="municipality"] - Whether to return units with municipalities
 * (`"municipality"`) or without them (`"unit"`).
 *
 * @returns {Unit | UnitWithoutMunicipalities | undefined} The matching unit, or `undefined` if no unit has that ID.
 */
export function getAdministrativeUnitById(
  options: AdministrativeUnitByIdOptions,
): Unit | UnitWithoutMunicipalities | undefined {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const unitsData = getAdministrativeUnits({ locale, includeMountAthos, level });

  return unitsData.find((unit) => unit.id === id);
}
