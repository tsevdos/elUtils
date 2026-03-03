import { isValidAMKA } from "./isValidAMKA";

describe("isValidAMKA", () => {
  it("returns true on valid AMKA", () => {
    expect(isValidAMKA("01012488886")).toBe(true);
    expect(isValidAMKA("12121212125")).toBe(true);
    // Allow integer AMKA
    expect(isValidAMKA(12121212125)).toBe(true);
  });

  it("returns false on invalid AMKA", () => {
    expect(isValidAMKA("a0000000000")).toBe(false);
    expect(isValidAMKA("00000000000")).toBe(false);
    // Incorrect length
    expect(isValidAMKA("1234567890")).toBe(false);
    expect(isValidAMKA("123456789012")).toBe(false);
    // Incorrect checksum
    expect(isValidAMKA("12345678901")).toBe(false);
    expect(isValidAMKA("42042042069")).toBe(false);
    // Correct checksum, but incorrect date
    // Obvious date errors
    expect(isValidAMKA("24242424241")).toBe(false);
    expect(isValidAMKA("53121212129")).toBe(false);
    // 31st on months that only have 30 days
    expect(isValidAMKA("31062455551")).toBe(false);
    expect(isValidAMKA("31092455554")).toBe(false);
    expect(isValidAMKA("31112455551")).toBe(false);
    // 29th of February on non-leap years
    expect(isValidAMKA("29022355553")).toBe(false);
    // 30th of February on non-leap years
    expect(isValidAMKA("30022455551")).toBe(false);
  });

  it("returns false on empty or invalid string inputs", () => {
    expect(isValidAMKA("")).toBe(false);
    expect(isValidAMKA("abc")).toBe(false);
    expect(isValidAMKA("12345abc890")).toBe(false);
  });

  it("returns false on AMKA with valid length but all same digits", () => {
    expect(isValidAMKA("11111111111")).toBe(false);
    expect(isValidAMKA("22222222222")).toBe(false);
  });

  it("handles edge case dates correctly", () => {
    // Valid leap year February 29th
    expect(isValidAMKA("29022412125")).toBe(true);
    // Invalid non-leap year February 29th
    expect(isValidAMKA("29022355553")).toBe(false);
  });

  it("validates correct month ranges", () => {
    // Month 00 is invalid
    expect(isValidAMKA("01002488885")).toBe(false);
    // Month 13 is invalid
    expect(isValidAMKA("01132488880")).toBe(false);
  });
});
