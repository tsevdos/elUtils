import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import { getAllTaxOffices } from "./getAllTaxOffices";
import { deepFreeze } from "./helpers/immutable";
import type { Locale, TaxOffice } from "./types";

type TaxOfficeOptionsByTerm = { searchTerm: string; locale?: Locale };

/**
 * Searches tax office names for the given term in the selected locale.
 *
 * @param {TaxOfficeOptionsByTerm} options - The search term and optional locale.
 * @param {string} options.searchTerm - The term to find in tax office names.
 * A blank or whitespace-only term returns an empty array.
 * @param {"el" | "en"} [options.locale="el"] - The locale in which to search. Defaults to Greek.
 *
 * @returns {readonly TaxOffice[]} The deeply immutable matching tax offices, or an empty array if none match.
 */
export function searchTaxOffice(options: TaxOfficeOptionsByTerm): readonly TaxOffice[] {
  const { searchTerm, locale = "el" } = options;

  if (searchTerm.trim() === "") return Object.freeze([]);

  const normalizedTerm = normalizeAndUppercaseGreekString(searchTerm);

  return deepFreeze(
    getAllTaxOffices({ locale }).filter(({ name }) => normalizeAndUppercaseGreekString(name).includes(normalizedTerm)),
  );
}
