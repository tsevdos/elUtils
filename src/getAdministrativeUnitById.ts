import { getAdministrativeUnits } from "./getAdministrativeUnits";
import { type Unit, type UnitWithoutMunicipalities, type AdministrativeUnitsOptions } from "./types";

type AdministrativeUnitByIdOptions = { id: number } & AdministrativeUnitsOptions;

/**
 * Returns the administrative unit with the provided ID.
 *
 * @param {AdministrativeUnitByIdOptions} options - The options for ID, locale, whether to include Mount Athos, and the level area ("unit" | "municipality") to retrieve
 *
 * @returns {Unit | UnitWithoutMunicipalities | undefined} The administrative unit with the specified ID, or `undefined` if no such unit exists.
 */
export function getAdministrativeUnitById(
  options: AdministrativeUnitByIdOptions,
): Unit | UnitWithoutMunicipalities | undefined {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const unitsData = getAdministrativeUnits({ locale, includeMountAthos, level });

  return unitsData.find((unit) => unit.id === id);
}
