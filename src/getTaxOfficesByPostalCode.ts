import { getAllTaxOffices } from "./getAllTaxOffices";
import { deepFreeze } from "./helpers/immutable";
import type { Locale, TaxOffice } from "./types";

type GetTaxOfficesByPostalCodeOptions = { postalCode: number; locale?: Locale };

/**
 * This function returns the tax offices that match the given postal code.
 *
 * @param {GetTaxOfficesByPostalCodeOptions} options - The options for getting tax offices.
 * @param {number} options.postalCode - The numeric postal code to match.
 * @param {"el" | "en"} [options.locale="el"] - The locale of returned tax office names. Defaults to Greek.
 *
 * @returns {readonly TaxOffice[]} The deeply immutable tax offices that match the given postal code.
 */
export function getTaxOfficesByPostalCode(options: GetTaxOfficesByPostalCodeOptions): readonly TaxOffice[] {
  const { postalCode, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return deepFreeze(allTaxOffices.filter((taxOffice) => taxOffice.postalCodes?.includes(postalCode)));
}
