import { getCityById } from "./getCityById";
import { getAdministrativeRegionById } from "./getAdministrativeRegionById";
import { getAdministrativeUnitById } from "./getAdministrativeUnitById";
import { getPrefectureById } from "./getPrefectureById";
import {
  type Locale,
  type Region,
  type RegionWithoutUnits,
  type Unit,
  type UnitWithoutMunicipalities,
  type Prefecture,
} from "./types";

type CityAdministrativeDivisionOptions = {
  cityId: number;
  locale: Locale;
  entity: "region" | "unit" | "prefecture";
};

/**
 * Retrieves related administrative entities for a given city based on the provided options.
 *
 * @param {CityAdministrativeDivisionOptions} options - The options for finding city relations.
 * @param {number} options.id - The ID of the city to retrieve relations for.
 * @param {string} [options.locale="el"] - The locale to use when retrieving related entities. Defaults to "el".
 * @param {("region"|"unit"|"municipality"|"prefecture")} options.entity - The type of related entity to retrieve.
 *
 * @returns {Region|Unit|RegionWithoutUnits|Prefecture|undefined} - The related entity based on the specified type, or `undefined` if not found.
 */
export function getCityAdministrativeDivision(
  options: CityAdministrativeDivisionOptions,
): Region | RegionWithoutUnits | Unit | UnitWithoutMunicipalities | Prefecture | undefined {
  const { cityId, locale = "el", entity } = options;
  const city = getCityById({ id: cityId, locale });

  if (entity === "region" && city) {
    return getAdministrativeRegionById({ id: city.relations.regionId, locale, level: entity });
  }

  if (entity === "unit" && city) {
    return getAdministrativeUnitById({ id: city.relations.unitId, locale, level: entity });
  }

  if (entity === "prefecture" && city) {
    return getPrefectureById({ id: city.relations.prefectureId, locale });
  }

  return undefined;
}
