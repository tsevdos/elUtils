import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import taxOfficesEl from "./data/taxOffices-el.json";
import taxOfficesEn from "./data/taxOffices-en.json";
import type { Locale, TaxOffice } from "./types";

const allTaxOffices = { el: taxOfficesEl, en: taxOfficesEn } as const;

type TaxOfficeOptionsByTerm = { searchTerm: string; locale?: Locale };

/**
 * Searches tax office names for the given term in the selected locale.
 *
 * @param {TaxOfficeOptionsByTerm} options - The search term and optional locale.
 * @param {string} options.searchTerm - The term to find in tax office names.
 * A blank or whitespace-only term returns an empty array.
 * @param {"el" | "en"} [options.locale="el"] - The locale in which to search. Defaults to Greek.
 *
 * @returns {TaxOffice[]} The matching tax offices, or an empty array if none match.
 */
export function searchTaxOffice(options: TaxOfficeOptionsByTerm): TaxOffice[] {
  const { searchTerm, locale = "el" } = options;

  if (searchTerm.trim() === "") return [];

  const normalizedTerm = normalizeAndUppercaseGreekString(searchTerm);

  return allTaxOffices[locale].filter(({ name }) => normalizeAndUppercaseGreekString(name).includes(normalizedTerm));
}
