import { prefectures, prefecturesWithoutMountAthos } from "./prefectures";
import { getPrefectures, getPrefectureById } from "../";

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

describe("getPrefectureById", () => {
  it("correctly returns prefecture with default values (in greek language)", () => {
    const expectedData = prefecturesWithoutMountAthos.el[0];

    expect(getPrefectureById({ id: 1 })).toBe(expectedData);
    expect(getPrefectureById({ id: 1, locale: "el" })).toBe(expectedData);
    expect(getPrefectureById({ id: 1, includeMountAthos: false })).toBe(expectedData);
    // all default options
    expect(getPrefectureById({ id: 1, locale: "el", includeMountAthos: false })).toBe(expectedData);
  });

  it("correctly returns Mount Athos prefecture (in greek language)", () => {
    const expectedData = prefectures.el[54];

    expect(getPrefectureById({ id: 55, includeMountAthos: true })).toBe(expectedData);
    expect(getPrefectureById({ id: 55, locale: "el", includeMountAthos: true })).toBe(expectedData);
  });

  it("correctly returns prefecture (in english language)", () => {
    const expectedData = prefecturesWithoutMountAthos.en[33];

    expect(getPrefectureById({ id: 34, locale: "en" })).toBe(expectedData);
    expect(getPrefectureById({ id: 34, locale: "en", includeMountAthos: false })).toBe(expectedData);
  });

  it("correctly returns Mount Athos prefecture (in english language)", () => {
    const expectedData = prefectures.en[54];

    expect(getPrefectureById({ id: 55, locale: "en", includeMountAthos: true })).toBe(expectedData);
  });
});
