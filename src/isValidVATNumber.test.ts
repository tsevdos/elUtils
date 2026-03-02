import { isValidVATNumber } from "./isValidVATNumber";

describe("isValidVATNumber", () => {
  it("returns false for invalid afms", () => {
    expect(isValidVATNumber("12345678")).toBe(false);
    expect(isValidVATNumber("xxxxxxxx")).toBe(false);
    expect(isValidVATNumber("141212176")).toBe(false);
    expect(isValidVATNumber("111111111")).toBe(false);
    expect(isValidVATNumber("311199349")).toBe(false);
    expect(isValidVATNumber("000000000")).toBe(false);
  });
  it("returns true for valid afms", () => {
    expect(isValidVATNumber("011111111")).toBe(true);
    expect(isValidVATNumber("150892297")).toBe(true);
    expect(isValidVATNumber("126668921")).toBe(true);
    expect(isValidVATNumber("234893562")).toBe(true);
    expect(isValidVATNumber("126668921")).toBe(true);
    expect(isValidVATNumber("565830300")).toBe(true);
  });

  it("should work with input older than year 1999", () => {
    expect(isValidVATNumber("050503557")).toBe(true);
    expect(isValidVATNumber("056203761")).toBe(false);
  });

  it("should work with legal entities, i.e. starting with 7-9", () => {
    expect(isValidVATNumber("737616950")).toBe(true);
    expect(isValidVATNumber("816267772")).toBe(true);
    expect(isValidVATNumber("985117351")).toBe(true);
  });

  it("should work with physical entities, i.e. starting with 1-4", () => {
    expect(isValidVATNumber("115410916")).toBe(true);
    expect(isValidVATNumber("234383562")).toBe(true);
    expect(isValidVATNumber("302054370")).toBe(true);
    expect(isValidVATNumber("479901058")).toBe(true);
  });

  it("should work with specific repeated digits tolerance", () => {
    expect(isValidVATNumber("267687344")).toBe(false);
    expect(isValidVATNumber("830777267")).toBe(false);
  });

  it("should not accept more than 9 digits", () => {
    expect(isValidVATNumber("23798790484567")).toBe(false);
    expect(isValidVATNumber("237987904860")).toBe(false);
    expect(isValidVATNumber("23798790489")).toBe(false);
    expect(isValidVATNumber("2379879048")).toBe(false);
  });

  it("should not accept less than 9 digits", () => {
    expect(isValidVATNumber("42496046")).toBe(false);
    expect(isValidVATNumber("4249604")).toBe(false);
    expect(isValidVATNumber("424960")).toBe(false);
    expect(isValidVATNumber("42496")).toBe(false);
    expect(isValidVATNumber("4249")).toBe(false);
    expect(isValidVATNumber("424")).toBe(false);
    expect(isValidVATNumber("42")).toBe(false);
    expect(isValidVATNumber("4")).toBe(false);
    expect(isValidVATNumber("")).toBe(false);
  });

  it("should accept only numerical characters", () => {
    expect(isValidVATNumber("2379w7904")).toBe(false);
    expect(isValidVATNumber("9K7755250")).toBe(false);
  });

  it("works with int or string values", () => {
    expect(isValidVATNumber(111111111)).toBe(false);
    expect(isValidVATNumber(1111111111111)).toBe(false);
    expect(isValidVATNumber(1.1)).toBe(false);
    expect(isValidVATNumber(1.11111111)).toBe(false);
    expect(isValidVATNumber("xxxxxxxx")).toBe(false);
    expect(isValidVATNumber("141212176")).toBe(false);

    expect(isValidVATNumber("150892297")).toBe(true);
    expect(isValidVATNumber(150892297)).toBe(true);
    expect(isValidVATNumber(126668921)).toBe(true);
    expect(isValidVATNumber("126668921")).toBe(true);
    expect(isValidVATNumber(234893562)).toBe(true);
    expect(isValidVATNumber("234893562")).toBe(true);
  });
});
