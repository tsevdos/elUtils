export const areaCodes = {
  Athens: "210",
  Thessaloniki: "231",
  Patras: "261",
  Heraklion: "281",
  Larissa: "241",
  Rhodes: "224",
  Chania: "282",
  Volos: "242",
  Corfu: "266",
  Ioannina: "265",
} as const;

// Regex used to remove any special characters when filling in a phone number
const PHONE_SANITIZE_REGEX = /[\s\-().]/g;

// Precompute area code pattern to avoid repeated allocations
const AREA_CODE_PATTERN = Object.values(areaCodes).join("|");

// Precompiled regex for landline validation with prefix (optional)
const LANDLINE_REGEX_WITH_PREFIX = new RegExp(String.raw`^(\+30|0030)?(${AREA_CODE_PATTERN})\d{7}$`);

// Precompiled regex for landline validation without prefix
const LANDLINE_REGEX_WITHOUT_PREFIX = new RegExp(String.raw`^(${AREA_CODE_PATTERN})\d{7}$`);

/**
 * Validates if a given phone number is a Greek landline number.
 *
 * @param {string | number} landLinePhone - The landline phone number to validate.
 * It may include special characters like spaces, dashes, parentheses, or dots, which will be ignored during validation.
 *
 * @param {boolean} [withPrefix=true] - Whether to require the country prefix (`+30` or `0030`).
 * When `true` (default), the prefix is optional. When `false`, validates without checking for a prefix.
 *
 * @returns {boolean} Returns `true` if the phone number is a valid Greek landline number; otherwise, `false`.
 *
 * @example
 * isValidLandlinePhone("2101234567"); // true
 * isValidLandlinePhone("+302101234567"); // true
 * isValidLandlinePhone("210 123 4567"); // true
 * isValidLandlinePhone("2101234567", false); // true
 * isValidLandlinePhone("6912345678"); // false (mobile number)
 */
export function isValidLandlinePhone(landLinePhone: string | number, withPrefix: boolean = true): boolean {
  const landLinePhoneStr = typeof landLinePhone === "number" ? String(landLinePhone) : landLinePhone;
  const landlinePhoneSanitized = landLinePhoneStr.replaceAll(PHONE_SANITIZE_REGEX, "");
  const landLinePhoneRegex = withPrefix ? LANDLINE_REGEX_WITH_PREFIX : LANDLINE_REGEX_WITHOUT_PREFIX;

  return landLinePhoneRegex.test(landlinePhoneSanitized);
}
