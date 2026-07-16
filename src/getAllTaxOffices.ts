import taxOfficesEl from "./data/taxOffices-el.json";
import taxOfficesEn from "./data/taxOffices-en.json";
import type { Locale, TaxOffice } from "./types";

const allTaxOffices = { el: taxOfficesEl, en: taxOfficesEn } as const;

type TaxOfficeOptions = { locale?: Locale };

/**
 * This function returns all tax offices based on the provided locale.
 *
 * @param {TaxOfficeOptions} [options={}] - An object that contains the locale option.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
 *
 * @returns {TaxOffice[]} - An array of tax offices for the specified locale.
 */
export function getAllTaxOffices({ locale = "el" }: TaxOfficeOptions = {}): TaxOffice[] {
  return allTaxOffices[locale];
}
