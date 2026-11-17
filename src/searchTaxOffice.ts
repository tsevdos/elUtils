import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import taxOfficesEl from "./data/taxOffices-el.json";
import taxOfficesEn from "./data/taxOffices-en.json";
import type { Locale, TaxOffice } from "./types";

const allTaxOffices = { el: taxOfficesEl, en: taxOfficesEn } as const;

type TaxOfficeOptionsByTerm = { searchTerm: string; locale?: Locale };

/**
 * This function returns the tax offices that match the given search term.
 *
 * @param {TaxOfficeOptionsByTerm} [options={}] - The options for searching tax offices.
 * @param {string} options.searchTerm - The search term to match.
 * @param {string} [options.locale="el"] - The locale to use. Default is "el".
 *
 * @returns {TaxOffice[] | TaxOffice} The tax offices that match the given search term, or all tax offices if no search term is provided.
 */
export function searchTaxOffice(options: TaxOfficeOptionsByTerm): TaxOffice[] {
  const { searchTerm, locale = "el" } = options;

  if (searchTerm.trim() === "") return [];

  const normalizedTerm = normalizeAndUppercaseGreekString(searchTerm);

  return allTaxOffices[locale].filter(({ name }) => normalizeAndUppercaseGreekString(name).includes(normalizedTerm));
}
