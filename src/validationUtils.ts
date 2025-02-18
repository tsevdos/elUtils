import areaCodes from "../data/area-codes.json";
import postalCodes from "../data/postal-codes.json";

/**
 * Validates the given postal code.
 *
 * @param {string} postalCode - The postal code to validate.
 *
 * @returns {boolean} `true` if the postal code is valid, `false` otherwise.
 */
export function validatePostalCode(postalCode: string): boolean {
  const validPostalCodes = postalCodes.flatMap(({ postalCodes }) => [...postalCodes]);

  return validPostalCodes.includes(postalCode);
}

/**
 * Validates the given AMKA (Social Security Number in Greece).
 *
 * @param {string | number} amka - The AMKA to validate.
 *
 * @returns {boolean} `true` if the AMKA number is valid, `false` otherwise.
 */
export function validateAMKA(amka: string | number): boolean {
  const strAmka = amka.toString();

  // AMKA should be 11 digits long
  if (/^\d{11}$/.exec(strAmka) === null || strAmka == "00000000000") {
    return false;
  }

  // The first 6 digits is the date-of-birth in DDMMYY format
  const day = parseInt(strAmka.substring(0, 2));
  const month = parseInt(strAmka.substring(2, 4));
  const year = parseInt(strAmka.substring(4, 6));

  // Obvious checks
  if (day > 31) {
    return false;
  }

  if (month > 12) {
    return false;
  }

  const dateObj = new Date(Date.UTC(year, month - 1, day));

  // The code above can provide false positives
  // For example, JS will translate 30/02/2024 to 01/03/2024 :S
  // To prevent this, we make sure that the month of the Date object
  // is the same as the input month
  if (parseInt(("0" + (dateObj.getUTCMonth() + 1)).slice(-2)) !== month) {
    return false;
  }

  // The last digit is a check digit computed using the Luhn algorithm
  // (https://en.wikipedia.org/wiki/Luhn_algorithm):
  // Go through every digit of the AMKA number
  const sum = strAmka.split("").reduce((acc, value, index) => {
    // Multiply every other digit by 2
    let d = parseInt(value) * ((index % 2) + 1);

    // If it's a 2-digit number, sum its digits
    if (d > 9) {
      d = d - 9;
    }
    // Add the result to the sum
    return acc + d;
  }, 0);

  // The sum should be divisible by 10
  return sum % 10 === 0;
}

/**
 * Validates a VAT (Value Added Tax) number based on the following criteria:
 * - Must be exactly 9 digits long.
 * - Must consist of numeric characters only.
 * - Cannot be all zeros.
 * - The last digit (checksum) must satisfy a specific calculation based on the preceding digits.
 *
 * @param {string | number} vatNumber - The VAT number to validate, provided as a string or a number.
 * @returns {boolean} - Returns `true` if the VAT number is valid according to the specified rules; otherwise, `false`.
 *
 * Reference:{@link https://lytrax.io/blog/projects/greek-tin-validator-generator  Greek TIN Validator Generator}
 */
export function validateVATNumber(vatNumberInput: string | number): boolean {
  const vatNumber = String(vatNumberInput);

  if (vatNumber.length !== 9 || !/^\d+$/.test(vatNumber) || vatNumber === "0".repeat(9)) {
    return false;
  }

  const sum = vatNumber
    .substring(0, 8)
    .split("")
    .reduce((s, v, i) => s + (parseInt(v) << (8 - i)), 0);

  const calc = sum % 11;
  const d9 = parseInt(vatNumber[8]!);
  const valid = calc % 10 === d9;

  return valid;
}

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
  let mobilePhoneStr: string;
  const mobilePhoneRegex = RegExp(/^(\+30|0030)?69\d{8}$/);

  if (typeof mobilePhone === "number") {
    mobilePhoneStr = String(mobilePhone);
  } else {
    mobilePhoneStr = mobilePhone;
  }

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
  let landLinePhoneStr: string;
  const areaCodePattern = Object.values(areaCodes).join("|");

  if (typeof landLinePhone === "number") {
    landLinePhoneStr = String(landLinePhone);
  } else {
    landLinePhoneStr = landLinePhone;
  }

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
