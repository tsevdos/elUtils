import { isValidPostalCode } from "./isValidPostalCode";

describe("isValidPostalCode", () => {
  it("returns true on existing postal codes", () => {
    expect(isValidPostalCode("17562")).toBe(true);
    expect(isValidPostalCode("30005")).toBe(true);
    expect(isValidPostalCode("17122")).toBe(true);
    expect(isValidPostalCode("25008")).toBe(true);
    expect(isValidPostalCode("68014")).toBe(true);
    expect(isValidPostalCode("27066")).toBe(true);
    expect(isValidPostalCode("54250")).toBe(true);
  });

  it("returns false on not existing postal codes", () => {
    expect(isValidPostalCode("12345")).toBe(false);
    expect(isValidPostalCode("11111")).toBe(false);
    expect(isValidPostalCode("22222")).toBe(false);
    expect(isValidPostalCode("99999")).toBe(false);
    expect(isValidPostalCode("98765")).toBe(false);
    expect(isValidPostalCode("56789")).toBe(false);
  });

  it("returns true for Athens postal codes", () => {
    expect(isValidPostalCode("10431")).toBe(true); // Athens center
    expect(isValidPostalCode("11526")).toBe(true); // Ampelokipi
    expect(isValidPostalCode("17121")).toBe(true); // Nea Smyrni
    expect(isValidPostalCode("15231")).toBe(true); // Chalandri
  });

  it("returns true for Thessaloniki postal codes", () => {
    expect(isValidPostalCode("54630")).toBe(true); // Thessaloniki center
    expect(isValidPostalCode("54646")).toBe(true); // Thessaloniki
    expect(isValidPostalCode("55131")).toBe(true); // Kalamaria
    expect(isValidPostalCode("56121")).toBe(true); // Sykies
  });

  it("returns true for major Greek cities postal codes", () => {
    expect(isValidPostalCode("26221")).toBe(true); // Patras
    expect(isValidPostalCode("71202")).toBe(true); // Heraklion
    expect(isValidPostalCode("85100")).toBe(true); // Rhodes
    expect(isValidPostalCode("84100")).toBe(true); // Syros
  });

  it("returns true for island postal codes", () => {
    expect(isValidPostalCode("84600")).toBe(true); // Mykonos
    expect(isValidPostalCode("84700")).toBe(true); // Santorini
    expect(isValidPostalCode("73100")).toBe(true); // Chania (Crete)
    expect(isValidPostalCode("81100")).toBe(true); // Mytilene (Lesbos)
  });

  it("returns false for postal codes with wrong length", () => {
    expect(isValidPostalCode("1234")).toBe(false); // Too short
    expect(isValidPostalCode("123")).toBe(false); // Too short
    expect(isValidPostalCode("12")).toBe(false); // Too short
    expect(isValidPostalCode("1")).toBe(false); // Too short
    expect(isValidPostalCode("123456")).toBe(false); // Too long
    expect(isValidPostalCode("1234567")).toBe(false); // Too long
  });

  it("returns false for empty or whitespace strings", () => {
    expect(isValidPostalCode("")).toBe(false);
    expect(isValidPostalCode("     ")).toBe(false);
    expect(isValidPostalCode("  17562  ")).toBe(false); // With spaces
  });

  it("returns false for postal codes with non-numeric characters", () => {
    expect(isValidPostalCode("1756A")).toBe(false);
    expect(isValidPostalCode("ABC12")).toBe(false);
    expect(isValidPostalCode("175-62")).toBe(false);
    expect(isValidPostalCode("175.62")).toBe(false);
    expect(isValidPostalCode("175 62")).toBe(false);
  });

  it("returns false for postal codes with special characters", () => {
    expect(isValidPostalCode("17562!")).toBe(false);
    expect(isValidPostalCode("@17562")).toBe(false);
    expect(isValidPostalCode("175#62")).toBe(false);
    expect(isValidPostalCode("175$62")).toBe(false);
  });

  it("returns false for sequential/patterned invalid postal codes", () => {
    expect(isValidPostalCode("00000")).toBe(false);
    expect(isValidPostalCode("11111")).toBe(false);
    expect(isValidPostalCode("22222")).toBe(false);
    expect(isValidPostalCode("33333")).toBe(false);
    expect(isValidPostalCode("44444")).toBe(false);
    expect(isValidPostalCode("55555")).toBe(false);
    expect(isValidPostalCode("66666")).toBe(false);
    expect(isValidPostalCode("77777")).toBe(false);
    expect(isValidPostalCode("88888")).toBe(false);
    expect(isValidPostalCode("99999")).toBe(false);
  });

  it("returns false for boundary invalid postal codes", () => {
    expect(isValidPostalCode("00001")).toBe(false);
    expect(isValidPostalCode("10000")).toBe(false); // Assuming not valid
    expect(isValidPostalCode("99998")).toBe(false);
  });

  it("returns true for edge region postal codes", () => {
    expect(isValidPostalCode("66100")).toBe(true); // Drama
    expect(isValidPostalCode("67100")).toBe(true); // Xanthi
    expect(isValidPostalCode("68100")).toBe(true); // Alexandroupoli
    expect(isValidPostalCode("64100")).toBe(true); // Serres
  });

  it("returns false for postal codes from neighboring countries", () => {
    // These might look like Greek postal codes but aren't
    expect(isValidPostalCode("01000")).toBe(false); // Not Greek pattern
    expect(isValidPostalCode("90000")).toBe(false); // Not Greek pattern
  });

  it("returns true for rural area postal codes", () => {
    expect(isValidPostalCode("31100")).toBe(true); // Arta
    expect(isValidPostalCode("47040")).toBe(true); // Ioannina area
    expect(isValidPostalCode("33059")).toBe(true); // Rural area
  });

  it("returns false for postal codes with leading zeros that might be truncated", () => {
    // Testing edge cases where postal codes might be treated as numbers
    expect(isValidPostalCode("01234")).toBe(false); // Invalid starting with 0
    expect(isValidPostalCode("00123")).toBe(false); // Invalid starting with 00
  });
});
