import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";

/**
 * Compares two Greek strings after removing Greek accents, spaces, and selected punctuation,
 * then converting them to uppercase.
 * The removed punctuation includes `/`, `-`, `_`, `!`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, `(`, and `)`.
 *
 * @param {string} stringA - The first Greek string to compare.
 * @param {string} stringB - The second Greek string to compare.
 *
 * @returns {boolean} - `true` if the normalized strings are equal, `false` otherwise.
 */
export function compareGreekStrings(stringA: string, stringB: string): boolean {
  return normalizeAndUppercaseGreekString(stringA) === normalizeAndUppercaseGreekString(stringB);
}
