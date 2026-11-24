import postalCodesJson from "./data/postal-codes.json";
import { type PostalCode } from "./types";

const postalCodesData = postalCodesJson as PostalCode[];

/**
 * Checks whether the postal code exists in the library's postal-code data.
 *
 * @param {string} postalCode - The postal code to validate.
 *
 * @returns {boolean} `true` if the postal code is present in the data, `false` otherwise.
 */
export function isValidPostalCode(postalCode: string): boolean {
  const validPostalCodes = postalCodesData.flatMap(({ postalCodes }) => [...postalCodes]);

  return validPostalCodes.includes(postalCode);
}

/**
 * Checks whether the postal code exists in the library's postal-code data.
 *
 * @param {string} postalCode - The postal code to validate.
 *
 * @returns {boolean} `true` if the postal code is present in the data, `false` otherwise.
 *
 * @deprecated Use {@link isValidPostalCode} instead. This function will be removed in a future version.
 */
export function validatePostalCode(postalCode: string): boolean {
  return isValidPostalCode(postalCode);
}
