const GREEK_ACCENTED_CHARACTERS_REPLACEMENTS: { [key: string]: string } = {
  ά: "α",
  έ: "ε",
  ή: "η",
  ί: "ι",
  ό: "ο",
  ύ: "υ",
  ώ: "ω",
  Ά: "Α",
  Έ: "Ε",
  Ή: "Η",
  Ί: "Ι",
  Ό: "Ο",
  Ύ: "Υ",
  Ώ: "Ω",
  ϊ: "ι",
  ΐ: "ι",
  Ϊ: "Ι",
  ϋ: "υ",
  ΰ: "υ",
  Ϋ: "Υ",
};

/**
 * Removes accents, spaces, and special characters from the input string and converts it to uppercase.
 *
 * @param {string} input - The Greek text to be converted.
 *
 * @returns {string} - The normalized and uppercased string.
 */
export function convertsGreekTextToComparableUpperCase(input: string): string {
  const accentChars = /[άέήίόύώΆΈΉΊΌΎΏϊΐΪϋΰΫ]/g;
  const normalized = input
    .replace(accentChars, (match) => GREEK_ACCENTED_CHARACTERS_REPLACEMENTS[match] || match) // Replace accented characters
    .replace(/[ /\-_!@#$%^&*()]/g, ""); // Remove spaces and special characters

  return normalized.toUpperCase();
}

/**
 * Compares two Greek strings by normalizing them (removing accents, spaces, and special characters) and converting them to uppercase.
 *
 * @param {string} stringA - The first Greek string to compare.
 * @param {string} stringB - The second Greek string to compare.
 *
 * @returns {boolean} - `true` if the normalized strings are equal, `false` otherwise.
 */
export function compareGreekStrings(stringA: string, stringB: string): boolean {
  return convertsGreekTextToComparableUpperCase(stringA) === convertsGreekTextToComparableUpperCase(stringB);
}
