import { getAllTaxOffices } from "./getAllTaxOffices";
import type { Locale, TaxOffice } from "./types";

type GetTaxOfficeByIdOptions = { id: number; locale?: Locale };

/**
 * This function returns a tax office based on the provided id and locale.
 *
 * @param {GetTaxOfficeByIdOptions} options - An object that contains the id and locale options.
 * @param {number} options.id - The id of the tax office to be returned.
 * @param {"el" | "en"} [options.locale="el"] - The locale based on which the tax office is returned. Default is "el".
 *
 * @returns {TaxOffice | undefined} The deeply immutable tax office, or `undefined` if not found.
 */
export function getTaxOfficeById(options: GetTaxOfficeByIdOptions): TaxOffice | undefined {
  const { id, locale = "el" } = options;
  const taxOffices = getAllTaxOffices({ locale });

  return taxOffices.find((taxOffice) => taxOffice.id === id);
}
