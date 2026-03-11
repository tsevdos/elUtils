import { isValidLandlinePhone } from "./isValidLandlinePhone";
import { isValidMobilePhone } from "./isValidMobilePhone";

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
