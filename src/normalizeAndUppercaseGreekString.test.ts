import { normalizeAndUppercaseGreekString } from "./normalizeAndUppercaseGreekString";

describe("normalizeAndUppercaseGreekString", () => {
  describe("basic functionality", () => {
    it("converts simple greek text to uppercase", () => {
      expect(normalizeAndUppercaseGreekString("αβγδε")).toEqual("ΑΒΓΔΕ");
      expect(normalizeAndUppercaseGreekString("ΑΒΓΔΕ")).toEqual("ΑΒΓΔΕ");
      expect(normalizeAndUppercaseGreekString("ΑβΓδΕ")).toEqual("ΑΒΓΔΕ");
    });

    it("removes spaces from text", () => {
      expect(normalizeAndUppercaseGreekString("Καλημέρα σε όλους")).toEqual("ΚΑΛΗΜΕΡΑΣΕΟΛΟΥΣ");
      expect(normalizeAndUppercaseGreekString("  Ελλάδα  ")).toEqual("ΕΛΛΑΔΑ");
      expect(normalizeAndUppercaseGreekString("Α Β Γ Δ Ε")).toEqual("ΑΒΓΔΕ");
    });
  });

  describe("accent removal", () => {
    it("removes acute accents (tonos) from lowercase vowels", () => {
      expect(normalizeAndUppercaseGreekString("ά")).toEqual("Α");
      expect(normalizeAndUppercaseGreekString("έ")).toEqual("Ε");
      expect(normalizeAndUppercaseGreekString("ή")).toEqual("Η");
      expect(normalizeAndUppercaseGreekString("ί")).toEqual("Ι");
      expect(normalizeAndUppercaseGreekString("ό")).toEqual("Ο");
      expect(normalizeAndUppercaseGreekString("ύ")).toEqual("Υ");
      expect(normalizeAndUppercaseGreekString("ώ")).toEqual("Ω");
    });

    it("removes acute accents (tonos) from uppercase vowels", () => {
      expect(normalizeAndUppercaseGreekString("Ά")).toEqual("Α");
      expect(normalizeAndUppercaseGreekString("Έ")).toEqual("Ε");
      expect(normalizeAndUppercaseGreekString("Ή")).toEqual("Η");
      expect(normalizeAndUppercaseGreekString("Ί")).toEqual("Ι");
      expect(normalizeAndUppercaseGreekString("Ό")).toEqual("Ο");
      expect(normalizeAndUppercaseGreekString("Ύ")).toEqual("Υ");
      expect(normalizeAndUppercaseGreekString("Ώ")).toEqual("Ω");
    });

    it("removes diaeresis (dialytika) from iota", () => {
      expect(normalizeAndUppercaseGreekString("ϊ")).toEqual("Ι");
      expect(normalizeAndUppercaseGreekString("Ϊ")).toEqual("Ι");
      expect(normalizeAndUppercaseGreekString("ΐ")).toEqual("Ι"); // iota with dialytika and tonos
    });

    it("removes diaeresis (dialytika) from upsilon", () => {
      expect(normalizeAndUppercaseGreekString("ϋ")).toEqual("Υ");
      expect(normalizeAndUppercaseGreekString("Ϋ")).toEqual("Υ");
      expect(normalizeAndUppercaseGreekString("ΰ")).toEqual("Υ"); // upsilon with dialytika and tonos
    });

    it("handles mixed accented text", () => {
      expect(normalizeAndUppercaseGreekString("Καλησπέρα")).toEqual("ΚΑΛΗΣΠΕΡΑ");
      expect(normalizeAndUppercaseGreekString("Αθήνα")).toEqual("ΑΘΗΝΑ");
      expect(normalizeAndUppercaseGreekString("Ελλάδα")).toEqual("ΕΛΛΑΔΑ");
      expect(normalizeAndUppercaseGreekString("Θεσσαλονίκη")).toEqual("ΘΕΣΣΑΛΟΝΙΚΗ");
    });
  });

  describe("special character removal", () => {
    it("removes hyphens and underscores", () => {
      expect(normalizeAndUppercaseGreekString("Άγιος-Νικόλαος")).toEqual("ΑΓΙΟΣΝΙΚΟΛΑΟΣ");
      expect(normalizeAndUppercaseGreekString("test_value")).toEqual("TESTVALUE");
      expect(normalizeAndUppercaseGreekString("α-β-γ")).toEqual("ΑΒΓ");
    });

    it("removes forward slashes", () => {
      expect(normalizeAndUppercaseGreekString("Α/Α")).toEqual("ΑΑ");
      expect(normalizeAndUppercaseGreekString("test/path/here")).toEqual("TESTPATHHERE");
    });

    it("removes parentheses", () => {
      expect(normalizeAndUppercaseGreekString("Αθήνα (Κέντρο)")).toEqual("ΑΘΗΝΑΚΕΝΤΡΟ");
      expect(normalizeAndUppercaseGreekString("(test)")).toEqual("TEST");
    });

    it("removes common special characters", () => {
      expect(normalizeAndUppercaseGreekString("!@#$%^&*()")).toEqual("");
      expect(normalizeAndUppercaseGreekString("Α!Β@Γ#Δ$Ε%")).toEqual("ΑΒΓΔΕ");
    });

    it("preserves periods and other non-removed characters", () => {
      expect(normalizeAndUppercaseGreekString("Καλησπέρα.")).toEqual("ΚΑΛΗΣΠΕΡΑ.");
      expect(normalizeAndUppercaseGreekString("Α.Β.Γ.")).toEqual("Α.Β.Γ.");
    });
  });

  describe("complex real-world scenarios", () => {
    it("handles tax office names", () => {
      expect(normalizeAndUppercaseGreekString("ΔΟΥ Ξάνθης")).toEqual("ΔΟΥΞΑΝΘΗΣ");
      expect(normalizeAndUppercaseGreekString("Δ.Ο.Υ. ΘΕΣΣΑΛΟΝΙΚΗΣ Α'")).toEqual("Δ.Ο.Υ.ΘΕΣΣΑΛΟΝΙΚΗΣΑ'");
    });

    it("handles prefecture names", () => {
      expect(normalizeAndUppercaseGreekString("Νομός Αθηνών")).toEqual("ΝΟΜΟΣΑΘΗΝΩΝ");
      expect(normalizeAndUppercaseGreekString("Περιφέρεια Κρήτης")).toEqual("ΠΕΡΙΦΕΡΕΙΑΚΡΗΤΗΣ");
    });

    it("handles region names with special characters", () => {
      expect(normalizeAndUppercaseGreekString("@Θεσσαλία@ - #Λάρισα#")).toEqual("ΘΕΣΣΑΛΙΑΛΑΡΙΣΑ");
      expect(normalizeAndUppercaseGreekString("Μακεδονία!! %%Θεσσαλονίκη%%")).toEqual("ΜΑΚΕΔΟΝΙΑΘΕΣΣΑΛΟΝΙΚΗ");
    });

    it("handles municipality names", () => {
      expect(normalizeAndUppercaseGreekString("Δήμος Χαλκίδας")).toEqual("ΔΗΜΟΣΧΑΛΚΙΔΑΣ");
      expect(normalizeAndUppercaseGreekString("/$Δήμος Χ@αλκίδας!")).toEqual("ΔΗΜΟΣΧΑΛΚΙΔΑΣ");
      expect(normalizeAndUppercaseGreekString("!Δ#ή$μ%ο^ς& Χ*α(λκίδας!")).toEqual("ΔΗΜΟΣΧΑΛΚΙΔΑΣ");
    });

    it("handles sentences with multiple spaces", () => {
      expect(normalizeAndUppercaseGreekString("Καλησπέρα σε όλους.")).toEqual("ΚΑΛΗΣΠΕΡΑΣΕΟΛΟΥΣ.");
      expect(normalizeAndUppercaseGreekString(" Η πρόταση αυτή είναι ίδια ")).toEqual("ΗΠΡΟΤΑΣΗΑΥΤΗΕΙΝΑΙΙΔΙΑ");
    });
  });

  describe("edge cases", () => {
    it("handles empty string", () => {
      expect(normalizeAndUppercaseGreekString("")).toEqual("");
    });

    it("handles string with only spaces", () => {
      expect(normalizeAndUppercaseGreekString("   ")).toEqual("");
      expect(normalizeAndUppercaseGreekString("     ")).toEqual("");
    });

    it("handles string with only special characters", () => {
      expect(normalizeAndUppercaseGreekString("!@#$%^&*()")).toEqual("");
      expect(normalizeAndUppercaseGreekString("- _ / ( )")).toEqual("");
    });

    it("handles single character", () => {
      expect(normalizeAndUppercaseGreekString("α")).toEqual("Α");
      expect(normalizeAndUppercaseGreekString("ά")).toEqual("Α");
      expect(normalizeAndUppercaseGreekString("Ω")).toEqual("Ω");
    });

    it("handles already uppercase text without accents", () => {
      expect(normalizeAndUppercaseGreekString("ΑΒΓΔΕ")).toEqual("ΑΒΓΔΕ");
      expect(normalizeAndUppercaseGreekString("ΕΛΛΑΔΑ")).toEqual("ΕΛΛΑΔΑ");
    });

    it("handles numbers", () => {
      expect(normalizeAndUppercaseGreekString("123")).toEqual("123");
      expect(normalizeAndUppercaseGreekString("ΔΟΥ Α1")).toEqual("ΔΟΥΑ1");
      expect(normalizeAndUppercaseGreekString("Α' 123 Β'")).toEqual("Α'123Β'");
    });

    it("handles mixed Greek and Latin characters", () => {
      expect(normalizeAndUppercaseGreekString("GreekΕλληνικά")).toEqual("GREEKΕΛΛΗΝΙΚΑ");
      expect(normalizeAndUppercaseGreekString("test Δοκιμή")).toEqual("TESTΔΟΚΙΜΗ");
    });

    it("handles text with consecutive special characters", () => {
      expect(normalizeAndUppercaseGreekString("Α---Β")).toEqual("ΑΒ");
      expect(normalizeAndUppercaseGreekString("Γ///Δ")).toEqual("ΓΔ");
      expect(normalizeAndUppercaseGreekString("Ε   Ζ")).toEqual("ΕΖ");
    });
  });

  describe("all Greek letters", () => {
    it("handles complete Greek alphabet", () => {
      const lowercase = "αβγδεζηθικλμνξοπρστυφχψω";
      const uppercase = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";

      expect(normalizeAndUppercaseGreekString(lowercase)).toEqual(uppercase);
    });

    it("handles sigma variants", () => {
      expect(normalizeAndUppercaseGreekString("σ")).toEqual("Σ");
      expect(normalizeAndUppercaseGreekString("ς")).toEqual("Σ");
      expect(normalizeAndUppercaseGreekString("Σ")).toEqual("Σ");
    });
  });

  describe("combining scenarios", () => {
    it("handles all transformations together", () => {
      expect(normalizeAndUppercaseGreekString(" Ή πρό-ταση αυ@τή (είναι) ίδια! ")).toEqual("ΗΠΡΟΤΑΣΗΑΥΤΗΕΙΝΑΙΙΔΙΑ");
      expect(normalizeAndUppercaseGreekString("Νέα Ιωνία / Νέα Φιλαδέλφεια")).toEqual("ΝΕΑΙΩΝΙΑΝΕΑΦΙΛΑΔΕΛΦΕΙΑ");
    });
  });
});
