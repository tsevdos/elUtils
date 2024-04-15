import { convertsGreekTextToComparableUpperCase, compareGreekStrings } from "../languageUtils";

describe("convertsGreekTextToComparableUpperCase", () => {
  it("Sanity equality", () => {
    expect(compareGreekStrings("Α", "Α")).toBe(true);
  });

  it("Caps equality", () => {
    expect(compareGreekStrings("α", "Α")).toBe(true);
  });

  it("Hyphen equility", () => {
    expect(compareGreekStrings("Ά", "Α")).toBe(true);
  });

  it("Caps and Hyphen", () => {
    expect(compareGreekStrings("ά", "Α")).toBe(true);
  });

  it("A,B sanity", () => {
    expect(compareGreekStrings("Α", "B")).toBe(false);
  });

  it("Latin Greek sanity", () => {
    expect(compareGreekStrings("Α", "A")).toBe(false); //eng and greek
  });

  it("With spaces", () => {
    expect(compareGreekStrings(" Η πρόταση αυτή είναι ίδια ", "Ηπρότασηαυτήείναιίδια")).toBe(true);
  });

  it("With Multiple hyphens", () => {
    expect(compareGreekStrings("Η πρόταση αυτή είναι ίδια", "Η ΠΡΟΤΑΣΗ ΑΥΤΗ ΕΙΝΑΙ ΙΔΙΑ")).toBe(true);
  });

  it("With Special character", () => {
    expect(compareGreekStrings("Η-πρόταση_αυτή-είναι-ίδια", "Η ΠΡΟΤΑΣΗ ΑΥΤΗ ΕΙΝΑΙ ΙΔΙΑ")).toBe(true);
  });

  it("correctly converts greek text to Uppercase, by removing accented and special characters", () => {
    expect(convertsGreekTextToComparableUpperCase("Καλησπέρα σε όλους.")).toEqual("ΚΑΛΗΣΠΕΡΑΣΕΟΛΟΥΣ.");
    expect(convertsGreekTextToComparableUpperCase("ΔΟΥ Ξάνθης")).toEqual("ΔΟΥΞΑΝΘΗΣ");
    expect(convertsGreekTextToComparableUpperCase("Νομός Αθηνών")).toEqual("ΝΟΜΟΣΑΘΗΝΩΝ");
    expect(convertsGreekTextToComparableUpperCase("@Θεσσαλία@ - #Λάρισα#")).toEqual("ΘΕΣΣΑΛΙΑΛΑΡΙΣΑ");
    expect(convertsGreekTextToComparableUpperCase("Μακεδονία!! %%Θεσσαλονίκη%%")).toEqual("ΜΑΚΕΔΟΝΙΑΘΕΣΣΑΛΟΝΙΚΗ");
  });
});

describe("compareGreekStrings", () => {
  it("correctly compare greek strings", () => {
    // True
    expect(compareGreekStrings("ΔΟΥ Ξάνθης", "ΔΟΥ ΞΑΝΘΗΣ")).toBeTruthy();
    expect(compareGreekStrings("Νομός Αθηνών", "%Νομός Αθηνών%")).toBeTruthy();

    // False
    expect(compareGreekStrings("Νομός Αθηνών", "Αθηνών")).toBeFalsy();

    // please add more tests
  });
});
