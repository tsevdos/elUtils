import { describe, expect, it } from "vitest";
import { isValidLandlinePhone, areaCodes } from "./isValidLandlinePhone";

describe("isValidLandlinePhone", () => {
  describe("valid landline numbers with country code (withPrefix=true)", () => {
    it("should accept Athens landline numbers with +30 prefix", () => {
      expect(isValidLandlinePhone("+302107654321")).toBe(true);
      expect(isValidLandlinePhone("+302104567890")).toBe(true);
      expect(isValidLandlinePhone("+302101234567")).toBe(true);
    });

    it("should accept Athens landline numbers with 0030 prefix", () => {
      expect(isValidLandlinePhone("00302107654321")).toBe(true);
      expect(isValidLandlinePhone("00302104567890")).toBe(true);
      expect(isValidLandlinePhone("00302109876543")).toBe(true);
    });

    it("should accept Thessaloniki landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302317654321")).toBe(true);
      expect(isValidLandlinePhone("00302317654321")).toBe(true);
      expect(isValidLandlinePhone("+302311234567")).toBe(true);
    });

    it("should accept Patras landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302617654321")).toBe(true);
      expect(isValidLandlinePhone("00302617654321")).toBe(true);
      expect(isValidLandlinePhone("+302611234567")).toBe(true);
    });

    it("should accept Heraklion landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302817654321")).toBe(true);
      expect(isValidLandlinePhone("00302817654321")).toBe(true);
      expect(isValidLandlinePhone("+302811234567")).toBe(true);
    });

    it("should accept Larissa landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302417654321")).toBe(true);
      expect(isValidLandlinePhone("00302417654321")).toBe(true);
      expect(isValidLandlinePhone("+302411234567")).toBe(true);
    });

    it("should accept Rhodes landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302247654321")).toBe(true);
      expect(isValidLandlinePhone("00302247654321")).toBe(true);
      expect(isValidLandlinePhone("+302241234567")).toBe(true);
    });

    it("should accept Chania landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302827654321")).toBe(true);
      expect(isValidLandlinePhone("00302827654321")).toBe(true);
      expect(isValidLandlinePhone("+302821234567")).toBe(true);
    });

    it("should accept Volos landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302427654321")).toBe(true);
      expect(isValidLandlinePhone("00302427654321")).toBe(true);
      expect(isValidLandlinePhone("+302421234567")).toBe(true);
    });

    it("should accept Corfu landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302667654321")).toBe(true);
      expect(isValidLandlinePhone("00302667654321")).toBe(true);
      expect(isValidLandlinePhone("+302661234567")).toBe(true);
    });

    it("should accept Ioannina landline numbers with country code", () => {
      expect(isValidLandlinePhone("+302657654321")).toBe(true);
      expect(isValidLandlinePhone("00302657654321")).toBe(true);
      expect(isValidLandlinePhone("+302651234567")).toBe(true);
    });

    it("should accept landline numbers with spaces", () => {
      expect(isValidLandlinePhone("+30 210 765 4321")).toBe(true);
      expect(isValidLandlinePhone("0030 210 765 4321")).toBe(true);
      expect(isValidLandlinePhone("+30 231 123 4567")).toBe(true);
    });

    it("should accept landline numbers with dashes", () => {
      expect(isValidLandlinePhone("+30-210-765-4321")).toBe(true);
      expect(isValidLandlinePhone("0030-210-765-4321")).toBe(true);
      expect(isValidLandlinePhone("+30-261-123-4567")).toBe(true);
    });

    it("should accept landline numbers with parentheses", () => {
      expect(isValidLandlinePhone("+30(210)7654321")).toBe(true);
      expect(isValidLandlinePhone("0030(210)7654321")).toBe(true);
      expect(isValidLandlinePhone("+30(281)1234567")).toBe(true);
    });

    it("should accept landline numbers with dots", () => {
      expect(isValidLandlinePhone("+30.210.765.4321")).toBe(true);
      expect(isValidLandlinePhone("0030.210.765.4321")).toBe(true);
      expect(isValidLandlinePhone("+30.241.123.4567")).toBe(true);
    });

    it("should accept landline numbers with mixed formatting", () => {
      expect(isValidLandlinePhone("+30 (210) 765-4321")).toBe(true);
      expect(isValidLandlinePhone("0030-210 765.4321")).toBe(true);
      expect(isValidLandlinePhone("+30-224 (123) 4567")).toBe(true);
    });
  });

  describe("valid landline numbers without country code (withPrefix=false)", () => {
    it("should accept Athens landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2107654321", false)).toBe(true);
      expect(isValidLandlinePhone(2107654321, false)).toBe(true);
      expect(isValidLandlinePhone("2104567890", false)).toBe(true);
      expect(isValidLandlinePhone(2104567890, false)).toBe(true);
    });

    it("should accept Thessaloniki landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2317654321", false)).toBe(true);
      expect(isValidLandlinePhone(2317654321, false)).toBe(true);
    });

    it("should accept Patras landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2617654321", false)).toBe(true);
      expect(isValidLandlinePhone(2617654321, false)).toBe(true);
    });

    it("should accept Heraklion landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2817654321", false)).toBe(true);
      expect(isValidLandlinePhone(2817654321, false)).toBe(true);
    });

    it("should accept Larissa landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2417654321", false)).toBe(true);
      expect(isValidLandlinePhone(2417654321, false)).toBe(true);
    });

    it("should accept Rhodes landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2247654321", false)).toBe(true);
      expect(isValidLandlinePhone(2247654321, false)).toBe(true);
    });

    it("should accept Chania landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2827654321", false)).toBe(true);
      expect(isValidLandlinePhone(2827654321, false)).toBe(true);
    });

    it("should accept Volos landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2427654321", false)).toBe(true);
      expect(isValidLandlinePhone(2427654321, false)).toBe(true);
    });

    it("should accept Corfu landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2667654321", false)).toBe(true);
      expect(isValidLandlinePhone(2667654321, false)).toBe(true);
    });

    it("should accept Ioannina landline numbers without prefix", () => {
      expect(isValidLandlinePhone("2657654321", false)).toBe(true);
      expect(isValidLandlinePhone(2657654321, false)).toBe(true);
    });

    it("should accept landline numbers with spaces", () => {
      expect(isValidLandlinePhone("210 765 4321", false)).toBe(true);
      expect(isValidLandlinePhone("231 123 4567", false)).toBe(true);
    });

    it("should accept landline numbers with dashes", () => {
      expect(isValidLandlinePhone("210-765-4321", false)).toBe(true);
      expect(isValidLandlinePhone("261-123-4567", false)).toBe(true);
    });

    it("should accept landline numbers with dots", () => {
      expect(isValidLandlinePhone("210.765.4321", false)).toBe(true);
      expect(isValidLandlinePhone("281.123.4567", false)).toBe(true);
    });

    it("should accept landline numbers with parentheses", () => {
      expect(isValidLandlinePhone("(210)7654321", false)).toBe(true);
      expect(isValidLandlinePhone("(241)1234567", false)).toBe(true);
    });

    it("should accept landline numbers with mixed formatting", () => {
      expect(isValidLandlinePhone("210 (765) 4321", false)).toBe(true);
      expect(isValidLandlinePhone("224-123.4567", false)).toBe(true);
    });
  });

  describe("invalid landline numbers with country code (withPrefix=true)", () => {
    it("should reject numbers that are too short", () => {
      expect(isValidLandlinePhone("+30210765432")).toBe(false); // Missing 1 digit
      expect(isValidLandlinePhone("0030210765432")).toBe(false); // Missing 1 digit
      expect(isValidLandlinePhone("+3021076543")).toBe(false); // Missing 2 digits
    });

    it("should reject numbers that are too long", () => {
      expect(isValidLandlinePhone("003022107654321")).toBe(false); // Extra digit in area code
      expect(isValidLandlinePhone("003021123456789")).toBe(false); // Extra digits
      expect(isValidLandlinePhone("+302107654321234")).toBe(false); // Extra digits
    });

    it("should reject numbers with invalid area codes", () => {
      expect(isValidLandlinePhone("+303001234567")).toBe(false); // 300 is not valid
      expect(isValidLandlinePhone("+303012345678")).toBe(false); // 301 is not valid
      expect(isValidLandlinePhone("+302001234567")).toBe(false); // 200 is not valid
      expect(isValidLandlinePhone("+302111234567")).toBe(false); // 211 is not valid
      expect(isValidLandlinePhone("+302201234567")).toBe(false); // 220 is not valid
      expect(isValidLandlinePhone("+302321234567")).toBe(false); // 232 is not valid
    });

    it("should reject mobile numbers", () => {
      expect(isValidLandlinePhone("+306991234567")).toBe(false);
      expect(isValidLandlinePhone("00306991234567")).toBe(false);
    });

    it("should reject numbers with invalid country codes", () => {
      expect(isValidLandlinePhone("+312107654321")).toBe(false); // Netherlands
      expect(isValidLandlinePhone("+442107654321")).toBe(false); // UK
      expect(isValidLandlinePhone("00312107654321")).toBe(false); // Netherlands
    });

    it("should reject empty or whitespace-only input", () => {
      expect(isValidLandlinePhone("")).toBe(false);
      expect(isValidLandlinePhone("   ")).toBe(false);
      expect(isValidLandlinePhone("\t\n")).toBe(false);
    });

    it("should reject numbers with letters or special characters", () => {
      expect(isValidLandlinePhone("+30-210-765-ABCD")).toBe(false);
      expect(isValidLandlinePhone("+30210765432#")).toBe(false);
      expect(isValidLandlinePhone("+30210@654321")).toBe(false);
      expect(isValidLandlinePhone("abc+302107654321")).toBe(false);
    });

    it("should reject all zeros", () => {
      expect(isValidLandlinePhone("0000000000")).toBe(false);
    });

    it("should reject numbers with invalid prefix combinations", () => {
      expect(isValidLandlinePhone("++302107654321")).toBe(false); // Double plus
      expect(isValidLandlinePhone("+0030302107654321")).toBe(false); // Mixed prefixes
    });
  });

  describe("invalid landline numbers without country code (withPrefix=false)", () => {
    it("should reject numbers that are too short", () => {
      expect(isValidLandlinePhone("210765432", false)).toBe(false); // Missing 1 digit
      expect(isValidLandlinePhone(210765432, false)).toBe(false); // Missing 1 digit as number
      expect(isValidLandlinePhone("21076543", false)).toBe(false); // Missing 2 digits
      expect(isValidLandlinePhone("210-765-432", false)).toBe(false); // Missing 1 digit with formatting
    });

    it("should reject numbers that are too long", () => {
      expect(isValidLandlinePhone("210765432123", false)).toBe(false); // Extra digits
      expect(isValidLandlinePhone(210765432123, false)).toBe(false); // Extra digits as number
      expect(isValidLandlinePhone("21076543212", false)).toBe(false); // Extra digit
    });

    it("should reject numbers with invalid area codes", () => {
      expect(isValidLandlinePhone("3007654321", false)).toBe(false); // 300 is not valid
      expect(isValidLandlinePhone("3017654321", false)).toBe(false); // 301 is not valid
      expect(isValidLandlinePhone("2007654321", false)).toBe(false); // 200 is not valid
      expect(isValidLandlinePhone("2117654321", false)).toBe(false); // 211 is not valid
      expect(isValidLandlinePhone("2201234567", false)).toBe(false); // 220 is not valid
      expect(isValidLandlinePhone("2321234567", false)).toBe(false); // 232 is not valid
    });

    it("should reject mobile numbers", () => {
      expect(isValidLandlinePhone("6991234567", false)).toBe(false);
      expect(isValidLandlinePhone(6991234567, false)).toBe(false);
    });

    it("should reject completely invalid numbers", () => {
      expect(isValidLandlinePhone("1234567890", false)).toBe(false);
      expect(isValidLandlinePhone(1234567890, false)).toBe(false);
    });

    it("should reject empty or whitespace-only input", () => {
      expect(isValidLandlinePhone("", false)).toBe(false);
      expect(isValidLandlinePhone("   ", false)).toBe(false);
    });

    it("should reject numbers with letters or special characters", () => {
      expect(isValidLandlinePhone("210-ABC-4321", false)).toBe(false);
      expect(isValidLandlinePhone("210!765*4321", false)).toBe(false);
      expect(isValidLandlinePhone("210#7654321", false)).toBe(false);
      expect(isValidLandlinePhone("abc2107654321", false)).toBe(false);
    });

    it("should reject numbers with country code when withPrefix=false", () => {
      expect(isValidLandlinePhone("+302107654321", false)).toBe(false);
      expect(isValidLandlinePhone("00302107654321", false)).toBe(false);
    });

    it("should reject all zeros", () => {
      expect(isValidLandlinePhone("0000000000", false)).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle numbers at the boundary of valid area codes", () => {
      expect(isValidLandlinePhone("2100000000", false)).toBe(true); // Athens
      expect(isValidLandlinePhone("2109999999", false)).toBe(true); // Athens
      expect(isValidLandlinePhone("2310000000", false)).toBe(true); // Thessaloniki
      expect(isValidLandlinePhone("2319999999", false)).toBe(true); // Thessaloniki
    });

    it("should handle leading and trailing spaces", () => {
      expect(isValidLandlinePhone("  2107654321  ", false)).toBe(true);
      expect(isValidLandlinePhone(" +30 210 765 4321 ")).toBe(true);
    });

    it("should handle floating point numbers", () => {
      expect(isValidLandlinePhone(2107654321.0, false)).toBe(true);
      expect(isValidLandlinePhone(2107654321.5, false)).toBe(false); // Contains decimal
    });

    it("should handle very large numbers", () => {
      expect(isValidLandlinePhone(21076543210000, false)).toBe(false); // Too many digits
    });

    it("should handle string numbers with leading zeros", () => {
      expect(isValidLandlinePhone("02107654321", false)).toBe(false); // Leading zero without country code
      expect(isValidLandlinePhone("002107654321", false)).toBe(false); // Double zeros without full country code
    });

    it("should handle default withPrefix parameter", () => {
      // When withPrefix is not specified, it defaults to true
      // Note: prefix is optional when withPrefix=true, so both work
      expect(isValidLandlinePhone("+302107654321")).toBe(true);
      expect(isValidLandlinePhone("2107654321")).toBe(true); // Also valid (prefix is optional)
    });

    it("should differentiate between withPrefix true and false", () => {
      // When withPrefix=true, prefix is optional (both with and without work)
      expect(isValidLandlinePhone("2107654321", true)).toBe(true); // Valid without prefix
      expect(isValidLandlinePhone("+302107654321", true)).toBe(true); // Valid with prefix
      expect(isValidLandlinePhone("00302107654321", true)).toBe(true); // Valid with 0030 prefix

      // When withPrefix=false, prefix must NOT be present
      expect(isValidLandlinePhone("2107654321", false)).toBe(true); // Valid without prefix
      expect(isValidLandlinePhone("+302107654321", false)).toBe(false); // Invalid with prefix
      expect(isValidLandlinePhone("00302107654321", false)).toBe(false); // Invalid with 0030 prefix
    });

    it("should handle all valid area codes comprehensively", () => {
      const validAreaCodes = Object.values(areaCodes);

      for (const areaCode of validAreaCodes) {
        expect(isValidLandlinePhone(`${areaCode}1234567`, false)).toBe(true);
        expect(isValidLandlinePhone(`+30${areaCode}1234567`)).toBe(true);
        expect(isValidLandlinePhone(`0030${areaCode}1234567`)).toBe(true);
      }
    });
  });
});
