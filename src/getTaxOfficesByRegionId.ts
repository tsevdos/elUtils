import { getAllTaxOffices } from "./getAllTaxOffices";
import { type Locale, type TaxOffice } from "./types";

type GetTaxOfficesByRegionIdOptions = { id: number; locale?: Locale };

/**
 * Returns all tax offices associated with a region.
 *
 * @param {GetTaxOfficesByRegionIdOptions} options - An object that contains the region id and locale options.
 * @param {number} options.id - The ID of the region.
 * @param {"el" | "en"} [options.locale="el"] - The locale of returned tax office names. Defaults to Greek.
 *
 * @returns {TaxOffice[]} - An array of tax offices in the specified region for the specified locale.
 */
export function getTaxOfficesByRegionId(options: GetTaxOfficesByRegionIdOptions): TaxOffice[] {
  const { id, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return allTaxOffices.filter((taxOffice) => taxOffice.relations.regionId === id);
}
