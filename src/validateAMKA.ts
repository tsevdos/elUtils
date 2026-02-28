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
  const day = Number.parseInt(strAmka.slice(0, 2), 10);
  const month = Number.parseInt(strAmka.slice(2, 4), 10);
  const year = Number.parseInt(strAmka.slice(4, 6), 10);

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
  if (Number.parseInt(`0${dateObj.getUTCMonth() + 1}`.slice(-2), 10) !== month) {
    return false;
  }

  // The last digit is a check digit computed using the Luhn algorithm
  // (https://en.wikipedia.org/wiki/Luhn_algorithm):
  // Go through every digit of the AMKA number
  const sum = strAmka.split("").reduce((acc, value, index) => {
    // Multiply every other digit by 2
    let d = Number.parseInt(value, 10) * ((index % 2) + 1);

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
