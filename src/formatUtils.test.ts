import { describe, expect, it } from "vitest";

import { formatNumber } from "./formatUtils";

describe("formatNumber", () => {
  it("formats a simple number with the default Greek locale", () => {
    expect(formatNumber(1234567.89)).toBe("1.234.567,89");
  });

  it("formats a currency value", () => {
    const result = formatNumber(1234.56, { style: "currency", currency: "EUR" }).replaceAll("\u00A0", " ");
    expect(result).toBe("1.234,56 €");
  });

  it("formats a percentage", () => {
    expect(formatNumber(0.1234, { style: "percent", minimumFractionDigits: 2 })).toBe("12,34%");
  });

  it("formats with a custom locale", () => {
    expect(formatNumber(1234567.89, { locale: "en-US" })).toBe("1,234,567.89");
  });

  it("supports bigint", () => {
    expect(formatNumber(1234567890123456789n)).toBe("1.234.567.890.123.456.789");
  });
});
