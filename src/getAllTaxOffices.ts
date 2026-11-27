import taxOfficesEl from "./data/taxOffices-el.json";
import taxOfficesEn from "./data/taxOffices-en.json";
import type { Locale, TaxOffice } from "./types";
import { immutableSnapshot } from "./helpers/immutable";

const allTaxOffices = immutableSnapshot({ el: taxOfficesEl, en: taxOfficesEn });

type TaxOfficeOptions = { locale?: Locale };

/**
 * Returns all tax offices in the selected locale.
 *
 * The returned data is deeply immutable.
 *
 * @param {TaxOfficeOptions} [options={}] - Options for selecting the locale.
 * @param {"el" | "en"} [options.locale="el"] - The locale of tax office names. Defaults to Greek.
 *
 * @returns {readonly TaxOffice[]} All tax offices in the selected locale, deeply immutable.
 */
export function getAllTaxOffices({ locale = "el" }: TaxOfficeOptions = {}): readonly TaxOffice[] {
  return allTaxOffices[locale];
}
