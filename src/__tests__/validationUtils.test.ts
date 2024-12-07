import { validateAMKA, validatePostalCode, validateVATNumber } from "../validationUtils";

describe("validatePostalCode", () => {
  it("returns true on existing postal codes", () => {
    expect(validatePostalCode("17562")).toBe(true);
    expect(validatePostalCode("30005")).toBe(true);
    expect(validatePostalCode("17122")).toBe(true);
    expect(validatePostalCode("25008")).toBe(true);
    expect(validatePostalCode("68014")).toBe(true);
    expect(validatePostalCode("27066")).toBe(true);
    expect(validatePostalCode("54250")).toBe(true);
  });

  it("returns false on not existing postal codes", () => {
    expect(validatePostalCode("12345")).toBe(false);
    expect(validatePostalCode("11111")).toBe(false);
    expect(validatePostalCode("22222")).toBe(false);
    expect(validatePostalCode("99999")).toBe(false);
    expect(validatePostalCode("98765")).toBe(false);
    expect(validatePostalCode("56789")).toBe(false);
  });
});

describe("validateAMKA", () => {
  it("returns true on valid AMKA", () => {
    expect(validateAMKA("01012488886")).toBe(true);
    expect(validateAMKA("12121212125")).toBe(true);
    // Allow integer AMKA
    expect(validateAMKA(12121212125)).toBe(true);
  });

  it("returns false on invalid AMKA", () => {
    expect(validateAMKA("a0000000000")).toBe(false);
    expect(validateAMKA("00000000000")).toBe(false);
    // Incorrect length
    expect(validateAMKA("1234567890")).toBe(false);
    expect(validateAMKA("123456789012")).toBe(false);
    // Incorrect checksum
    expect(validateAMKA("12345678901")).toBe(false);
    expect(validateAMKA("42042042069")).toBe(false);
    // Correct checksum, but incorrect date
    // Obvious date errors
    expect(validateAMKA("24242424241")).toBe(false);
    expect(validateAMKA("53121212129")).toBe(false);
    // 31st on months that only have 30 days
    expect(validateAMKA("31062455551")).toBe(false);
    expect(validateAMKA("31092455554")).toBe(false);
    expect(validateAMKA("31112455551")).toBe(false);
    // 29th of February on non-leap years
    expect(validateAMKA("29022355553")).toBe(false);
    // 30th of February on non-leap years
    expect(validateAMKA("30022455551")).toBe(false);
  });
});

describe("validateVATNumber", () => {
  it("returns false for invalid afms", () => {
    expect(validateVATNumber("12345678")).toBe(false);
    expect(validateVATNumber("xxxxxxxx")).toBe(false);
    expect(validateVATNumber("141212176")).toBe(false);
    expect(validateVATNumber("111111111")).toBe(false);
    expect(validateVATNumber("311199349")).toBe(false);
    expect(validateVATNumber("000000000")).toBe(false);
  });
  it("returns true for valid afms", () => {
    expect(validateVATNumber("011111111")).toBe(true);
    expect(validateVATNumber("150892297")).toBe(true);
    expect(validateVATNumber("126668921")).toBe(true);
    expect(validateVATNumber("234893562")).toBe(true);
    expect(validateVATNumber("126668921")).toBe(true);
    expect(validateVATNumber("565830300")).toBe(true);
  });

  it("should work with input older than year 1999", () => {
    expect(validateVATNumber("050503557")).toBe(true);
    expect(validateVATNumber("056203761")).toBe(false);
  });

  it("should work with legal entities, i.e. starting with 7-9", () => {
    expect(validateVATNumber("737616950")).toBe(true);
    expect(validateVATNumber("816267772")).toBe(true);
    expect(validateVATNumber("985117351")).toBe(true);
  });

  it("should work with physical entities, i.e. starting with 1-4", () => {
    expect(validateVATNumber("115410916")).toBe(true);
    expect(validateVATNumber("234383562")).toBe(true);
    expect(validateVATNumber("302054370")).toBe(true);
    expect(validateVATNumber("479901058")).toBe(true);
  });

  it("should work with specific repeated digits tolerance", () => {
    expect(validateVATNumber("267687344")).toBe(false);
    expect(validateVATNumber("830777267")).toBe(false);
  });

  it("should not accept more than 9 digits", () => {
    expect(validateVATNumber("23798790484567")).toBe(false);
    expect(validateVATNumber("237987904860")).toBe(false);
    expect(validateVATNumber("23798790489")).toBe(false);
    expect(validateVATNumber("2379879048")).toBe(false);
  });

  it("should not accept less than 9 digits", () => {
    expect(validateVATNumber("42496046")).toBe(false);
    expect(validateVATNumber("4249604")).toBe(false);
    expect(validateVATNumber("424960")).toBe(false);
    expect(validateVATNumber("42496")).toBe(false);
    expect(validateVATNumber("4249")).toBe(false);
    expect(validateVATNumber("424")).toBe(false);
    expect(validateVATNumber("42")).toBe(false);
    expect(validateVATNumber("4")).toBe(false);
    expect(validateVATNumber("")).toBe(false);
  });

  it("should accept only numerical characters", () => {
    expect(validateVATNumber("2379w7904")).toBe(false);
    expect(validateVATNumber("9K7755250")).toBe(false);
  });

  it("works with int or string values", () => {
    expect(validateVATNumber(111111111)).toBe(false);
    expect(validateVATNumber(1111111111111)).toBe(false);
    expect(validateVATNumber(1.1)).toBe(false);
    expect(validateVATNumber(1.11111111)).toBe(false);
    expect(validateVATNumber("xxxxxxxx")).toBe(false);
    expect(validateVATNumber("141212176")).toBe(false);

    expect(validateVATNumber("150892297")).toBe(true);
    expect(validateVATNumber(150892297)).toBe(true);
    expect(validateVATNumber(126668921)).toBe(true);
    expect(validateVATNumber("126668921")).toBe(true);
    expect(validateVATNumber(234893562)).toBe(true);
    expect(validateVATNumber("234893562")).toBe(true);
  });
});
