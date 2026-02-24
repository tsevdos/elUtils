export {
  getAdministrativeRegions,
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
  validatePostalCode,
  validateAMKA,
  validateVATNumber,
  isValidMobilePhone,
  isValidLandlinePhone,
  isValidPhone,
} from "./validationUtils";
// Format utilities
export { formatWeight } from "./formatWeight";
// Language utilities
export {
  normalizeAndUppercaseGreekString,
  convertsGreekTextToComparableUpperCase, // @deprecated Use {@link normalizeAndUppercaseGreekString} instead. This function will be removed in a future version.
} from "./normalizeAndUppercaseGreekString";
export { compareGreekStrings } from "./compareGreekStrings";
