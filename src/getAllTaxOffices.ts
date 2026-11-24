import taxOfficesEl from "./data/taxOffices-el.json";
import taxOfficesEn from "./data/taxOffices-en.json";
import type { Locale, TaxOffice } from "./types";

const allTaxOffices = { el: taxOfficesEl, en: taxOfficesEn } as const;

type TaxOfficeOptions = { locale?: Locale };

/**
 * Returns all tax offices in the selected locale.
 *
 * **Note**: The returned array and its objects are shared data and should be treated as read-only.
 * Mutating them may affect future calls and other consumers of this library.
 *
 * @param {TaxOfficeOptions} [options={}] - Options for selecting the locale.
 * @param {"el" | "en"} [options.locale="el"] - The locale of tax office names. Defaults to Greek.
 *
 * @returns {TaxOffice[]} All tax offices in the selected locale.
 */
export function getAllTaxOffices({ locale = "el" }: TaxOfficeOptions = {}): TaxOffice[] {
  return allTaxOffices[locale];
}
