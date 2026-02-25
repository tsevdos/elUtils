import {
  isValidLandlinePhone,
  isValidMobilePhone,
  isValidPhone,
  validateAMKA,
  validateVATNumber,
} from "../validationUtils";

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

  it("returns false on empty or invalid string inputs", () => {
    expect(validateAMKA("")).toBe(false);
    expect(validateAMKA("abc")).toBe(false);
    expect(validateAMKA("12345abc890")).toBe(false);
  });

  it("returns false on AMKA with valid length but all same digits", () => {
    expect(validateAMKA("11111111111")).toBe(false);
    expect(validateAMKA("22222222222")).toBe(false);
  });

  // TODO: re-evaluate edge case dates
  it.skip("handles edge case dates correctly", () => {
    // Valid leap year February 29th
    expect(validateAMKA("29022412121")).toBe(true);
    // Invalid non-leap year February 29th
    expect(validateAMKA("29022355553")).toBe(false);
  });

  it("validates correct month ranges", () => {
    // Month 00 is invalid
    expect(validateAMKA("01002488885")).toBe(false);
    // Month 13 is invalid
    expect(validateAMKA("01132488880")).toBe(false);
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

describe("isValidMobilePhone", () => {
  it("should return true for valid Greek mobile numbers", () => {
    expect(isValidMobilePhone("+306991234567")).toBe(true);
    expect(isValidMobilePhone("00306991234567")).toBe(true);
    expect(isValidMobilePhone("6991234567")).toBe(true);
    expect(isValidMobilePhone(6991234567)).toBe(true);
    expect(isValidMobilePhone("69-9123 4567")).toBe(true);
    expect(isValidMobilePhone("69(912)34567")).toBe(true);
  });

  it("should return false for invalid Greek mobile numbers", () => {
    expect(isValidMobilePhone("+30691234567")).toBe(false);
    expect(isValidMobilePhone("003069812345679")).toBe(false);
    expect(isValidMobilePhone("0030698123456")).toBe(false);
    expect(isValidMobilePhone("6891234567")).toBe(false);
    expect(isValidMobilePhone(6891234567)).toBe(false);
    expect(isValidMobilePhone("1234567890")).toBe(false);
    expect(isValidMobilePhone(1234567890)).toBe(false);
    expect(isValidMobilePhone("69 9123456")).toBe(false);
    expect(isValidMobilePhone("69-91234-56789")).toBe(false);
  });
});

describe("isValidLandlinePhone", () => {
  it("should return true for valid landline numbers with country code", () => {
    expect(isValidLandlinePhone("+302107654321")).toBe(true);
    expect(isValidLandlinePhone("00302107654321")).toBe(true);
    expect(isValidLandlinePhone("+302104567890")).toBe(true);
    expect(isValidLandlinePhone("00302104567890")).toBe(true);
  });

  it("should return true for valid landline numbers without country code", () => {
    expect(isValidLandlinePhone("2107654321", false)).toBe(true);
    expect(isValidLandlinePhone(2107654321, false)).toBe(true);
    expect(isValidLandlinePhone("210-765-4321", false)).toBe(true);
    expect(isValidLandlinePhone("210 765 4321", false)).toBe(true);
    expect(isValidLandlinePhone("210.765.4321", false)).toBe(true);
  });

  it("should return false for invalid landline numbers with country code", () => {
    expect(isValidLandlinePhone("+30210765432")).toBe(false);
    expect(isValidLandlinePhone("003022107654321")).toBe(false);
    expect(isValidLandlinePhone("+303012345678")).toBe(false);
    expect(isValidLandlinePhone("003021123456789")).toBe(false);
    expect(isValidLandlinePhone("+3030123456789")).toBe(false);
  });

  it("should return false for invalid landline numbers without country code", () => {
    expect(isValidLandlinePhone("210765432", false)).toBe(false);
    expect(isValidLandlinePhone(210765432, false)).toBe(false);
    expect(isValidLandlinePhone("3007654321", false)).toBe(false);
    expect(isValidLandlinePhone("210-765-432", false)).toBe(false);
    expect(isValidLandlinePhone("210765432123", false)).toBe(false);
    expect(isValidLandlinePhone(210765432123, false)).toBe(false);
  });

  it("should return false for landline numbers with non-numeric characters", () => {
    expect(isValidLandlinePhone("210-ABC-4321", false)).toBe(false);
    expect(isValidLandlinePhone("+30-210-765-ABCD", true)).toBe(false);
    expect(isValidLandlinePhone("210!765*4321", false)).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("should return true for valid mobile phone numbers", () => {
    expect(isValidPhone("+306991234567")).toBe(true);
    expect(isValidPhone("00306999123456")).toBe(true);
    expect(isValidPhone("6991234567")).toBe(true);
    expect(isValidPhone(6991234567)).toBe(true);
    expect(isValidPhone("69-9123 4567")).toBe(true);
    expect(isValidPhone("69(912)34567")).toBe(true);
  });

  it("should return true for valid landline phone numbers", () => {
    expect(isValidPhone("+302107654321")).toBe(true);
    expect(isValidPhone("00302107654321")).toBe(true);
    expect(isValidPhone("2107654321")).toBe(true);
    expect(isValidPhone(2107654321)).toBe(true);
    expect(isValidPhone("210-765-4321")).toBe(true);
    expect(isValidPhone("210 765 4321")).toBe(true);
  });

  it("should return false for invalid mobile phone numbers", () => {
    expect(isValidPhone("+30691234567")).toBe(false);
    expect(isValidPhone("003069812345679")).toBe(false);
    expect(isValidPhone("6891234567")).toBe(false);
    expect(isValidPhone(6891234567)).toBe(false);
    expect(isValidPhone("1234567890")).toBe(false);
    expect(isValidPhone(1234567890)).toBe(false);
    expect(isValidPhone("69 9123456")).toBe(false);
    expect(isValidPhone("69-91234-56789")).toBe(false);
  });

  it("should return false for invalid landline phone numbers", () => {
    expect(isValidPhone("+30210765432")).toBe(false);
    expect(isValidPhone("003022107654321")).toBe(false);
    expect(isValidPhone("+303012345678")).toBe(false);
    expect(isValidPhone("003021123456789")).toBe(false);
    expect(isValidPhone("210765432123")).toBe(false);
    expect(isValidPhone(210765432123)).toBe(false);
  });

  it("should return false for phone numbers with non-numeric characters", () => {
    expect(isValidPhone("210-ABC-4321")).toBe(false);
    expect(isValidPhone("+30-210-765-ABCD")).toBe(false);
    expect(isValidPhone("210!765*4321")).toBe(false);
    expect(isValidPhone("+30-699-ABC-5678")).toBe(false);
  });

  it("should return false for invalid numbers that are neither mobile nor landline", () => {
    expect(isValidPhone("1234567890")).toBe(false);
    expect(isValidPhone(1234567890)).toBe(false);
    expect(isValidPhone("9876543210")).toBe(false);
    expect(isValidPhone(9876543210)).toBe(false);
    expect(isValidPhone("3000000000")).toBe(false);
    expect(isValidPhone(3000000000)).toBe(false);
  });
});
