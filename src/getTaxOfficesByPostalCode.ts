import { getAllTaxOffices } from "./getAllTaxOffices";
import type { Locale, TaxOffice } from "./types";

type GetTaxOfficesByPostalCodeOptions = { postalCode: number; locale?: Locale };

/**
 * This function returns the tax offices that match the given postal code.
 *
 * @param {GetTaxOfficesByPostalCodeOptions} options - The options for getting tax offices.
 * @param {string} options.postalCode - The postal code to match.
 * @param {string} [options.locale="el"] - The locale to use. Default is "el".
 *
 * @returns {TaxOffice[]} The tax offices that match the given postal code.
 */
export function getTaxOfficesByPostalCode(options: GetTaxOfficesByPostalCodeOptions): TaxOffice[] {
  const { postalCode, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return allTaxOffices.filter((taxOffice) => taxOffice.postalCodes?.includes(postalCode));
}
