import { validatePostalCode, validateAFM } from "../validationUtils";

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

describe("validateAFM", () => {
  it("returns false for invalid afms", () => {
    expect(validateAFM("12345678")).toBe(false);
    expect(validateAFM("xxxxxxxx")).toBe(false);
    expect(validateAFM("141212176")).toBe(false);
    expect(validateAFM("111111111")).toBe(false);
  });
  it("returns true for valid afms", () => {
    expect(validateAFM("011111111")).toBe(true);
    expect(validateAFM("150892297")).toBe(true);
    expect(validateAFM("126668921")).toBe(true);
    expect(validateAFM("234893562")).toBe(true);
    expect(validateAFM("126668921")).toBe(true);
  });

  it("works with int or string values", () => {
    expect(validateAFM(111111111)).toBe(false);
    expect(validateAFM(1111111111111)).toBe(false);
    expect(validateAFM(1.1)).toBe(false);
    expect(validateAFM(1.11111111)).toBe(false);
    expect(validateAFM("xxxxxxxx")).toBe(false);
    expect(validateAFM("141212176")).toBe(false);

    expect(validateAFM("150892297")).toBe(true);
    expect(validateAFM(150892297)).toBe(true);
    expect(validateAFM(126668921)).toBe(true);
    expect(validateAFM("126668921")).toBe(true);
    expect(validateAFM(234893562)).toBe(true);
    expect(validateAFM("234893562")).toBe(true);
  });
});
