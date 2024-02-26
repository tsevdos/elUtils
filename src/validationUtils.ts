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
  let sum = 0;
  for (let i = 9; i >= 0; i--) {
    const multiplier = (i % 2) + 1;
    let d = parseInt(strAmka.charAt(i)) * multiplier;
    if (d > 9) {
      d = parseInt(d.toString().charAt(0)) + parseInt(d.toString().charAt(1));
    }
    sum += d;
  }
  let checksum = 10 - (sum % 10);
  if (checksum > 9) {
    checksum = parseInt(checksum.toString().charAt(0)) + parseInt(checksum.toString().charAt(1));
  }

  return checksum === parseInt(strAmka.charAt(10));
}
