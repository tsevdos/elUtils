import postalCodes from "./data/postal-codes.json";

/**
 * Returns all postal codes.
 *
 * @returns {string[]} An array of all postal codes.
 */
export function getAllPostalCodes(): string[] {
  return postalCodes.flatMap(({ postalCodes }) => postalCodes);
}
