import { getAllTaxOffices } from "./getAllTaxOffices";
import type { Locale, TaxOffice } from "./types";

type GetTaxOfficeByIdOptions = { id: number; locale?: Locale };

/**
 * This function returns a tax office based on the provided id and locale.
 *
 * @param {GetTaxOfficeByIdOptions} options - An object that contains the id and locale options.
 * @param {string} options.id - The id of the tax office to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax office is returned. Default is "el".
 *
 * @returns {TaxOffice | undefined} - The tax office with the specified id for the specified locale, or undefined if no such tax office exists.
 */
export function getTaxOfficeById(options: GetTaxOfficeByIdOptions): TaxOffice | undefined {
  const { id, locale = "el" } = options;
  const taxOffices = getAllTaxOffices({ locale });

  return taxOffices.find((taxOffice) => taxOffice.id === id);
}
