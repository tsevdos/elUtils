import { isValidLandlinePhone, isValidMobilePhone, isValidPhone } from "../validationUtils";

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
