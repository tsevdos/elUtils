import { getAdministrativeRegionById } from "./getAdministrativeRegionById";
import { getAdministrativeUnitById } from "./getAdministrativeUnitById";
import { getPrefectureById } from "./getPrefectureById";
import type { Locale, Prefecture, RegionWithoutUnits, UnitWithoutMunicipalities } from "./types";
import postalCodes from "./data/postal-codes.json";

type FindByPostalCodeOptions = {
  locale: Locale;
  entity: "prefecture" | "region" | "unit";
};

/**
 * Returns the prefecture, region, or unit associated with the provided postal code.
 *
 * @param {string} postalCode - The postal code to look up.
 * @param {Partial<FindByPostalCodeOptions>} [options] - Options for selecting the locale and entity type.
 * @param {"el" | "en"} [options.locale="el"] - The locale of the returned entity.
 * @param {"prefecture" | "region" | "unit"} [options.entity="prefecture"] - The type of entity to return.
 *
 * @returns {Prefecture | RegionWithoutUnits | UnitWithoutMunicipalities | undefined} The matching entity,
 * or `undefined` if the postal code has no associated entity.
 */
export function findByPostalCode(
  postalCode: string,
  options?: Partial<FindByPostalCodeOptions>,
): Prefecture | RegionWithoutUnits | UnitWithoutMunicipalities | undefined {
  const { locale, entity } = { locale: "el", entity: "prefecture", ...options } as FindByPostalCodeOptions;
  const includeMountAthos = false; // never include Mount Athos. No postal codes there.
  const postalCodeData = postalCodes.find((entry) => entry.postalCodes.includes(postalCode));

  if (!postalCodeData) {
    return undefined;
  }

  if (entity === "prefecture") {
    const id = postalCodeData.prefectureId;
    return getPrefectureById({ id, locale, includeMountAthos }) as Prefecture;
  }

  if (entity === "region") {
    const id = postalCodeData.regionAndUnit.regionId;
    return getAdministrativeRegionById({ id, locale, level: "region", includeMountAthos }) as RegionWithoutUnits;
  }

  if (entity === "unit") {
    const id = postalCodeData.regionAndUnit.unitId;
    return getAdministrativeUnitById({ id, locale, level: "unit", includeMountAthos }) as UnitWithoutMunicipalities;
  }

  return undefined;
}
