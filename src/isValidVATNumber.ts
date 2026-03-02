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
export function isValidVATNumber(vatNumberInput: string | number): boolean {
  const vatNumber = String(vatNumberInput);

  if (vatNumber.length !== 9 || !/^\d+$/.test(vatNumber) || vatNumber === "0".repeat(9)) {
    return false;
  }

  const sum = vatNumber
    .slice(0, 8)
    .split("")
    .reduce((s, v, i) => s + (Number.parseInt(v, 10) << (8 - i)), 0);

  const calc = sum % 11;
  const d9 = Number.parseInt(vatNumber.charAt(8), 10);
  const valid = calc % 10 === d9;

  return valid;
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
 * @deprecated Use {@link isValidVATNumber} instead. This function will be removed in a future version.
 */
export function validateVATNumber(vatNumberInput: string | number): boolean {
  return isValidVATNumber(vatNumberInput);
}
