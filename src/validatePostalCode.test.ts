import { validatePostalCode } from "./validationUtils";

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

  it("returns true for Athens postal codes", () => {
    expect(validatePostalCode("10431")).toBe(true); // Athens center
    expect(validatePostalCode("11526")).toBe(true); // Ampelokipi
    expect(validatePostalCode("17121")).toBe(true); // Nea Smyrni
    expect(validatePostalCode("15231")).toBe(true); // Chalandri
  });

  it("returns true for Thessaloniki postal codes", () => {
    expect(validatePostalCode("54630")).toBe(true); // Thessaloniki center
    expect(validatePostalCode("54646")).toBe(true); // Thessaloniki
    expect(validatePostalCode("55131")).toBe(true); // Kalamaria
    expect(validatePostalCode("56121")).toBe(true); // Sykies
  });

  it("returns true for major Greek cities postal codes", () => {
    expect(validatePostalCode("26221")).toBe(true); // Patras
    expect(validatePostalCode("71202")).toBe(true); // Heraklion
    expect(validatePostalCode("85100")).toBe(true); // Rhodes
    expect(validatePostalCode("84100")).toBe(true); // Syros
  });

  it("returns true for island postal codes", () => {
    expect(validatePostalCode("84600")).toBe(true); // Mykonos
    expect(validatePostalCode("84700")).toBe(true); // Santorini
    expect(validatePostalCode("73100")).toBe(true); // Chania (Crete)
    expect(validatePostalCode("81100")).toBe(true); // Mytilene (Lesbos)
  });

  it("returns false for postal codes with wrong length", () => {
    expect(validatePostalCode("1234")).toBe(false); // Too short
    expect(validatePostalCode("123")).toBe(false); // Too short
    expect(validatePostalCode("12")).toBe(false); // Too short
    expect(validatePostalCode("1")).toBe(false); // Too short
    expect(validatePostalCode("123456")).toBe(false); // Too long
    expect(validatePostalCode("1234567")).toBe(false); // Too long
  });

  it("returns false for empty or whitespace strings", () => {
    expect(validatePostalCode("")).toBe(false);
    expect(validatePostalCode("     ")).toBe(false);
    expect(validatePostalCode("  17562  ")).toBe(false); // With spaces
  });

  it("returns false for postal codes with non-numeric characters", () => {
    expect(validatePostalCode("1756A")).toBe(false);
    expect(validatePostalCode("ABC12")).toBe(false);
    expect(validatePostalCode("175-62")).toBe(false);
    expect(validatePostalCode("175.62")).toBe(false);
    expect(validatePostalCode("175 62")).toBe(false);
  });

  it("returns false for postal codes with special characters", () => {
    expect(validatePostalCode("17562!")).toBe(false);
    expect(validatePostalCode("@17562")).toBe(false);
    expect(validatePostalCode("175#62")).toBe(false);
    expect(validatePostalCode("175$62")).toBe(false);
  });

  it("returns false for sequential/patterned invalid postal codes", () => {
    expect(validatePostalCode("00000")).toBe(false);
    expect(validatePostalCode("11111")).toBe(false);
    expect(validatePostalCode("22222")).toBe(false);
    expect(validatePostalCode("33333")).toBe(false);
    expect(validatePostalCode("44444")).toBe(false);
    expect(validatePostalCode("55555")).toBe(false);
    expect(validatePostalCode("66666")).toBe(false);
    expect(validatePostalCode("77777")).toBe(false);
    expect(validatePostalCode("88888")).toBe(false);
    expect(validatePostalCode("99999")).toBe(false);
  });

  it("returns false for boundary invalid postal codes", () => {
    expect(validatePostalCode("00001")).toBe(false);
    expect(validatePostalCode("10000")).toBe(false); // Assuming not valid
    expect(validatePostalCode("99998")).toBe(false);
  });

  it("returns true for edge region postal codes", () => {
    expect(validatePostalCode("66100")).toBe(true); // Drama
    expect(validatePostalCode("67100")).toBe(true); // Xanthi
    expect(validatePostalCode("68100")).toBe(true); // Alexandroupoli
    expect(validatePostalCode("64100")).toBe(true); // Serres
  });

  it("returns false for postal codes from neighboring countries", () => {
    // These might look like Greek postal codes but aren't
    expect(validatePostalCode("01000")).toBe(false); // Not Greek pattern
    expect(validatePostalCode("90000")).toBe(false); // Not Greek pattern
  });

  it("returns true for rural area postal codes", () => {
    expect(validatePostalCode("31100")).toBe(true); // Arta
    expect(validatePostalCode("47040")).toBe(true); // Ioannina area
    expect(validatePostalCode("33059")).toBe(true); // Rural area
  });

  it("returns false for postal codes with leading zeros that might be truncated", () => {
    // Testing edge cases where postal codes might be treated as numbers
    expect(validatePostalCode("01234")).toBe(false); // Invalid starting with 0
    expect(validatePostalCode("00123")).toBe(false); // Invalid starting with 00
  });
});
