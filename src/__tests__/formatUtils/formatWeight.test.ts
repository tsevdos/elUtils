import { formatWeight, WeightTypes } from "../../formatUtils";

const testSingleValue = (typeWeight: WeightTypes, expectedGrData: string, expectedEnData: string) => {
  expect(formatWeight(1, { type: typeWeight })).toBe(expectedGrData);
  expect(formatWeight(1, { type: typeWeight, locale: "el", format: "full" })).toBe(expectedGrData);
  expect(formatWeight(1, { type: typeWeight, locale: "en", format: "full" })).toBe(expectedEnData);
};

const testPluralValue = (typeWeight: WeightTypes, expectedGrData: string, expectedEnData: string) => {
  expect(formatWeight(2, { type: typeWeight })).toBe(expectedGrData);
  expect(formatWeight(2, { type: typeWeight, locale: "el", format: "full" })).toBe(expectedGrData);
  expect(formatWeight(2, { type: typeWeight, locale: "en", format: "full" })).toBe(expectedEnData);
};

const testValueWithShortString = (typeWeight: WeightTypes, expectedGrData: string, expectedEnData: string) => {
  expect(formatWeight(2, { type: typeWeight, format: "short" })).toBe(expectedGrData);
  expect(formatWeight(2, { type: typeWeight, locale: "el", format: "short" })).toBe(expectedGrData);
  expect(formatWeight(2, { type: typeWeight, format: "short", locale: "en" })).toBe(expectedEnData);
};

const testValueWithInternational = (typeWeight: WeightTypes, expectedGrData: string, expectedEnData: string) => {
  expect(formatWeight(2, { type: typeWeight, withInternational: true })).toBe(expectedGrData);
  expect(formatWeight(2, { type: typeWeight, locale: "en", withInternational: true })).toBe(expectedEnData);
};

describe("formatWeight", () => {
  //  Pounds
  it("returns single pound string", () => {
    const expectedGrData = "1 λίβρα";
    const expectedEnData = "1 pound";

    testSingleValue("pound", expectedGrData, expectedEnData);
  });

  it("returns multiple pounds string", () => {
    const expectedGrData = "2 λίβρες";
    const expectedEnData = "2 pounds";

    testPluralValue("pound", expectedGrData, expectedEnData);
  });

  it("returns multiple pounds with short string", () => {
    const expectedGrData = "2 lb";
    const expectedEnData = "2 lb";

    testValueWithShortString("pound", expectedGrData, expectedEnData);
  });

  it("returns multiple pounds string with international symbol appended", () => {
    const expectedGrData = "2 λίβρες (lb)";
    const expectedEnData = "2 pounds (lb)";

    testValueWithInternational("pound", expectedGrData, expectedEnData);
  });

  // Centigrams
  it("returns single centigram string", () => {
    const expectedGrData = "1 εκατοστόγραμμο";
    const expectedEnData = "1 centigram";

    testSingleValue("centigram", expectedGrData, expectedEnData);
  });

  it("returns multiple centigrams string", () => {
    const expectedGrData = "2 εκατοστόγραμμα";
    const expectedEnData = "2 centigrams";

    testPluralValue("centigram", expectedGrData, expectedEnData);
  });

  it("returns multiple centigrams with short string", () => {
    const expectedGrData = "2 cg";
    const expectedEnData = "2 cg";

    testValueWithShortString("centigram", expectedGrData, expectedEnData);
  });

  it("returns multiple centigrams string with international symbol appended", () => {
    const expectedGrData = "2 εκατοστόγραμμα (cg)";
    const expectedEnData = "2 centigrams (cg)";

    testValueWithInternational("centigram", expectedGrData, expectedEnData);
  });
});
