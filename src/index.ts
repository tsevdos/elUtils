// Geo utilities
export { getAdministrativeRegions } from "./getAdministrativeRegions";
export {
  getAdministrativeRegionById,
  getAdministrativeRegionByIsoCode,
  getAdministrativeUnits,
  getAdministrativeUnitById,
  getMunicipalities,
  getCities,
  searchCityByName,
  getCityById,
  getCityAdministrativeDivision,
  getGeographicRegions,
  getGeographicRegionById,
  getPrefectures,
  getPrefectureById,
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
export { formatWeight } from "./formatWeight";
export { formatNumber } from "./formatUtils";
// Language utilities
export {
  normalizeAndUppercaseGreekString,
  convertsGreekTextToComparableUpperCase, // @deprecated Use {@link normalizeAndUppercaseGreekString} instead. This function will be removed in a future version.
} from "./normalizeAndUppercaseGreekString";
export { compareGreekStrings } from "./compareGreekStrings";
