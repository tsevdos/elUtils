import { getAllTaxOffices } from "./getAllTaxOffices";
import type { Locale, TaxOffice } from "./types";

type GetTaxOfficesByMunicipalityIdOptions = { id: number; locale?: Locale };

/**
 * This function returns all tax offices associated with a specific municipality based on the provided municipality id and locale.
 *
 * @param {GetTaxOfficesByMunicipalityIdOptions} options - An object that contains the municipality id and locale options.
 * @param {string} options.id - The id of the municipality for which tax offices are to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
 *
 * @returns {TaxOffice[]} - An array of tax offices associated with the specified municipality for the specified locale.
 */
export function getTaxOfficesByMunicipalityId(options: GetTaxOfficesByMunicipalityIdOptions): TaxOffice[] {
  const { id, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return allTaxOffices.filter((taxOffice) => taxOffice.relations.municipalityIds?.includes(id));
}
