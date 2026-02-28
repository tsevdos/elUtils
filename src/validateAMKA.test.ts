import { validateAMKA } from "./validateAMKA";

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
