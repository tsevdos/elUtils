import { getAllTaxOffices } from "./getAllTaxOffices";
import { type Locale, type TaxOffice } from "./types";

type GetTaxOfficesByRegionIdOptions = { id: number; locale?: Locale };

/**
 * This function returns all tax offices in a specific region based on the provided region id and locale.
 *
 * @param {GetTaxOfficesByRegionIdOptions} options - An object that contains the region id and locale options.
 * @param {string} options.id - The id of the region for which tax offices are to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
 *
 * @returns {TaxOffice[]} - An array of tax offices in the specified region for the specified locale.
 */
export function getTaxOfficesByRegionId(options: GetTaxOfficesByRegionIdOptions): TaxOffice[] {
  const { id, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return allTaxOffices.filter((taxOffice) => taxOffice.relations.regionId === id);
}
