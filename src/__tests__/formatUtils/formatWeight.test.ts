import { formatWeight } from "../../formatUtils";

describe("formatWeight", () => {
  //  Pounds
  it("returns single pound string", () => {
    const expectedGrData = "1 λίβρα";
    const expectedEnData = "1 pound";

    expect(formatWeight(1, { type: "pound" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "pound", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "pound", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "pound", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "pound", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple pounds string", () => {
    const expectedGrData = "2 λίβρες";
    const expectedEnData = "2 pounds";

    expect(formatWeight(2, { type: "pound" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "pound", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "pound", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "pound", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "pound", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple pounds with short string", () => {
    const expectedGrData = "2 lb";
    const expectedEnData = "2 lb";

    expect(formatWeight(2, { type: "pound", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "pound", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "pound", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple pounds string with international symbol appended", () => {
    const expectedGrData = "2 λίβρες (lb)";
    const expectedEnData = "2 pounds (lb)";

    expect(formatWeight(2, { type: "pound", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "pound", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "pound", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Centigrams
  it("returns single centigram string", () => {
    const expectedGrData = "1 εκατοστόγραμμο";
    const expectedEnData = "1 centigram";

    expect(formatWeight(1, { type: "centigram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "centigram", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "centigram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "centigram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "centigram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple centigrams string", () => {
    const expectedGrData = "2 εκατοστόγραμμα";
    const expectedEnData = "2 centigrams";

    expect(formatWeight(2, { type: "centigram" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "centigram", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "centigram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "centigram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "centigram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple centigrams with short string", () => {
    const expectedGrData = "2 cg";
    const expectedEnData = "2 cg";

    expect(formatWeight(2, { type: "centigram", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "centigram", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "centigram", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple centigrams string with international symbol appended", () => {
    const expectedGrData = "2 εκατοστόγραμμα (cg)";
    const expectedEnData = "2 centigrams (cg)";

    expect(formatWeight(2, { type: "centigram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "centigram", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "centigram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Carats
  it("returns single carat string", () => {
    const expectedGrData = "1 καράτι";
    const expectedEnData = "1 carat";

    expect(formatWeight(1, { type: "carat" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "carat", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "carat", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "carat", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "carat", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple carats string", () => {
    const expectedGrData = "2 καράτια";
    const expectedEnData = "2 carats";

    expect(formatWeight(2, { type: "carat" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "carat", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "carat", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "carat", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "carat", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple carats with short string", () => {
    const expectedGrData = "2 ct";
    const expectedEnData = "2 ct";

    expect(formatWeight(2, { type: "carat", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "carat", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "carat", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple carats string with international symbol appended", () => {
    const expectedGrData = "2 καράτια (ct)";
    const expectedEnData = "2 carats (ct)";

    expect(formatWeight(2, { type: "carat", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "carat", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "carat", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Drams
  it("returns single dram string", () => {
    const expectedGrData = "1 δράμι";
    const expectedEnData = "1 dram";

    expect(formatWeight(1, { type: "dram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "dram", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "dram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "dram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "dram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple drams string", () => {
    const expectedGrData = "2 δράμια";
    const expectedEnData = "2 drams";

    expect(formatWeight(2, { type: "dram" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "dram", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "dram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "dram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "dram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple drams with short string", () => {
    const expectedGrData = "2 dr";
    const expectedEnData = "2 dr";

    expect(formatWeight(2, { type: "dram", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "dram", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "dram", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple drams string with international symbol appended", () => {
    const expectedGrData = "2 δράμια (dr)";
    const expectedEnData = "2 drams (dr)";

    expect(formatWeight(2, { type: "dram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "dram", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "dram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Grams
  it("returns single gram string", () => {
    const expectedGrData = "1 γραμμάριο";
    const expectedEnData = "1 gram";

    expect(formatWeight(1, { type: "gram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "gram", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "gram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "gram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "gram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple grams string", () => {
    const expectedGrData = "2 γραμμάρια";
    const expectedEnData = "2 grams";

    expect(formatWeight(2, { type: "gram" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "gram", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "gram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "gram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "gram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple grams with short string", () => {
    const expectedGrData = "2 g";
    const expectedEnData = "2 g";

    expect(formatWeight(2, { type: "gram", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "gram", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "gram", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple grams string with international symbol appended", () => {
    const expectedGrData = "2 γραμμάρια (g)";
    const expectedEnData = "2 grams (g)";

    expect(formatWeight(2, { type: "gram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "gram", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "gram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Grains
  it("returns single grain string", () => {
    const expectedGrData = "1 κόκκος";
    const expectedEnData = "1 grain";

    expect(formatWeight(1, { type: "grain" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "grain", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "grain", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "grain", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "grain", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple grains string", () => {
    const expectedGrData = "2 κόκκους";
    const expectedEnData = "2 grains";

    expect(formatWeight(2, { type: "grain" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "grain", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "grain", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "grain", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "grain", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple grains with short string", () => {
    const expectedGrData = "2 gr";
    const expectedEnData = "2 gr";

    expect(formatWeight(2, { type: "grain", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "grain", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "grain", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple grains string with international symbol appended", () => {
    const expectedGrData = "2 κόκκους (gr)";
    const expectedEnData = "2 grains (gr)";

    expect(formatWeight(2, { type: "grain", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "grain", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "grain", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Hectograms
  it("returns single hectogram string", () => {
    const expectedGrData = "1 εκατόγραμμο";
    const expectedEnData = "1 hectogram";

    expect(formatWeight(1, { type: "hectogram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "hectogram", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "hectogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "hectogram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "hectogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple hectograms string", () => {
    const expectedGrData = "2 εκατόγραμμα";
    const expectedEnData = "2 hectograms";

    expect(formatWeight(2, { type: "hectogram" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "hectogram", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "hectogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "hectogram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "hectogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple hectograms with short string", () => {
    const expectedGrData = "2 hg";
    const expectedEnData = "2 hg";

    expect(formatWeight(2, { type: "hectogram", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "hectogram", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "hectogram", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple hectograms string with international symbol appended", () => {
    const expectedGrData = "2 εκατόγραμμα (hg)";
    const expectedEnData = "2 hectograms (hg)";

    expect(formatWeight(2, { type: "hectogram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "hectogram", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "hectogram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Kilograms
  it("returns single kilogram string", () => {
    const expectedGrData = "1 κιλό";
    const expectedEnData = "1 kilogram";

    expect(formatWeight(1, { type: "kilogram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilogram", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilogram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "kilogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple kilograms string", () => {
    const expectedGrData = "2 κιλά";
    const expectedEnData = "2 kilograms";

    expect(formatWeight(2, { type: "kilogram" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilogram", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilogram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "kilogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple kilograms with short string", () => {
    const expectedGrData = "2 kg";
    const expectedEnData = "2 kg";

    expect(formatWeight(2, { type: "kilogram", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilogram", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilogram", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple kilograms string with international symbol appended", () => {
    const expectedGrData = "2 κιλά (kg)";
    const expectedEnData = "2 kilograms (kg)";

    expect(formatWeight(2, { type: "kilogram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilogram", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilogram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Kilonewtons
  it("returns single kilonewton string", () => {
    const expectedGrData = "1 κιλονιούτον";
    const expectedEnData = "1 kilonewton";

    expect(formatWeight(1, { type: "kilonewton" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilonewton", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilonewton", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilonewton", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "kilonewton", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple kilonewtons string", () => {
    const expectedGrData = "2 κιλονιούτον";
    const expectedEnData = "2 kilonewtons";

    expect(formatWeight(2, { type: "kilonewton" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilonewton", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilonewton", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilonewton", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "kilonewton", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple kilonewtons with short string", () => {
    const expectedGrData = "2 kN";
    const expectedEnData = "2 kN";

    expect(formatWeight(2, { type: "kilonewton", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilonewton", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilonewton", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple kilonewtons string with international symbol appended", () => {
    const expectedGrData = "2 κιλονιούτον (kN)";
    const expectedEnData = "2 kilonewtons (kN)";

    expect(formatWeight(2, { type: "kilonewton", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilonewton", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "kilonewton", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Milligrams
  it("returns single milligram string", () => {
    const expectedGrData = "1 χιλιοστόγραμμο";
    const expectedEnData = "1 milligram";

    expect(formatWeight(1, { type: "milligram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "milligram", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "milligram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "milligram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "milligram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple milligrams string", () => {
    const expectedGrData = "2 χιλιοστόγραμμα";
    const expectedEnData = "2 milligrams";

    expect(formatWeight(2, { type: "milligram" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "milligram", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "milligram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "milligram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "milligram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple milligrams with short string", () => {
    const expectedGrData = "2 mg";
    const expectedEnData = "2 mg";

    expect(formatWeight(2, { type: "milligram", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "milligram", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "milligram", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple milligrams string with international symbol appended", () => {
    const expectedGrData = "2 χιλιοστόγραμμα (mg)";
    const expectedEnData = "2 milligrams (mg)";

    expect(formatWeight(2, { type: "milligram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "milligram", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "milligram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Nanogram
  it("returns single nanogram string", () => {
    const expectedGrData = "1 νανογραμμάριο";
    const expectedEnData = "1 nanogram";

    expect(formatWeight(1, { type: "nanogram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "nanogram", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "nanogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "nanogram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "nanogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple nanograms string", () => {
    const expectedGrData = "2 νανογραμμάρια";
    const expectedEnData = "2 nanograms";

    expect(formatWeight(2, { type: "nanogram" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "nanogram", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "nanogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "nanogram", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "nanogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple nanograms with short string", () => {
    const expectedGrData = "2 ng";
    const expectedEnData = "2 ng";

    expect(formatWeight(2, { type: "nanogram", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "nanogram", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "nanogram", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple nanograms string with international symbol appended", () => {
    const expectedGrData = "2 νανογραμμάρια (ng)";
    const expectedEnData = "2 nanograms (ng)";

    expect(formatWeight(2, { type: "nanogram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "nanogram", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "nanogram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Ounces
  it("returns single ounce string", () => {
    const expectedGrData = "1 ουγγιά";
    const expectedEnData = "1 ounce";

    expect(formatWeight(1, { type: "ounce" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ounce", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ounce", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ounce", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "ounce", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple ounces string", () => {
    const expectedGrData = "2 ουγγιές";
    const expectedEnData = "2 ounces";

    expect(formatWeight(2, { type: "ounce" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ounce", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ounce", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ounce", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "ounce", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple ounces with short string", () => {
    const expectedGrData = "2 oz";
    const expectedEnData = "2 oz";

    expect(formatWeight(2, { type: "ounce", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ounce", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ounce", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple ounces string with international symbol appended", () => {
    const expectedGrData = "2 ουγγιές (oz)";
    const expectedEnData = "2 ounces (oz)";

    expect(formatWeight(2, { type: "ounce", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ounce", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ounce", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Tons
  it("returns single ton string", () => {
    const expectedGrData = "1 τόνος";
    const expectedEnData = "1 ton";

    expect(formatWeight(1, { type: "ton" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ton", locale: "el" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ton", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ton", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(1, { type: "ton", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple tons string", () => {
    const expectedGrData = "2 τόνοι";
    const expectedEnData = "2 tons";

    expect(formatWeight(2, { type: "ton" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ton", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ton", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ton", locale: "en" })).toBe(expectedEnData);
    expect(formatWeight(2, { type: "ton", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple tons with short string", () => {
    const expectedGrData = "2 t";
    const expectedEnData = "2 t";

    expect(formatWeight(2, { type: "ton", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ton", locale: "el", format: "short" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ton", format: "short", locale: "en" })).toBe(expectedEnData);
  });

  it("returns multiple tons string with international symbol appended", () => {
    const expectedGrData = "2 τόνοι (t)";
    const expectedEnData = "2 tons (t)";

    expect(formatWeight(2, { type: "ton", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ton", locale: "el", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "ton", locale: "en", withInternational: true })).toBe(expectedEnData);
  });
});
