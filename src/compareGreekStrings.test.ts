import { compareGreekStrings } from "./compareGreekStrings";

describe("compareGreekStrings", () => {
  describe("basic equality", () => {
    it("returns true for identical strings", () => {
      expect(compareGreekStrings("Α", "Α")).toBe(true);
      expect(compareGreekStrings("ΑΒΓΔΕ", "ΑΒΓΔΕ")).toBe(true);
      expect(compareGreekStrings("Ελλάδα", "Ελλάδα")).toBe(true);
    });

    it("returns true for same strings with different case", () => {
      expect(compareGreekStrings("α", "Α")).toBe(true);
      expect(compareGreekStrings("αβγδε", "ΑΒΓΔΕ")).toBe(true);
      expect(compareGreekStrings("Ελλάδα", "ΕΛΛΑΔΑ")).toBe(true);
      expect(compareGreekStrings("ΘεΣσΑλΟνΊκΗ", "θεσσαλονίκη")).toBe(true);
    });

    it("returns false for different strings", () => {
      expect(compareGreekStrings("Α", "Β")).toBe(false);
      expect(compareGreekStrings("Αθήνα", "Θεσσαλονίκη")).toBe(false);
      expect(compareGreekStrings("ΔΟΥ Α", "ΔΟΥ Β")).toBe(false);
    });
  });

  describe("accent handling", () => {
    it("returns true when only accents differ", () => {
      expect(compareGreekStrings("Ά", "Α")).toBe(true);
      expect(compareGreekStrings("ά", "Α")).toBe(true);
      expect(compareGreekStrings("Έ", "Ε")).toBe(true);
      expect(compareGreekStrings("Ή", "Η")).toBe(true);
      expect(compareGreekStrings("Ί", "Ι")).toBe(true);
      expect(compareGreekStrings("Ό", "Ο")).toBe(true);
      expect(compareGreekStrings("Ύ", "Υ")).toBe(true);
      expect(compareGreekStrings("Ώ", "Ω")).toBe(true);
    });

    it("returns true for words with and without accents", () => {
      expect(compareGreekStrings("Αθήνα", "ΑΘΗΝΑ")).toBe(true);
      expect(compareGreekStrings("Ελλάδα", "ΕΛΛΑΔΑ")).toBe(true);
      expect(compareGreekStrings("Θεσσαλονίκη", "ΘΕΣΣΑΛΟΝΙΚΗ")).toBe(true);
      expect(compareGreekStrings("Καλημέρα", "ΚΑΛΗΜΕΡΑ")).toBe(true);
    });

    it("returns true for diaeresis variations", () => {
      expect(compareGreekStrings("ϊ", "Ι")).toBe(true);
      expect(compareGreekStrings("Ϊ", "Ι")).toBe(true);
      expect(compareGreekStrings("ΐ", "Ι")).toBe(true);
      expect(compareGreekStrings("ϋ", "Υ")).toBe(true);
      expect(compareGreekStrings("Ϋ", "Υ")).toBe(true);
      expect(compareGreekStrings("ΰ", "Υ")).toBe(true);
    });
  });

  describe("space handling", () => {
    it("returns true when spaces differ", () => {
      expect(compareGreekStrings("Η πρόταση αυτή είναι ίδια", "Ηπρότασηαυτήείναιίδια")).toBe(true);
      expect(compareGreekStrings(" Η πρόταση αυτή είναι ίδια ", "Ηπρότασηαυτήείναιίδια")).toBe(true);
      expect(compareGreekStrings("Η ΠΡΟΤΑΣΗ ΑΥΤΗ ΕΙΝΑΙ ΙΔΙΑ", "ΗΠΡΟΤΑΣΗΑΥΤΗΕΙΝΑΙΙΔΙΑ")).toBe(true);
    });

    it("returns true for multiple spaces", () => {
      expect(compareGreekStrings("Ξ Α Ν Θ Η Σ", "ΞΑΝΘΗΣ")).toBe(true);
      expect(compareGreekStrings(" Ξ Α Ν Θ Η Σ ", "ξάνθης")).toBe(true);
      expect(compareGreekStrings("ΞΑ ΝΘΗΣ", "ΞΑΝΘΗΣ")).toBe(true);
    });
  });

  describe("special character handling", () => {
    it("returns true when hyphens and underscores differ", () => {
      expect(compareGreekStrings("Η-πρόταση_αυτή-είναι-ίδια", "Η ΠΡΟΤΑΣΗ ΑΥΤΗ ΕΙΝΑΙ ΙΔΙΑ")).toBe(true);
      expect(compareGreekStrings("Άγιος-Νικόλαος", "ΑΓΙΟΣ ΝΙΚΟΛΑΟΣ")).toBe(true);
    });

    it("returns true when various special characters are present", () => {
      expect(compareGreekStrings("Νομός Αθηνών", "%Νομός Αθηνών%")).toBe(true);
      expect(compareGreekStrings("/$Δήμος Χ@αλκίδας!", "ΔΗΜΟΣ ΧΑΛΚΙΔΑΣ")).toBe(true);
      expect(compareGreekStrings("!Δ#ή$μ%ο^ς& Χ*α(λκίδας!", "Δ)Η-Μ_ΟΣ ΧΑΛΚΙΔΑΣ")).toBe(true);
    });

    it("returns true when parentheses and slashes are present", () => {
      expect(compareGreekStrings("Αθήνα (Κέντρο)", "ΑΘΗΝΑ ΚΕΝΤΡΟ")).toBe(true);
      expect(compareGreekStrings("Α/Α", "ΑΑ")).toBe(true);
    });
  });

  describe("real-world scenarios", () => {
    it("compares tax office names correctly", () => {
      expect(compareGreekStrings("ΔΟΥ Ξάνθης", "ΔΟΥ ΞΑΝΘΗΣ")).toBe(true);
      expect(compareGreekStrings("ΔΟΥ Αθηνών", "δου αθηνων")).toBe(true);
    });

    it("compares municipality names correctly", () => {
      expect(compareGreekStrings("Δήμος Αθηναίων", "ΔΗΜΟΣ ΑΘΗΝΑΙΩΝ")).toBe(true);
      expect(compareGreekStrings("Δήμος Θεσσαλονίκης", "δημος θεσσαλονικης")).toBe(true);
    });

    it("compares prefecture names correctly", () => {
      expect(compareGreekStrings("Νομός Αθηνών", "ΝΟΜΟΣ ΑΘΗΝΩΝ")).toBe(true);
      expect(compareGreekStrings("Περιφέρεια Κρήτης", "περιφερεια κρητης")).toBe(true);
    });

    it("handles combined accents, spaces, and special characters", () => {
      expect(compareGreekStrings("Η πρόταση αυτή είναι ίδια", "Η ΠΡΟΤΑΣΗ ΑΥΤΗ ΕΙΝΑΙ ΙΔΙΑ")).toBe(true);
      expect(compareGreekStrings("Νέα Ιωνία / Νέα Φιλαδέλφεια", "ΝΕΑ ΙΩΝΙΑ ΝΕΑ ΦΙΛΑΔΕΛΦΕΙΑ")).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("returns true for empty strings", () => {
      expect(compareGreekStrings("", "")).toBe(true);
    });

    it("returns true for strings with only spaces", () => {
      expect(compareGreekStrings("   ", "")).toBe(true);
      expect(compareGreekStrings(" ", "  ")).toBe(true);
    });

    it("returns true for strings with only special characters", () => {
      expect(compareGreekStrings("!@#$", "")).toBe(true);
      expect(compareGreekStrings("- _ / ( )", "")).toBe(true);
    });

    it("returns false when one string is empty", () => {
      expect(compareGreekStrings("Νομός Ξάνθης", "")).toBe(false);
      expect(compareGreekStrings("", "Αθήνα")).toBe(false);
    });

    it("returns false when content actually differs", () => {
      expect(compareGreekStrings("Νομός Αθηνών", "Αθηνών")).toBe(false);
      expect(compareGreekStrings("ΔΟΥ ΘΕΣΣΑΛΟΝΙΚΗΣ Α1", "ΔΟΥ ΘΕΣΣΑΛΟΝΙΚΗΣ Α2")).toBe(false);
      expect(compareGreekStrings("ΔΟΥ ΘΕΣΣΑΛΟΝΙΚΗΣ Α'", "ΔΟΥ ΘΕΣΣΑΛΟΝΙΚΗΣ Α")).toBe(false);
    });
  });

  describe("Greek vs Latin characters", () => {
    it("returns false when Greek and Latin characters are mixed incorrectly", () => {
      expect(compareGreekStrings("Α", "A")).toBe(false); // Greek A vs Latin A
      expect(compareGreekStrings("Β", "B")).toBe(false); // Greek B vs Latin B
      expect(compareGreekStrings("Ε", "E")).toBe(false); // Greek E vs Latin E
      expect(compareGreekStrings("Νομός ΞAΝθης", "Νομός Ξάνθης")).toBe(false); // A is Latin
    });
  });

  describe("numbers and mixed content", () => {
    it("compares strings with numbers correctly", () => {
      expect(compareGreekStrings("ΔΟΥ Α1", "δου α1")).toBe(true);
      expect(compareGreekStrings("123", "123")).toBe(true);
    });

    it("returns false when numbers differ", () => {
      expect(compareGreekStrings("Α1", "Α2")).toBe(false);
      expect(compareGreekStrings("123", "456")).toBe(false);
    });

    it("handles apostrophes correctly", () => {
      expect(compareGreekStrings("Α'", "Α'")).toBe(true);
      expect(compareGreekStrings("Α'", "Α")).toBe(false);
    });
  });

  describe("combining multiple transformations", () => {
    it("handles all transformations together", () => {
      expect(compareGreekStrings(" Ή πρό-ταση αυ@τή (είναι) ίδια! ", "ΗΠΡΟΤΑΣΗΑΥΤΗΕΙΝΑΙΙΔΙΑ")).toBe(true);
      expect(compareGreekStrings("@Θεσσαλία@ - #Λάρισα#", "ΘΕΣΣΑΛΙΑ ΛΑΡΙΣΑ")).toBe(true);
      expect(compareGreekStrings("Μακεδονία!! %%Θεσσαλονίκη%%", "ΜΑΚΕΔΟΝΙΑ ΘΕΣΣΑΛΟΝΙΚΗ")).toBe(true);
    });
  });
});
