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

// Removes accents,spaces and special chars from the string
export function convertsGreekTextToComparableUpperCase(input: string): string {
  const accentChars = /[άέήίόύώΆΈΉΊΌΎΏϊΐΪϋΰΫ]/g;
  const normalized = input
    .replace(accentChars, (match) => GREEK_ACCENTED_CHARACTERS_REPLACEMENTS[match] || match) // Replace accented characters
    .replace(/[ /\-_!@#$%^&*()]/g, ""); // Remove spaces and special characters

  return normalized.toUpperCase();
}

// Compare greek words
export function compareGreekStrings(stringA: string, stringB: string): boolean {
  return convertsGreekTextToComparableUpperCase(stringA) === convertsGreekTextToComparableUpperCase(stringB);
}
