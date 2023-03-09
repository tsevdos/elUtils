import { prefectures, prefecturesWithoutMountAthos } from "./prefectures";
import { getPrefectures } from "../";

describe("getPrefectures", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = prefecturesWithoutMountAthos.el;

    expect(getPrefectures()).toBe(expectedData);
    expect(getPrefectures({ locale: "el" })).toBe(expectedData);
    expect(getPrefectures({ includeMountAthos: false })).toBe(expectedData);
    expect(getPrefectures({ locale: "el", includeMountAthos: false })).toBe(expectedData);
    expect(getPrefectures().length).toBe(54);
  });

  it("correctly returns data including Mount Athos (in greek language)", () => {
    const expectedData = prefectures.el;

    expect(getPrefectures({ includeMountAthos: true })).toBe(expectedData);
    expect(getPrefectures({ locale: "el", includeMountAthos: true })).toBe(expectedData);
    expect(getPrefectures({ includeMountAthos: true }).length).toBe(55);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = prefecturesWithoutMountAthos.en;

    expect(getPrefectures({ locale: "en" })).toBe(expectedData);
    expect(getPrefectures({ locale: "en", includeMountAthos: false })).toBe(expectedData);
    expect(getPrefectures().length).toBe(54);
  });

  it("correctly returns data including Mount Athos (in english language)", () => {
    const expectedData = prefectures.en;

    expect(getPrefectures({ locale: "en", includeMountAthos: true })).toBe(expectedData);
    expect(getPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(55);
  });
});
