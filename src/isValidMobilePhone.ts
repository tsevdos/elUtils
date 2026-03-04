// Regex used to remove any special characters when filling in a phone number
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
  const mobilePhoneSanitized = mobilePhoneStr.replaceAll(PHONE_SANITIZE_REGEX, "");

  return mobilePhoneRegex.test(mobilePhoneSanitized);
}
