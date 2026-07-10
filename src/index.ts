// Geo utilities
export { getAdministrativeRegions } from "./getAdministrativeRegions";
export { getAdministrativeRegionById } from "./getAdministrativeRegionById";
export { getAdministrativeRegionByIsoCode } from "./getAdministrativeRegionByIsoCode";
export { getAdministrativeUnits } from "./getAdministrativeUnits";
export { getAdministrativeUnitById } from "./getAdministrativeUnitById";
export { getMunicipalities } from "./getMunicipalities";
export { getCities } from "./getCities";
export { getCityById } from "./getCityById";
export { searchCityByName } from "./searchCityByName";
export { getCityAdministrativeDivision } from "./getCityAdministrativeDivision";
export { getPrefectures } from "./getPrefectures";
export { getPrefectureById } from "./getPrefectureById";
export { getGeographicRegions } from "./getGeographicRegions";
export { getGeographicRegionById } from "./getGeographicRegionById";
export {
  getAllPostalCodes,
  findByPostalCode,
  getAllTaxOffices,
  getTaxOfficeById,
  getTaxOfficesByRegionId,
  getTaxOfficesByUnitId,
  getTaxOfficesByMunicipalityId,
  getTaxOfficesByPostalCode,
  searchTaxOffice,
  getCountries,
  searchCountryByName,
  getCountry,
} from "./geoUtils";
// Date utilities
export { getDays } from "./getDays";
export { getMonths } from "./getMonths";
export { getQuarters } from "./getQuarters";
export { getEras } from "./getEras";
export { getHolidays } from "./getHolidays";
// Validation utilities
export {
  isValidPostalCode,
  validatePostalCode, // @deprecated Use {@link isValidPostalCode} instead. This function will be removed in a future version.
} from "./isValidPostalCode";
export {
  isValidAMKA,
  validateAMKA, // @deprecated Use {@link isValidAMKA} instead. This function will be removed in a future version.
} from "./isValidAMKA";
export {
  isValidVATNumber,
  validateVATNumber, // @deprecated Use {@link isValidVATNumber} instead. This function will be removed in a future version.
} from "./isValidVATNumber";
export { isValidMobilePhone } from "./isValidMobilePhone";
export { isValidLandlinePhone } from "./isValidLandlinePhone";
export { isValidPhone } from "./isValidPhone";
// Format utilities
export { formatNumber } from "./formatNumber";
export { formatWeight } from "./formatWeight";
// Language utilities
export {
  normalizeAndUppercaseGreekString,
  convertsGreekTextToComparableUpperCase, // @deprecated Use {@link normalizeAndUppercaseGreekString} instead. This function will be removed in a future version.
} from "./normalizeAndUppercaseGreekString";
export { compareGreekStrings } from "./compareGreekStrings";
