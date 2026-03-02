import areaCodes from "../data/area-codes.json";

/**
 * Regex used to remove any special characters when filling in a phone number
 */
const PHONE_SANITIZE_REGEX = /[\s\-().]/g;

/**
 * Validates if a given phone number is a Greek mobile phone number.
 *
 * @param {string | number} mobilePhone - The mobile phone number to validate.
 * It may include special characters like spaces, dashes, parentheses, or dots, which will be ignored during validation.
 *
 * @returns {boolean} - Returns `true` if the phone number is a valid Greek mobile number; otherwise, `false`.
 */
export function isValidMobilePhone(mobilePhone: string | number): boolean {
  const mobilePhoneStr = typeof mobilePhone === "number" ? String(mobilePhone) : mobilePhone;
  const mobilePhoneRegex = /^(\+30|0030)?69\d{8}$/;

  const mobilePhoneSanitized = mobilePhoneStr.replace(PHONE_SANITIZE_REGEX, "");

  return mobilePhoneRegex.test(mobilePhoneSanitized);
}

/**
 * Validates if a given phone number is a Greek landline number.
 *
 * @param {string | number} landLinePhone - The landline phone number to validate.
 * It may include special characters like spaces, dashes, parentheses, or dots, which will be ignored during validation.
 *
 * @param {boolean} [withPrefix=true] - Indicates whether the phone number should include the country prefix (`+30` or `0030`).
 *    - If `true`, the number must start with `+30` or `0030` (optional in the regex).
 *    - If `false`, the validation checks only for a valid area code and 7 digits.
 *
 * @returns {boolean} - Returns `true` if the phone number is a valid Greek landline number; otherwise, `false`.
 */
export function isValidLandlinePhone(landLinePhone: string | number, withPrefix: boolean = true): boolean {
  const landLinePhoneStr = typeof landLinePhone === "number" ? String(landLinePhone) : landLinePhone;
  const areaCodePattern = Object.values(areaCodes).join("|");

  const prefix = withPrefix ? "(\\+30|0030)?" : "";
  const landLinePhoneRegex = RegExp(`^${prefix}(${areaCodePattern})\\d{7}$`);
  const landlinePhoneSanitized = landLinePhoneStr.replace(PHONE_SANITIZE_REGEX, "");

  return landLinePhoneRegex.test(landlinePhoneSanitized);
}

/**
 * Validates if a given phone number is either a Greek mobile or landline number.
 *
 * @param {string} phone - The phone number to validate.
 * It may include special characters like spaces, dashes, parentheses, or dots, which will be ignored during validation.
 *
 * @returns {boolean} - Returns `true` if the phone number is a valid Greek mobile or landline number; otherwise, `false`.
 */
export function isValidPhone(phone: string | number): boolean {
  return isValidMobilePhone(phone) || isValidLandlinePhone(phone);
}
