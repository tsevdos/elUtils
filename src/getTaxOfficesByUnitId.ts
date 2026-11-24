import { getAllTaxOffices } from "./getAllTaxOffices";
import type { Locale, TaxOffice } from "./types";

type GetTaxOfficesByUnitIdOptions = { id: number; locale?: Locale };

/**
 * Returns all tax offices associated with a regional unit.
 *
 * @param {GetTaxOfficesByUnitIdOptions} options - An object that contains the unit id and locale options.
 * @param {number} options.id - The ID of the regional unit.
 * @param {"el" | "en"} [options.locale="el"] - The locale of returned tax office names. Defaults to Greek.
 *
 * @returns {TaxOffice[]} - An array of tax offices associated with the specified unit for the specified locale.
 */
export function getTaxOfficesByUnitId(options: GetTaxOfficesByUnitIdOptions): TaxOffice[] {
  const { id, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return allTaxOffices.filter((taxOffice) => taxOffice.relations.unitIds?.includes(id));
}
