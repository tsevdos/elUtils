import areaCodes from "../data/area-codes.json";

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
  const day = Number.parseInt(strAmka.slice(0, 2));
  const month = Number.parseInt(strAmka.slice(2, 4));
  const year = Number.parseInt(strAmka.slice(4, 6));

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
  if (Number.parseInt(("0" + (dateObj.getUTCMonth() + 1)).slice(-2)) !== month) {
    return false;
  }

  // The last digit is a check digit computed using the Luhn algorithm
  // (https://en.wikipedia.org/wiki/Luhn_algorithm):
  // Go through every digit of the AMKA number
  const sum = strAmka.split("").reduce((acc, value, index) => {
    // Multiply every other digit by 2
    let d = Number.parseInt(value) * ((index % 2) + 1);

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
    .slice(0, 8)
    .split("")
    .reduce((s, v, i) => s + (Number.parseInt(v) << (8 - i)), 0);

  const calc = sum % 11;
  const d9 = Number.parseInt(vatNumber[8]!);
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
