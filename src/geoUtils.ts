import { getAdministrativeRegionById } from "./getAdministrativeRegionById";
import geographicRegionsEl from "./data/geographic-regions-el.json";
import geographicRegionsEn from "./data/geographic-regions-en.json";
import postalCodes from "./data/postal-codes.json";
import taxOfficesEl from "../data/taxOffices-el.json";
import taxOfficesEn from "../data/taxOffices-en.json";
import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";
import countriesEl from "../data/countries-el.json";
import countriesEn from "../data/countries-en.json";
import type { Country, GeographicRegion, Prefecture, Region, TaxOffice, Unit } from "./types";
import { getAdministrativeUnitById } from "./getAdministrativeUnitById";
import { getPrefectureById } from "./getPrefectureById";

export const MOUNT_ATHOS_REGION_ID = 14;
export const MOUNT_ATHOS_PREFECTURE_ID = 55;

const geographicRegions = {
  el: geographicRegionsEl,
  en: geographicRegionsEn,
} as const;

const allTaxOffices = { el: taxOfficesEl, en: taxOfficesEn } as const;

const allCountries = { el: countriesEl, en: countriesEn } as const;

type Locale = "el" | "en";

type GeographicRegionOptions = { locale?: Locale };

type GeographicRegionByIdOptions = { id: number } & GeographicRegionOptions;

/**
 * Returns the geographic region with the specific ID.
 *
 * @param {GeographicRegionByIdOptions} options - The options for ID and locale.
 *
 * @returns {GeographicRegion | undefined} The geographic region with the specified ID, or `undefined` if no such region exists.
 */
export function getGeographicRegionById(options: GeographicRegionByIdOptions): GeographicRegion | undefined {
  const { id, locale = "el" } = options;

  return geographicRegions[locale].find((region) => region.id === id);
}

/**
 * Returns all postal codes.
 *
 * @returns {string[]} An array of all postal codes.
 */
export function getAllPostalCodes(): string[] {
  return postalCodes.flatMap(({ postalCodes }) => postalCodes);
}

type FindByPostalCodeOptions = {
  locale: Locale;
  entity: "prefecture" | "region" | "unit";
};

/**
 * Returns the prefecture, region, or unit associated with the provided postal code.
 *
 * @param {string} postalCode - The postal code to search for.
 * @param {FindByPostalCodeOptions} options - The options for locale and entity type.
 *
 * @returns {Prefecture | Region | Unit | undefined} The prefecture, region, or unit associated with the postal code, or `undefined` if no such entity exists.
 */
export function findByPostalCode(
  postalCode: string,
  options?: Partial<FindByPostalCodeOptions>,
): Prefecture | Region | Unit | undefined {
  const { locale, entity } = { locale: "el", entity: "prefecture", ...options } as FindByPostalCodeOptions;
  const includeMountAthos = false; // never include Mount Athos. No postal codes there.
  const postalCodeData = postalCodes.find((entry) => entry.postalCodes.includes(postalCode));

  if (!postalCodeData) {
    return undefined;
  }

  if (entity === "prefecture") {
    const id = postalCodeData.prefectureId;
    return getPrefectureById({ id, locale, includeMountAthos });
  }

  if (entity === "region") {
    const id = postalCodeData.regionAndUnit.regionId;
    return getAdministrativeRegionById({ id, locale, level: "region", includeMountAthos }) as Region;
  }

  if (entity === "unit") {
    const id = postalCodeData.regionAndUnit.unitId;
    return getAdministrativeUnitById({ id, locale, level: "unit", includeMountAthos }) as Unit;
  }

  return undefined;
}

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

type GetTaxOfficeByIdOptions = { id: number } & TaxOfficeOptions;

/**
 * This function returns a tax office based on the provided id and locale.
 *
 * @param {GetTaxOfficeByIdOptions} options - An object that contains the id and locale options.
 * @param {string} options.id - The id of the tax office to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax office is returned. Default is "el".
 *
 * @returns {TaxOffice | undefined} - The tax office with the specified id for the specified locale, or undefined if no such tax office exists.
 */
export function getTaxOfficeById(options: GetTaxOfficeByIdOptions): TaxOffice | undefined {
  const { id, locale = "el" } = options;

  return allTaxOffices[locale].find((taxOffice) => taxOffice.id === id);
}

type GetTaxOfficesByRegionIdOptions = {
  id: number;
} & TaxOfficeOptions;

/**
 * This function returns all tax offices in a specific region based on the provided region id and locale.
 *
 * @param {GetTaxOfficesByRegionIdOptions} options - An object that contains the region id and locale options.
 * @param {string} options.id - The id of the region for which tax offices are to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
 *
 * @returns {TaxOffice[]} - An array of tax offices in the specified region for the specified locale.
 */
export function getTaxOfficesByRegionId(options: GetTaxOfficesByRegionIdOptions): TaxOffice[] {
  const { id, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return allTaxOffices.filter((taxOffice) => taxOffice.relations.regionId === id);
}

type GetTaxOfficesByUnitIdOptions = {
  id: number;
} & TaxOfficeOptions;

/**
 * This function returns all tax offices associated with a specific regional unit based on the provided unit id and locale.
 *
 * @param {GetTaxOfficesByUnitIdOptions} options - An object that contains the unit id and locale options.
 * @param {string} options.id - The id of the unit for which tax offices are to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
 *
 * @returns {TaxOffice[]} - An array of tax offices associated with the specified unit for the specified locale.
 */
export function getTaxOfficesByUnitId(options: GetTaxOfficesByUnitIdOptions): TaxOffice[] {
  const { id, locale = "el" } = options;
  const allTaxOffices = getAllTaxOffices({ locale });

  return allTaxOffices.filter((taxOffice) => taxOffice.relations.unitIds?.includes(id));
}

type GetTaxOfficesByMunicipalityIdOptions = {
  id: number;
} & TaxOfficeOptions;

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

type GetTaxOfficesByPostalCodeOptions = {
  postalCode: number;
} & TaxOfficeOptions;

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

type TaxOfficeOptionsByTerm = { searchTerm: string } & TaxOfficeOptions;

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

type CountriesOptions = {
  locale?: Locale;
};

/**
 * This function returns all the countries based on the provided options.
 *
 * @param {CountriesOptions} [options={}] - The options for the countries.
 * @param {string} [options.locale="el"] - The locale to use. Default is "el".
 *
 * @returns {Country[]} The countries that match the given options, or all countries if no options are provided.
 */
export function getCountries({ locale = "el" }: CountriesOptions = {}): Country[] {
  return allCountries[locale];
}

type SearchCountryByNameOptions = {
  locale?: Locale;
  searchTerm: string;
};

/**
 * This function searches for countries by name based on the provided options.
 *
 * @param {SearchCountryByNameOptions} options - The options for searching countries by name.
 * @param {string} [options.locale="el"] - The locale to use. Default is "el".
 * @param {string} options.searchTerm - The term to search for in country names.
 *
 * @returns {Country[] | null} The countries that match the search term, or null if no matches are found.
 */
export function searchCountryByName({ locale = "el", searchTerm }: SearchCountryByNameOptions): Country[] | null {
  const countries = getCountries({ locale });
  const normalizedSearchTerm = normalizeAndUppercaseGreekString(searchTerm);
  let countriesByName: Country[] = [];

  if (locale === "el") {
    countriesByName = countries.filter(({ name, completeName, officialName }) => {
      return (
        normalizeAndUppercaseGreekString(name).includes(normalizedSearchTerm) ||
        normalizeAndUppercaseGreekString(completeName).includes(normalizedSearchTerm) ||
        normalizeAndUppercaseGreekString(officialName).includes(normalizedSearchTerm)
      );
    });
  }

  if (locale === "en") {
    countriesByName = countries.filter(({ name, completeName, officialName }) => {
      return (
        name.toUpperCase().includes(searchTerm.toUpperCase()) ||
        completeName.toUpperCase().includes(searchTerm.toUpperCase()) ||
        officialName.toUpperCase().includes(searchTerm.toUpperCase())
      );
    });
  }

  return countriesByName?.length ? countriesByName : null;
}

type GetCountryOptions = {
  locale?: Locale;
  type: "id" | "iso31661-a2" | "iso31661-a3" | "tld";
  value: string;
};

export function getCountry({ locale = "el", type = "id", value = "" }: GetCountryOptions): Country | null {
  const countries = getCountries({ locale });

  switch (type) {
    case "id":
      return countries.find((country) => country.id === value) ?? null;
    case "iso31661-a2":
      return countries.find((country) => country.iso31661.A2 === value) ?? null;
    case "iso31661-a3":
      return countries.find((country) => country.iso31661.A3 === value) ?? null;
    case "tld":
      return countries.find((country) => country.tld === value) ?? null;
    default:
      return null;
  }
}
