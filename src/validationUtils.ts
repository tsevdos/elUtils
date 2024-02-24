import postalCodes from "../data/postal-codes.json";

export function validatePostalCode(postalCode: string): boolean {
  const validPostalCodes = postalCodes.flatMap(({ postalCodes }) => [...postalCodes]);

  return validPostalCodes.includes(postalCode);
}

export function validateAMKA(amka: string | number): boolean {
  // AMKA should be 11 digits long
  const strAmka = amka.toString();
  const regex = RegExp("^\\d{11}$");
  if (regex.exec(strAmka) === null || strAmka == "00000000000") {
    return false;
  }
  // The first 6 digits is the date-of-birth in DDMMYY format
  if (parseInt(strAmka.substring(0, 2)) > 31) {
    return false;
  }
  if (parseInt(strAmka.substring(2, 4)) > 12) {
    return false;
  }

  // The last digit is a check digit cimputed using the Luhn algorithm
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

  return checksum == parseInt(strAmka.charAt(10));
}
