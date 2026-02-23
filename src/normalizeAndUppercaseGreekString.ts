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
export function normalizeAndUppercaseGreekString(input: string): string {
  const accentChars = /[άέήίόύώΆΈΉΊΌΎΏϊΐΪϋΰΫ]/g;
  const normalized = input
    .replaceAll(accentChars, (match) => GREEK_ACCENTED_CHARACTERS_REPLACEMENTS[match] || match) // Replace accented characters
    .replaceAll(/[ /\-_!@#$%^&*()]/g, ""); // Remove spaces and special characters

  return normalized.toUpperCase();
}

/**
 * Removes accents, spaces, and special characters from the input string and converts it to uppercase.
 *
 * @param {string} input - The Greek text to be converted.
 *
 * @returns {string} - The normalized and uppercased string.
 *
 * @deprecated Use {@link normalizeAndUppercaseGreekString} instead. This function will be removed in a future version.
 */
export function convertsGreekTextToComparableUpperCase(input: string): string {
  return normalizeAndUppercaseGreekString(input);
}
