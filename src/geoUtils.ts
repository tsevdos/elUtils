import administrativeRegionsEl from "../data/administrative-regions-el.json";
import administrativeRegionsEn from "../data/administrative-regions-en.json";
import citiesEl from "../data/cities-el.json";
import citiesEn from "../data/cities-en.json";
import geographicRegionsEl from "../data/geographic-regions-el.json";
import geographicRegionsEn from "../data/geographic-regions-en.json";
import postalCodes from "../data/postal-codes.json";
import prefecturesEl from "../data/prefectures-el.json";
import prefecturesEn from "../data/prefectures-en.json";
import taxOfficesEl from "../data/taxOffices-el.json";
import taxOfficesEn from "../data/taxOffices-en.json";
import { convertsGreekTextToComparableUpperCase } from "./languageUtils";
import {
  City,
  GeographicRegion,
  Municipality,
  Prefecture,
  Region,
  RegionWithoutUnits,
  TaxOffice,
  Unit,
  UnitWithoutMunicipalities,
} from "./types";

export const MOUNT_ATHOS_REGION_ID = 14;
export const MOUNT_ATHOS_PREFECTURE_ID = 55;

const administrativeRegions = {
  el: administrativeRegionsEl,
  en: administrativeRegionsEn,
} as const;

const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
};

const cities = {
  el: citiesEl,
  en: citiesEn,
} as const;

const geographicRegions = {
  el: geographicRegionsEl,
  en: geographicRegionsEn,
} as const;

const allPrefectures = { el: prefecturesEl, en: prefecturesEn } as const;

const prefecturesWithoutMountAthos = {
  el: allPrefectures.el.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
  en: allPrefectures.en.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
};

const allTaxOffices = { el: taxOfficesEl, en: taxOfficesEn } as const;

type Locale = "el" | "en";

type AdministrativeRegionsOptions = {
  locale?: Locale;
  includeMountAthos?: boolean;
  level?: "region" | "unit" | "municipality";
};

/**
 * Returns the administrative regions based on the provided options.
 * @param {AdministrativeRegionsOptions} options - The options for locale, whether to include Mount Athos and the level area ("region" | "unit" | "municipality") to retrieve
 * @returns {Region[] | RegionWithoutUnits[]} The administrative regions in the specified locale and the level area to retrieve.
 */
export function getAdministrativeRegions({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeRegionsOptions = {}): Region[] | RegionWithoutUnits[] {
  const regionsData = includeMountAthos
    ? administrativeRegions[locale]
    : administrativeRegionsWithoutMountAthos[locale];

  if (level === "region") {
    return regionsData.flatMap(({ units: _unit, ...region }) => region);
  }

  if (level === "unit") {
    return regionsData.flatMap((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
    }));
  }

  return regionsData;
}

type AdministrativeRegionByIdOptions = { id: number } & AdministrativeRegionsOptions;

/**
 * Returns the administrative region with the provided ID.
 * @param {AdministrativeRegionByIdOptions} options - The options for ID, locale, whether to include Mount Athos and the level area ("region" | "unit" | "municipality") to retrieve
 * @returns {Region | RegionWithoutUnits | undefined} The administrative region with the specified ID, or `undefined` if no such region exists.
 */
export function getAdministrativeRegionById(
  options: AdministrativeRegionByIdOptions,
): Region | RegionWithoutUnits | undefined {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.id === id);
}

type AdministrativeRegionByIsoCodeOptions = { isocode: string } & AdministrativeRegionsOptions;

/**
 * Returns the administrative region with the provided ISO code.
 * @param {AdministrativeRegionByIsoCodeOptions} options - The options for ISO code, locale, whether to include Mount Athos and the level area ("region" | "unit" | "municipality") to retrieve
 * @returns {Region | RegionWithoutUnits | undefined} The administrative region with the specified ISO code, or `undefined` if no such region exists.
 */
export function getAdministrativeRegionByIsoCode(
  options: AdministrativeRegionByIsoCodeOptions,
): Region | RegionWithoutUnits | undefined {
  const { isocode, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.iso31662 === isocode);
}

type AdministrativeUnitsOptions = {
  locale?: Locale;
  includeMountAthos?: boolean;
  level?: "unit" | "municipality";
};

/**
 * Returns the administrative units based on the provided options.
 * @param {AdministrativeUnitsOptions} options - The options for locale, whether to include Mount Athos, and the level area ("unit" | "municipality") to retrieve
 * @returns {Unit[] | UnitWithoutMunicipalities[]} The administrative units in the specified locale and level.
 */
export function getAdministrativeUnits({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeUnitsOptions = {}): Unit[] | UnitWithoutMunicipalities[] {
  const administrativeUnits = (getAdministrativeRegions({ locale, includeMountAthos }) as Region[]).flatMap(
    ({ units }) => [...units],
  ) as Unit[];

  if (level === "unit") {
    return administrativeUnits.map(({ municipalities: _municipalities, ...unit }) => unit);
  }

  return administrativeUnits;
}

type AdministrativeUnitByIdOptions = { id: number } & AdministrativeUnitsOptions;

/**
 * Returns the administrative unit with the provided ID.
 * @param {AdministrativeUnitByIdOptions} options - The options for ID, locale, whether to include Mount Athos, and the level area ("unit" | "municipality") to retrieve
 * @returns {Unit | UnitWithoutMunicipalities | undefined} The administrative unit with the specified ID, or `undefined` if no such unit exists.
 */
export function getAdministrativeUnitById(
  options: AdministrativeUnitByIdOptions,
): Unit | UnitWithoutMunicipalities | undefined {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const unitsData = getAdministrativeUnits({ locale, includeMountAthos, level });

  return unitsData.find((unit) => unit.id === id);
}

type MunicipalitiesOptions = { locale?: Locale };

/**
 * Returns the municipalities in the provided locale.
 * @param {MunicipalitiesOptions} options - The options for locale.
 * @returns {Municipality[]} The municipalities in the specified locale.
 */
export function getMunicipalities({ locale = "el" }: MunicipalitiesOptions = {}): Municipality[] {
  const municipalities = (getAdministrativeUnits({ locale }) as Unit[]).flatMap(({ municipalities }) => [
    ...municipalities,
  ]);

  return municipalities;
}

type CitiesOptions = { locale?: Locale };

/**
 * Returns a list of cities based on the provided locale.
 *
 * @param {CitiesOptions} [options={}] - Options for fetching cities.
 * @param {string} [options.locale="el"] - The locale to use when retrieving cities. Defaults to "el".
 * @returns {City[]} - An array of cities for the specified locale.
 */
export function getCities({ locale = "el" }: CitiesOptions = {}): City[] {
  return cities[locale];
}

type CityByIdOptions = { id: number } & CitiesOptions;

/**
 * Returns a city by its ID based on the provided options.
 *
 * @param {CityByIdOptions} options - The options for fetching the city by ID.
 * @param {number} options.id - The ID of the city to retrieve.
 * @param {string} [options.locale="el"] - The locale to use when retrieving cities. Defaults to "el".
 * @returns {City|undefined} - The city with the specified ID, or `undefined` if not found.
 */
export function getCityById(options: CityByIdOptions): City | undefined {
  const { id, locale = "el" } = options;
  const citiesData = getCities({ locale });

  return citiesData.find((city) => city.id === id);
}

export type FindByCityRelationsOptions = {
  id: number;
  locale: Locale;
  entity: "region" | "unit" | "municipality" | "prefecture";
};

type CityRelations = Region | Unit | Municipality | Prefecture | undefined;

/**
 * Retrieves related administrative entities for a given city based on the provided options.
 *
 * @param {FindByCityRelationsOptions} options - The options for finding city relations.
 * @param {number} options.id - The ID of the city to retrieve relations for.
 * @param {string} [options.locale="el"] - The locale to use when retrieving related entities. Defaults to "el".
 * @param {("region"|"unit"|"municipality"|"prefecture")} options.entity - The type of related entity to retrieve.
 * @returns {Region|Unit|RegionWithoutUnits|Prefecture|undefined} - The related entity based on the specified type, or `undefined` if not found.
 */
export function getCityAdministrativeDivision(options: FindByCityRelationsOptions): CityRelations {
  const { id, locale = "el", entity } = options;
  const city = getCityById({ id, locale });

  // TODO: "municipality" is provided as default value but not handled in methods above
  // Relevant test case has been skipped, to be discussed
  const relationMapping = {
    region: {
      relationId: city?.relations.regionId,
      getFunction: (id: number) => getAdministrativeRegionById({ id, locale, level: "region" }) as Region,
    },
    unit: {
      relationId: city?.relations.unitId,
      getFunction: (id: number) => getAdministrativeUnitById({ id, locale, level: "unit" }) as Unit,
    },
    municipality: {
      relationId: city?.relations.municipalityId,
      getFunction: () => undefined,
    },
    prefecture: {
      relationId: city?.relations.prefectureId,
      getFunction: (id: number) => getPrefectureById({ id, locale }) as Prefecture,
    },
  };

  const relation = relationMapping[entity];
  return relation?.relationId ? relation.getFunction(relation.relationId) : undefined;
}

type GeographicRegionOptions = { locale?: Locale };

/**
 * Returns the geographic regions in the provided locale.
 * @param {GeographicRegionOptions} options - The options for locale.
 * @returns {GeographicRegion[]} The geographic regions in the specified locale.
 */
export function getGeographicRegions({ locale = "el" }: GeographicRegionOptions = {}): GeographicRegion[] {
  return geographicRegions[locale];
}

type GeographicRegionByIdOptions = { id: number } & GeographicRegionOptions;

/**
 * Returns the geographic region with the specific ID.
 * @param {GeographicRegionByIdOptions} options - The options for ID and locale.
 * @returns {GeographicRegion | undefined} The geographic region with the specified ID, or `undefined` if no such region exists.
 */
export function getGeographicRegionById(options: GeographicRegionByIdOptions): GeographicRegion | undefined {
  const { id, locale = "el" } = options;

  return geographicRegions[locale].find((region) => region.id === id);
}

type PrefecturesOptions = { locale?: Locale; includeMountAthos?: boolean };

/**
 * Returns the prefectures based on the provided options.
 * @param {PrefecturesOptions} options - The options for locale and whether to include Mount Athos.
 * @returns {Prefecture[]} The prefectures in the specified locale.
 */
export function getPrefectures({ locale = "el", includeMountAthos = false }: PrefecturesOptions = {}): Prefecture[] {
  const prefectures = includeMountAthos ? allPrefectures[locale] : prefecturesWithoutMountAthos[locale];

  return prefectures;
}

type PrefectureByIdOptions = { id: number } & PrefecturesOptions;

/**
 * Returns the prefecture with the provided ID.
 * @param {PrefectureByIdOptions} options - The options for ID, locale, and whether to include Mount Athos.
 * @returns {Prefecture | undefined} The prefecture with the specified ID, or `undefined` if no such prefecture exists.
 */
export function getPrefectureById(options: PrefectureByIdOptions): Prefecture | undefined {
  const { id, locale = "el", includeMountAthos = false } = options;
  const prefecturesData = getPrefectures({ locale, includeMountAthos });

  return prefecturesData.find((region) => region.id === id);
}

/**
 * Returns all postal codes.
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
 * @param {string} postalCode - The postal code to search for.
 * @param {FindByPostalCodeOptions} options - The options for locale and entity type.
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
 * @param {TaxOfficeOptions} [options={}] - An object that contains the locale option.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
 * @returns {TaxOffice[]} - An array of tax offices for the specified locale.
 */
export function getAllTaxOffices({ locale = "el" }: TaxOfficeOptions = {}): TaxOffice[] {
  return allTaxOffices[locale];
}

type GetTaxOfficeByIdOptions = { id: number } & TaxOfficeOptions;

/**
 * This function returns a tax office based on the provided id and locale.
 * @param {GetTaxOfficeByIdOptions} options - An object that contains the id and locale options.
 * @param {string} options.id - The id of the tax office to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax office is returned. Default is "el".
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
 * @param {GetTaxOfficesByRegionIdOptions} options - An object that contains the region id and locale options.
 * @param {string} options.id - The id of the region for which tax offices are to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
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
 * @param {GetTaxOfficesByUnitIdOptions} options - An object that contains the unit id and locale options.
 * @param {string} options.id - The id of the unit for which tax offices are to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
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
 * @param {GetTaxOfficesByMunicipalityIdOptions} options - An object that contains the municipality id and locale options.
 * @param {string} options.id - The id of the municipality for which tax offices are to be returned.
 * @param {string} [options.locale="el"] - The locale based on which the tax offices are returned. Default is "el".
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
  const normalizedTerm = convertsGreekTextToComparableUpperCase(searchTerm);

  return allTaxOffices[locale].filter(({ name }) =>
    convertsGreekTextToComparableUpperCase(name).includes(normalizedTerm),
  );
}
