import { getAllTaxOffices } from "./getAllTaxOffices";
import type { Locale, TaxOffice } from "./types";

type GetTaxOfficesByUnitIdOptions = { id: number; locale?: Locale };

/**
 * This function returns all tax offices associated with a specific regional unit based on the provided unit id and locale.
 *
 * @param {GetTaxOfficesByUnitIdOptions} options - An object that contains the unit id and locale options.
 * @param {string} options.id - The id of the unit for which tax offices are to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
 *
 * @returns {TaxOffice[]} - An array of tax offices associated with the specified unit for the specified locale.
 */
export function getTaxOfficesByUnitId(options: GetTaxOfficesByUnitIdOptions): TaxOffice[] {
  const { id, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return allTaxOffices.filter((taxOffice) => taxOffice.relations.unitIds?.includes(id));
}
