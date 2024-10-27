import postalCodes from "../data/postal-codes.json";

/**
 * Validates the given postal code.
 * @param {string} postalCode - The postal code to validate.
 * @returns {boolean} `true` if the postal code is valid, `false` otherwise.
 */
export function validatePostalCode(postalCode: string): boolean {
  const validPostalCodes = postalCodes.flatMap(({ postalCodes }) => [...postalCodes]);

  return validPostalCodes.includes(postalCode);
}

/**
 * Validates the given AMKA (Social Security Number in Greece).
 * @param {string | number} amka - The AMKA to validate.
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
 */
export function validateVATNumber(vatNumber: string | number): boolean {
  vatNumber = String(vatNumber);

  if (vatNumber.length != 9 || !/^\d+$/.test(vatNumber) || vatNumber === "0".repeat(9)) {
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
