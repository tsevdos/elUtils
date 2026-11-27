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
  locale?: Locale;
  entity: "region" | "unit" | "prefecture";
};

/**
 * Retrieves the requested administrative division associated with a city.
 *
 * @param {CityAdministrativeDivisionOptions} options - The city and division to look up.
 * @param {number} options.cityId - The ID of the city whose division is requested.
 * @param {"el" | "en"} [options.locale="el"] - The locale of the returned division.
 * @param {"region" | "unit" | "prefecture"} options.entity - The type of administrative division to return.
 *
 * @returns {Region | RegionWithoutUnits | Unit | UnitWithoutMunicipalities | Prefecture | undefined}
 * The deeply immutable requested division, or `undefined` if the city or division is not found.
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
