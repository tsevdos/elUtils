import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  describe("basic number formatting", () => {
    it("formats a simple number with the default Greek locale", () => {
      expect(formatNumber(1234567.89)).toBe("1.234.567,89");
    });

    it("formats zero correctly", () => {
      expect(formatNumber(0)).toBe("0");
    });

    it("formats negative numbers correctly", () => {
      expect(formatNumber(-1234.56)).toBe("-1.234,56");
    });

    it("formats small decimal numbers", () => {
      expect(formatNumber(0.123456)).toBe("0,123");
    });

    it("formats very large numbers", () => {
      expect(formatNumber(999999999999.99)).toBe("999.999.999.999,99");
    });

    it("formats integers without decimal places", () => {
      expect(formatNumber(1000)).toBe("1.000");
    });
  });

  describe("currency formatting", () => {
    it("formats EUR currency with default Greek locale", () => {
      const result = formatNumber(1234.56, { style: "currency", currency: "EUR" }).replaceAll("\u00A0", " ");
      expect(result).toBe("1.234,56 €");
    });

    it("formats USD currency with US locale", () => {
      const result = formatNumber(1234.56, { style: "currency", currency: "USD", locale: "en-US" });
      expect(result).toBe("$1,234.56");
    });

    it("formats currency with zero value", () => {
      const result = formatNumber(0, { style: "currency", currency: "EUR" }).replaceAll("\u00A0", " ");
      expect(result).toBe("0,00 €");
    });

    it("formats negative currency values", () => {
      const result = formatNumber(-500.25, { style: "currency", currency: "EUR" }).replaceAll("\u00A0", " ");
      expect(result).toBe("-500,25 €");
    });

    it("formats GBP currency", () => {
      const result = formatNumber(999.99, { style: "currency", currency: "GBP" }).replaceAll("\u00A0", " ");
      expect(result).toBe("999,99 £");
    });
  });

  describe("percentage formatting", () => {
    it("formats a percentage with default precision", () => {
      expect(formatNumber(0.1234, { style: "percent" })).toBe("12%");
    });

    it("formats a percentage with custom fraction digits", () => {
      expect(formatNumber(0.1234, { style: "percent", minimumFractionDigits: 2 })).toBe("12,34%");
    });

    it("formats zero percentage", () => {
      expect(formatNumber(0, { style: "percent" })).toBe("0%");
    });

    it("formats 100% correctly", () => {
      expect(formatNumber(1, { style: "percent" })).toBe("100%");
    });

    it("formats percentage with maximum fraction digits", () => {
      expect(formatNumber(0.123456, { style: "percent", maximumFractionDigits: 4 })).toBe("12,3456%");
    });

    it("formats negative percentage", () => {
      expect(formatNumber(-0.25, { style: "percent" })).toBe("-25%");
    });
  });

  describe("locale support", () => {
    it("formats with US locale", () => {
      expect(formatNumber(1234567.89, { locale: "en-US" })).toBe("1,234,567.89");
    });

    it("formats with UK locale", () => {
      expect(formatNumber(1234567.89, { locale: "en-GB" })).toBe("1,234,567.89");
    });

    it("formats with German locale", () => {
      expect(formatNumber(1234567.89, { locale: "de-DE" })).toBe("1.234.567,89");
    });

    it("formats with French locale", () => {
      const result = formatNumber(1234567.89, { locale: "fr-FR" }).replaceAll(/\s/g, " ");
      expect(result).toBe("1 234 567,89");
    });

    it("formats with multiple locale fallbacks", () => {
      expect(formatNumber(1234.56, { locale: ["el-GR", "en-US"] })).toBe("1.234,56");
    });
  });

  describe("precision and rounding", () => {
    it("formats with minimum fraction digits", () => {
      expect(formatNumber(123, { minimumFractionDigits: 2 })).toBe("123,00");
    });

    it("formats with maximum fraction digits", () => {
      expect(formatNumber(123.456789, { maximumFractionDigits: 2 })).toBe("123,46");
    });

    it("formats with both minimum and maximum fraction digits", () => {
      expect(formatNumber(123.4, { minimumFractionDigits: 2, maximumFractionDigits: 4 })).toBe("123,40");
    });

    it("formats with minimum integer digits", () => {
      expect(formatNumber(5, { minimumIntegerDigits: 3 })).toBe("005");
    });

    it("formats with significant digits", () => {
      expect(formatNumber(12345, { minimumSignificantDigits: 7 })).toBe("12.345,00");
    });
  });

  describe("bigint support", () => {
    it("formats a large bigint value", () => {
      expect(formatNumber(1234567890123456789n)).toBe("1.234.567.890.123.456.789");
    });

    it("formats bigint zero", () => {
      expect(formatNumber(0n)).toBe("0");
    });

    it("formats negative bigint", () => {
      expect(formatNumber(-999999999n)).toBe("-999.999.999");
    });

    it("formats bigint with custom locale", () => {
      expect(formatNumber(123456789n, { locale: "en-US" })).toBe("123,456,789");
    });
  });

  describe("edge cases", () => {
    it("formats very small numbers", () => {
      expect(formatNumber(0.000001)).toBe("0");
    });

    it("formats very small numbers with notation", () => {
      const result = formatNumber(0.000001, { notation: "scientific" });
      expect(result.toLowerCase()).toContain("e");
    });

    it("formats with compact notation", () => {
      const result = formatNumber(1234567, { notation: "compact" }).replaceAll("\u00A0", " ");
      expect(result).toBe("1,2 εκ.");
    });

    it("formats with compact notation in English", () => {
      const result = formatNumber(1234567, { notation: "compact", locale: "en-US" });
      expect(result).toBe("1.2M");
    });

    it("formats with engineering notation", () => {
      const result = formatNumber(123456, { notation: "engineering" });
      expect(result.toLowerCase()).toContain("e");
    });

    it("handles useGrouping option", () => {
      expect(formatNumber(1234567.89, { useGrouping: false })).toBe("1234567,89");
    });

    it("formats with signDisplay option always", () => {
      expect(formatNumber(123, { signDisplay: "always" })).toBe("+123");
    });

    it("formats with signDisplay option never", () => {
      expect(formatNumber(-123, { signDisplay: "never" })).toBe("123");
    });
  });

  describe("combination of options", () => {
    it("formats currency with custom fraction digits", () => {
      const result = formatNumber(1234.5, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 3,
      }).replaceAll("\u00A0", " ");
      expect(result).toBe("1.234,500 €");
    });

    it("formats percentage with custom locale and precision", () => {
      expect(
        formatNumber(0.12345, {
          style: "percent",
          locale: "en-US",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      ).toBe("12.35%");
    });

    it("formats with all decimal options", () => {
      expect(
        formatNumber(1234.567, {
          minimumIntegerDigits: 5,
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        }),
      ).toBe("01.234,567");
    });
  });
});
