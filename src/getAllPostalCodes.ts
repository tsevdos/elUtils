import postalCodes from "./data/postal-codes.json";

/**
 * Returns all postal codes.
 *
 * @returns {readonly string[]} An immutable array of all postal codes.
 */
export function getAllPostalCodes(): readonly string[] {
  return Object.freeze(postalCodes.flatMap(({ postalCodes }) => postalCodes));
}
