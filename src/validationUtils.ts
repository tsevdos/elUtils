import postalCodes from "../data/postal-codes.json";

export function validatePostalCode(postalCode: string): boolean {
  const validPostalCodes = postalCodes.flatMap(({ postalCodes }) => [...postalCodes]);
  return validPostalCodes.includes(postalCode);
}

export function validateAFM(afm: string | string): boolean {
  const strAfm = afm.toString();
  if (!strAfm.match(/^\d{9}$/) || strAfm == "000000000") {
    return false;
  }

  const last = parseInt(strAfm.charAt(8));
  let sum = 0,
    power = 1;
  for (let i = 7; i >= 0; i--) {
    power *= 2;
    sum += parseInt(strAfm.charAt(i)) * power;
  }
  return sum % 11 === last;
}
