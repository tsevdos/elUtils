import postalCodes from "../data/postal-codes.json";

export function validatePostalCode(postalCode: string): boolean {
  const validPostalCodes = postalCodes.flatMap(({ postalCodes }) => [...postalCodes]);

  return validPostalCodes.includes(postalCode);
}

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
  if (parseInt(("0" + (dateObj.getUTCMonth() + 1)).slice(-2)) != month) {
    return false;
  }

  // The last digit is a check digit computed using the Luhn algorithm
  // (https://en.wikipedia.org/wiki/Luhn_algorithm)
  const sum = strAmka.split('').reduce((a, c, i) => {
    let d = parseInt(c) * ((i % 2) + 1)
    if (d > 9) {
      d = d - 9
    }
    return a + d
  }, 0)

  return sum % 10 === 0
}
