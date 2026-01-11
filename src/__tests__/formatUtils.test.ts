import { describe, it, expect } from "vitest";
import { formatWeight } from "../formatUtils";

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
});
