import { formatWeight } from "./formatWeight";

describe("formatWeight", () => {
  //  Pounds
  it("returns single pound string", () => {
    const expectedGrData = "1 λίβρα";
    const expectedEnData = "1 pound";

    expect(formatWeight(1, { type: "pound" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "pound", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "pound", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple pounds string", () => {
    const expectedGrData = "2 λίβρες";
    const expectedEnData = "2 pounds";

    expect(formatWeight(2, { type: "pound" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "pound", locale: "el", format: "full" })).toBe(expectedGrData);
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
    expect(formatWeight(2, { type: "pound", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Centigrams
  it("returns single centigram string", () => {
    const expectedGrData = "1 εκατοστόγραμμο";
    const expectedEnData = "1 centigram";

    expect(formatWeight(1, { type: "centigram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "centigram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "centigram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple centigrams string", () => {
    const expectedGrData = "2 εκατοστόγραμμα";
    const expectedEnData = "2 centigrams";

    expect(formatWeight(2, { type: "centigram" })).toBe(expectedGrData);
    expect(formatWeight(2, { type: "centigram", locale: "el", format: "full" })).toBe(expectedGrData);
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
    expect(formatWeight(2, { type: "centigram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Carats
  it("returns single carat string", () => {
    const expectedGrData = "1 καράτι";
    const expectedEnData = "1 carat";

    expect(formatWeight(1, { type: "carat" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "carat", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "carat", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple carats string", () => {
    const expectedGrData = "5 καράτια";
    const expectedEnData = "5 carats";

    expect(formatWeight(5, { type: "carat" })).toBe(expectedGrData);
    expect(formatWeight(5, { type: "carat", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(5, { type: "carat", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns carats with short string", () => {
    const expectedData = "5 ct";

    expect(formatWeight(5, { type: "carat", format: "short" })).toBe(expectedData);
    expect(formatWeight(5, { type: "carat", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(5, { type: "carat", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns carats string with international symbol appended", () => {
    const expectedGrData = "5 καράτια (ct)";
    const expectedEnData = "5 carats (ct)";

    expect(formatWeight(5, { type: "carat", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(5, { type: "carat", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Drams
  it("returns single dram string", () => {
    const expectedGrData = "1 δράμι";
    const expectedEnData = "1 dram";

    expect(formatWeight(1, { type: "dram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "dram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "dram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple drams string", () => {
    const expectedGrData = "3 δράμια";
    const expectedEnData = "3 drams";

    expect(formatWeight(3, { type: "dram" })).toBe(expectedGrData);
    expect(formatWeight(3, { type: "dram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(3, { type: "dram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns drams with short string", () => {
    const expectedData = "3 dr";

    expect(formatWeight(3, { type: "dram", format: "short" })).toBe(expectedData);
    expect(formatWeight(3, { type: "dram", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(3, { type: "dram", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns drams string with international symbol appended", () => {
    const expectedGrData = "3 δράμια (dr)";
    const expectedEnData = "3 drams (dr)";

    expect(formatWeight(3, { type: "dram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(3, { type: "dram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Grams
  it("returns single gram string", () => {
    const expectedGrData = "1 γραμμάριο";
    const expectedEnData = "1 gram";

    expect(formatWeight(1, { type: "gram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "gram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "gram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple grams string", () => {
    const expectedGrData = "100 γραμμάρια";
    const expectedEnData = "100 grams";

    expect(formatWeight(100, { type: "gram" })).toBe(expectedGrData);
    expect(formatWeight(100, { type: "gram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(100, { type: "gram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns grams with short string", () => {
    const expectedData = "100 g";

    expect(formatWeight(100, { type: "gram", format: "short" })).toBe(expectedData);
    expect(formatWeight(100, { type: "gram", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(100, { type: "gram", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns grams string with international symbol appended", () => {
    const expectedGrData = "100 γραμμάρια (g)";
    const expectedEnData = "100 grams (g)";

    expect(formatWeight(100, { type: "gram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(100, { type: "gram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Grains
  it("returns single grain string", () => {
    const expectedGrData = "1 κόκκος";
    const expectedEnData = "1 grain";

    expect(formatWeight(1, { type: "grain" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "grain", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "grain", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple grains string", () => {
    const expectedGrData = "10 κόκκους";
    const expectedEnData = "10 grains";

    expect(formatWeight(10, { type: "grain" })).toBe(expectedGrData);
    expect(formatWeight(10, { type: "grain", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(10, { type: "grain", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns grains with short string", () => {
    const expectedData = "10 gr";

    expect(formatWeight(10, { type: "grain", format: "short" })).toBe(expectedData);
    expect(formatWeight(10, { type: "grain", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(10, { type: "grain", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns grains string with international symbol appended", () => {
    const expectedGrData = "10 κόκκους (gr)";
    const expectedEnData = "10 grains (gr)";

    expect(formatWeight(10, { type: "grain", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(10, { type: "grain", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Hectograms
  it("returns single hectogram string", () => {
    const expectedGrData = "1 εκατόγραμμο";
    const expectedEnData = "1 hectogram";

    expect(formatWeight(1, { type: "hectogram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "hectogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "hectogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple hectograms string", () => {
    const expectedGrData = "5 εκατόγραμμα";
    const expectedEnData = "5 hectograms";

    expect(formatWeight(5, { type: "hectogram" })).toBe(expectedGrData);
    expect(formatWeight(5, { type: "hectogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(5, { type: "hectogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns hectograms with short string", () => {
    const expectedData = "5 hg";

    expect(formatWeight(5, { type: "hectogram", format: "short" })).toBe(expectedData);
    expect(formatWeight(5, { type: "hectogram", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(5, { type: "hectogram", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns hectograms string with international symbol appended", () => {
    const expectedGrData = "5 εκατόγραμμα (hg)";
    const expectedEnData = "5 hectograms (hg)";

    expect(formatWeight(5, { type: "hectogram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(5, { type: "hectogram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Kilograms
  it("returns single kilogram string", () => {
    const expectedGrData = "1 κιλό";
    const expectedEnData = "1 kilogram";

    expect(formatWeight(1, { type: "kilogram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple kilograms string", () => {
    const expectedGrData = "50 κιλά";
    const expectedEnData = "50 kilograms";

    expect(formatWeight(50, { type: "kilogram" })).toBe(expectedGrData);
    expect(formatWeight(50, { type: "kilogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(50, { type: "kilogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns kilograms with short string", () => {
    const expectedData = "50 kg";

    expect(formatWeight(50, { type: "kilogram", format: "short" })).toBe(expectedData);
    expect(formatWeight(50, { type: "kilogram", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(50, { type: "kilogram", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns kilograms string with international symbol appended", () => {
    const expectedGrData = "50 κιλά (kg)";
    const expectedEnData = "50 kilograms (kg)";

    expect(formatWeight(50, { type: "kilogram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(50, { type: "kilogram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Kilonewtons
  it("returns single kilonewton string", () => {
    const expectedGrData = "1 κιλονιούτον";
    const expectedEnData = "1 kilonewton";

    expect(formatWeight(1, { type: "kilonewton" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilonewton", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "kilonewton", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple kilonewtons string", () => {
    const expectedGrData = "20 κιλονιούτον";
    const expectedEnData = "20 kilonewtons";

    expect(formatWeight(20, { type: "kilonewton" })).toBe(expectedGrData);
    expect(formatWeight(20, { type: "kilonewton", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(20, { type: "kilonewton", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns kilonewtons with short string", () => {
    const expectedData = "20 kN";

    expect(formatWeight(20, { type: "kilonewton", format: "short" })).toBe(expectedData);
    expect(formatWeight(20, { type: "kilonewton", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(20, { type: "kilonewton", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns kilonewtons string with international symbol appended", () => {
    const expectedGrData = "20 κιλονιούτον (kN)";
    const expectedEnData = "20 kilonewtons (kN)";

    expect(formatWeight(20, { type: "kilonewton", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(20, { type: "kilonewton", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Milligrams
  it("returns single milligram string", () => {
    const expectedGrData = "1 χιλιοστόγραμμο";
    const expectedEnData = "1 milligram";

    expect(formatWeight(1, { type: "milligram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "milligram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "milligram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple milligrams string", () => {
    const expectedGrData = "500 χιλιοστόγραμμα";
    const expectedEnData = "500 milligrams";

    expect(formatWeight(500, { type: "milligram" })).toBe(expectedGrData);
    expect(formatWeight(500, { type: "milligram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(500, { type: "milligram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns milligrams with short string", () => {
    const expectedData = "500 mg";

    expect(formatWeight(500, { type: "milligram", format: "short" })).toBe(expectedData);
    expect(formatWeight(500, { type: "milligram", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(500, { type: "milligram", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns milligrams string with international symbol appended", () => {
    const expectedGrData = "500 χιλιοστόγραμμα (mg)";
    const expectedEnData = "500 milligrams (mg)";

    expect(formatWeight(500, { type: "milligram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(500, { type: "milligram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Nanograms
  it("returns single nanogram string", () => {
    const expectedGrData = "1 νανογραμμάριο";
    const expectedEnData = "1 nanogram";

    expect(formatWeight(1, { type: "nanogram" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "nanogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "nanogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple nanograms string", () => {
    const expectedGrData = "1000 νανογραμμάρια";
    const expectedEnData = "1000 nanograms";

    expect(formatWeight(1000, { type: "nanogram" })).toBe(expectedGrData);
    expect(formatWeight(1000, { type: "nanogram", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1000, { type: "nanogram", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns nanograms with short string", () => {
    const expectedData = "1000 ng";

    expect(formatWeight(1000, { type: "nanogram", format: "short" })).toBe(expectedData);
    expect(formatWeight(1000, { type: "nanogram", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(1000, { type: "nanogram", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns nanograms string with international symbol appended", () => {
    const expectedGrData = "1000 νανογραμμάρια (ng)";
    const expectedEnData = "1000 nanograms (ng)";

    expect(formatWeight(1000, { type: "nanogram", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(1000, { type: "nanogram", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Ounces
  it("returns single ounce string", () => {
    const expectedGrData = "1 ουγγιά";
    const expectedEnData = "1 ounce";

    expect(formatWeight(1, { type: "ounce" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ounce", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ounce", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple ounces string", () => {
    const expectedGrData = "16 ουγγιές";
    const expectedEnData = "16 ounces";

    expect(formatWeight(16, { type: "ounce" })).toBe(expectedGrData);
    expect(formatWeight(16, { type: "ounce", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(16, { type: "ounce", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns ounces with short string", () => {
    const expectedData = "16 oz";

    expect(formatWeight(16, { type: "ounce", format: "short" })).toBe(expectedData);
    expect(formatWeight(16, { type: "ounce", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(16, { type: "ounce", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns ounces string with international symbol appended", () => {
    const expectedGrData = "16 ουγγιές (oz)";
    const expectedEnData = "16 ounces (oz)";

    expect(formatWeight(16, { type: "ounce", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(16, { type: "ounce", locale: "en", withInternational: true })).toBe(expectedEnData);
  });

  // Tons
  it("returns single ton string", () => {
    const expectedGrData = "1 τόνος";
    const expectedEnData = "1 ton";

    expect(formatWeight(1, { type: "ton" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ton", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(1, { type: "ton", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns multiple tons string", () => {
    const expectedGrData = "10 τόνοι";
    const expectedEnData = "10 tons";

    expect(formatWeight(10, { type: "ton" })).toBe(expectedGrData);
    expect(formatWeight(10, { type: "ton", locale: "el", format: "full" })).toBe(expectedGrData);
    expect(formatWeight(10, { type: "ton", locale: "en", format: "full" })).toBe(expectedEnData);
  });

  it("returns tons with short string", () => {
    const expectedData = "10 t";

    expect(formatWeight(10, { type: "ton", format: "short" })).toBe(expectedData);
    expect(formatWeight(10, { type: "ton", locale: "el", format: "short" })).toBe(expectedData);
    expect(formatWeight(10, { type: "ton", format: "short", locale: "en" })).toBe(expectedData);
  });

  it("returns tons string with international symbol appended", () => {
    const expectedGrData = "10 τόνοι (t)";
    const expectedEnData = "10 tons (t)";

    expect(formatWeight(10, { type: "ton", withInternational: true })).toBe(expectedGrData);
    expect(formatWeight(10, { type: "ton", locale: "en", withInternational: true })).toBe(expectedEnData);
  });
});
