import { isValidVATNumber } from "./isValidVATNumber";

describe("isValidVATNumber", () => {
  describe("invalid VAT numbers", () => {
    it("returns false for invalid checksums", () => {
      expect(isValidVATNumber("12345678")).toBe(false);
      expect(isValidVATNumber("141212176")).toBe(false);
      expect(isValidVATNumber("311199349")).toBe(false);
      expect(isValidVATNumber("267687344")).toBe(false);
      expect(isValidVATNumber("830777267")).toBe(false);
    });

    it("returns false for all zeros", () => {
      expect(isValidVATNumber("000000000")).toBe(false);
    });

    it("returns false for all same digits", () => {
      expect(isValidVATNumber("111111111")).toBe(false);
    });

    it("returns false for non-numeric characters", () => {
      expect(isValidVATNumber("xxxxxxxx")).toBe(false);
      expect(isValidVATNumber("2379w7904")).toBe(false);
      expect(isValidVATNumber("9K7755250")).toBe(false);
    });

    it("returns false for more than 9 digits", () => {
      expect(isValidVATNumber("23798790484567")).toBe(false);
      expect(isValidVATNumber("237987904860")).toBe(false);
      expect(isValidVATNumber("23798790489")).toBe(false);
      expect(isValidVATNumber("2379879048")).toBe(false);
    });

    it("returns false for less than 9 digits", () => {
      expect(isValidVATNumber("42496046")).toBe(false);
      expect(isValidVATNumber("4249604")).toBe(false);
      expect(isValidVATNumber("424960")).toBe(false);
      expect(isValidVATNumber("42496")).toBe(false);
      expect(isValidVATNumber("4249")).toBe(false);
      expect(isValidVATNumber("424")).toBe(false);
      expect(isValidVATNumber("42")).toBe(false);
      expect(isValidVATNumber("4")).toBe(false);
    });

    it("returns false for empty string", () => {
      expect(isValidVATNumber("")).toBe(false);
    });

    it("returns false for VAT numbers with spaces", () => {
      expect(isValidVATNumber("150 892 297")).toBe(false);
      expect(isValidVATNumber(" 150892297")).toBe(false);
      expect(isValidVATNumber("150892297 ")).toBe(false);
      expect(isValidVATNumber("150 892 297")).toBe(false);
    });

    it("returns false for VAT numbers with special characters", () => {
      expect(isValidVATNumber("150-892-297")).toBe(false);
      expect(isValidVATNumber("150.892.297")).toBe(false);
      expect(isValidVATNumber("150/892/297")).toBe(false);
    });

    it("returns false for floating point numbers", () => {
      expect(isValidVATNumber(1.1)).toBe(false);
      expect(isValidVATNumber(1.11111111)).toBe(false);
      expect(isValidVATNumber(150892297.5)).toBe(false);
    });

    it("returns false for numbers with too many digits", () => {
      expect(isValidVATNumber(1111111111111)).toBe(false);
    });
  });

  describe("valid VAT numbers", () => {
    it("validates general valid VAT numbers", () => {
      expect(isValidVATNumber("011111111")).toBe(true);
      expect(isValidVATNumber("150892297")).toBe(true);
      expect(isValidVATNumber("126668921")).toBe(true);
      expect(isValidVATNumber("234893562")).toBe(true);
      expect(isValidVATNumber("565830300")).toBe(true);
    });

    it("validates VAT numbers issued before 1999", () => {
      expect(isValidVATNumber("050503557")).toBe(true);
      expect(isValidVATNumber("056203761")).toBe(false);
    });

    it("validates legal entity VAT numbers (starting with 7-9)", () => {
      expect(isValidVATNumber("737616950")).toBe(true);
      expect(isValidVATNumber("816267772")).toBe(true);
      expect(isValidVATNumber("985117351")).toBe(true);
    });

    it("validates physical entity VAT numbers (starting with 1-4)", () => {
      expect(isValidVATNumber("115410916")).toBe(true);
      expect(isValidVATNumber("234383562")).toBe(true);
      expect(isValidVATNumber("302054370")).toBe(true);
      expect(isValidVATNumber("479901058")).toBe(true);
    });
  });

  describe("input type handling", () => {
    it("accepts both string and number inputs for valid VAT numbers", () => {
      expect(isValidVATNumber("150892297")).toBe(true);
      expect(isValidVATNumber(150892297)).toBe(true);
      expect(isValidVATNumber("126668921")).toBe(true);
      expect(isValidVATNumber(126668921)).toBe(true);
      expect(isValidVATNumber("234893562")).toBe(true);
      expect(isValidVATNumber(234893562)).toBe(true);
    });

    it("accepts both string and number inputs for invalid VAT numbers", () => {
      expect(isValidVATNumber("141212176")).toBe(false);
      expect(isValidVATNumber(111111111)).toBe(false);
    });
  });
});
