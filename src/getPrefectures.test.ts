import { getPrefectures, allPrefectures, prefecturesWithoutMountAthos } from "./getPrefectures";

// TODO: add more tests for edge cases, error handling, and specific prefecture data validation
describe("getPrefectures", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = prefecturesWithoutMountAthos.el;

    expect(getPrefectures()).toEqual(expectedData);
    expect(getPrefectures({ locale: "el" })).toEqual(expectedData);
    expect(getPrefectures({ includeMountAthos: false })).toEqual(expectedData);
    expect(getPrefectures({ locale: "el", includeMountAthos: false })).toEqual(expectedData);
    expect(getPrefectures().length).toBe(54);
  });

  it("correctly returns data including Mount Athos (in greek language)", () => {
    const expectedData = allPrefectures.el;

    expect(getPrefectures({ includeMountAthos: true })).toEqual(expectedData);
    expect(getPrefectures({ locale: "el", includeMountAthos: true })).toEqual(expectedData);
    expect(getPrefectures({ includeMountAthos: true }).length).toBe(55);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = prefecturesWithoutMountAthos.en;

    expect(getPrefectures({ locale: "en" })).toEqual(expectedData);
    expect(getPrefectures({ locale: "en", includeMountAthos: false })).toEqual(expectedData);
    expect(getPrefectures().length).toBe(54);
  });

  it("correctly returns data including Mount Athos (in english language)", () => {
    const expectedData = allPrefectures.en;

    expect(getPrefectures({ locale: "en", includeMountAthos: true })).toEqual(expectedData);
    expect(getPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(55);
  });
});
