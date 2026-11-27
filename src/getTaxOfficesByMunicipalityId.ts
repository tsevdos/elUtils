import { getAllTaxOffices } from "./getAllTaxOffices";
import { deepFreeze } from "./helpers/immutable";
import type { Locale, TaxOffice } from "./types";

type GetTaxOfficesByMunicipalityIdOptions = { id: number; locale?: Locale };

/**
 * Returns all tax offices associated with a municipality.
 *
 * @param {GetTaxOfficesByMunicipalityIdOptions} options - The municipality ID and optional locale.
 * @param {number} options.id - The ID of the municipality.
 * @param {"el" | "en"} [options.locale="el"] - The locale of returned tax office names. Defaults to Greek.
 *
 * @returns {readonly TaxOffice[]} A deeply immutable array of tax offices associated with the specified municipality and locale.
 */
export function getTaxOfficesByMunicipalityId(options: GetTaxOfficesByMunicipalityIdOptions): readonly TaxOffice[] {
  const { id, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return deepFreeze(allTaxOffices.filter((taxOffice) => taxOffice.relations.municipalityIds?.includes(id)));
}
