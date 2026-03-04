import { describe, expect, it } from "vitest";
import { isValidMobilePhone } from "./isValidMobilePhone";

describe("isValidMobilePhone", () => {
  describe("valid Greek mobile numbers", () => {
    it("should accept mobile numbers with +30 country code", () => {
      expect(isValidMobilePhone("+306991234567")).toBe(true);
      expect(isValidMobilePhone("+306901234567")).toBe(true);
      expect(isValidMobilePhone("+306981234567")).toBe(true);
      expect(isValidMobilePhone("+306971234567")).toBe(true);
    });

    it("should accept mobile numbers with 0030 country code", () => {
      expect(isValidMobilePhone("00306991234567")).toBe(true);
      expect(isValidMobilePhone("00306901234567")).toBe(true);
      expect(isValidMobilePhone("00306981234567")).toBe(true);
    });

    it("should accept mobile numbers without country code", () => {
      expect(isValidMobilePhone("6991234567")).toBe(true);
      expect(isValidMobilePhone("6901234567")).toBe(true);
      expect(isValidMobilePhone("6981234567")).toBe(true);
      expect(isValidMobilePhone("6971234567")).toBe(true);
    });

    it("should accept mobile numbers as numeric input", () => {
      expect(isValidMobilePhone(6991234567)).toBe(true);
      expect(isValidMobilePhone(6901234567)).toBe(true);
      expect(isValidMobilePhone(6981234567)).toBe(true);
    });

    it("should accept mobile numbers with spaces", () => {
      expect(isValidMobilePhone("69 9123 4567")).toBe(true);
      expect(isValidMobilePhone("699 123 4567")).toBe(true);
      expect(isValidMobilePhone("+30 699 123 4567")).toBe(true);
      expect(isValidMobilePhone("0030 699 123 4567")).toBe(true);
    });

    it("should accept mobile numbers with dashes", () => {
      expect(isValidMobilePhone("69-9123-4567")).toBe(true);
      expect(isValidMobilePhone("699-123-4567")).toBe(true);
      expect(isValidMobilePhone("+30-699-123-4567")).toBe(true);
    });

    it("should accept mobile numbers with parentheses", () => {
      expect(isValidMobilePhone("69(912)34567")).toBe(true);
      expect(isValidMobilePhone("(699)1234567")).toBe(true);
      expect(isValidMobilePhone("+30(699)1234567")).toBe(true);
    });

    it("should accept mobile numbers with dots", () => {
      expect(isValidMobilePhone("69.91.23.45.67")).toBe(true);
      expect(isValidMobilePhone("+30.699.123.4567")).toBe(true);
    });

    it("should accept mobile numbers with mixed formatting", () => {
      expect(isValidMobilePhone("69-9123 4567")).toBe(true);
      expect(isValidMobilePhone("+30 (699) 123-4567")).toBe(true);
      expect(isValidMobilePhone("0030-699 123.4567")).toBe(true);
    });
  });

  describe("invalid Greek mobile numbers", () => {
    it("should reject numbers that are too short", () => {
      expect(isValidMobilePhone("+30691234567")).toBe(false); // Missing 1 digit
      expect(isValidMobilePhone("699123456")).toBe(false); // Missing 1 digit
      expect(isValidMobilePhone("69912345")).toBe(false); // Missing 2 digits
      expect(isValidMobilePhone(699123456)).toBe(false); // Missing 1 digit as number
    });

    it("should reject numbers that are too long", () => {
      expect(isValidMobilePhone("003069812345679")).toBe(false); // Extra digit
      expect(isValidMobilePhone("69912345678")).toBe(false); // Extra digit
      expect(isValidMobilePhone("+3069912345678")).toBe(false); // Extra digit with country code
      expect(isValidMobilePhone("69-91234-56789")).toBe(false); // Extra digit with formatting
    });

    it("should reject numbers with invalid length after sanitization", () => {
      expect(isValidMobilePhone("0030698123456")).toBe(false); // Too short
      expect(isValidMobilePhone("69 9123456")).toBe(false); // Too short with space
    });

    it("should reject numbers that don't start with 69", () => {
      expect(isValidMobilePhone("6891234567")).toBe(false); // Starts with 68
      expect(isValidMobilePhone(6891234567)).toBe(false); // Starts with 68 as number
      expect(isValidMobilePhone("6791234567")).toBe(false); // Starts with 67
      expect(isValidMobilePhone("7091234567")).toBe(false); // Starts with 70
      expect(isValidMobilePhone("6091234567")).toBe(false); // Starts with 60
    });

    it("should reject completely invalid numbers", () => {
      expect(isValidMobilePhone("1234567890")).toBe(false);
      expect(isValidMobilePhone(1234567890)).toBe(false);
      expect(isValidMobilePhone("9876543210")).toBe(false);
    });

    it("should reject numbers with invalid country codes", () => {
      expect(isValidMobilePhone("+316991234567")).toBe(false); // Netherlands
      expect(isValidMobilePhone("+446991234567")).toBe(false); // UK
      expect(isValidMobilePhone("00316991234567")).toBe(false); // Netherlands
    });

    it("should reject landline numbers", () => {
      expect(isValidMobilePhone("2101234567")).toBe(false); // Athens landline
      expect(isValidMobilePhone("+302101234567")).toBe(false); // Athens landline with country code
      expect(isValidMobilePhone("2310123456")).toBe(false); // Thessaloniki landline
    });

    it("should reject empty or whitespace-only input", () => {
      expect(isValidMobilePhone("")).toBe(false);
      expect(isValidMobilePhone("   ")).toBe(false);
      expect(isValidMobilePhone("\t\n")).toBe(false);
    });

    it("should reject input with letters or special characters", () => {
      expect(isValidMobilePhone("69912345ab")).toBe(false);
      expect(isValidMobilePhone("699123456#")).toBe(false);
      expect(isValidMobilePhone("699@123456")).toBe(false);
      expect(isValidMobilePhone("abc6991234567")).toBe(false);
    });

    it("should reject all zeros", () => {
      expect(isValidMobilePhone("0000000000")).toBe(false);
    });

    it("should reject numbers with invalid formatting combinations", () => {
      expect(isValidMobilePhone("++306991234567")).toBe(false); // Double plus
      expect(isValidMobilePhone("+0030306991234567")).toBe(false); // Mixed country codes
    });
  });

  describe("edge cases", () => {
    it("should handle numbers at the boundary of valid prefixes", () => {
      expect(isValidMobilePhone("6900000000")).toBe(true); // 690 prefix (valid)
      expect(isValidMobilePhone("6999999999")).toBe(true); // 699 prefix (valid)
      expect(isValidMobilePhone("6910000000")).toBe(true); // 691 prefix (valid)
      expect(isValidMobilePhone("6989999999")).toBe(true); // 698 prefix (valid)
      expect(isValidMobilePhone("6890000000")).toBe(false); // 689 prefix (invalid)
      expect(isValidMobilePhone("7000000000")).toBe(false); // 700 prefix (invalid)
    });

    it("should handle leading and trailing spaces after sanitization", () => {
      expect(isValidMobilePhone("  6991234567  ")).toBe(true);
      expect(isValidMobilePhone(" +30 699 123 4567 ")).toBe(true);
    });

    it("should handle floating point numbers", () => {
      expect(isValidMobilePhone(6991234567.0)).toBe(true);
      expect(isValidMobilePhone(6991234567.5)).toBe(false); // Contains decimal
    });

    it("should handle very large numbers", () => {
      expect(isValidMobilePhone(69912345670000)).toBe(false); // Too many digits
    });

    it("should handle string numbers with leading zeros", () => {
      expect(isValidMobilePhone("06991234567")).toBe(false); // Leading zero without country code
      expect(isValidMobilePhone("006991234567")).toBe(false); // Double zeros without full country code
    });
  });
});
