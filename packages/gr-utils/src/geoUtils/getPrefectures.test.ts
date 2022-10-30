import { prefectures, prefecturesWithMountAthos } from "../../data/geospatial";
import { getPrefectures } from "./getPrefectures";

describe("getPrefectures", () => {
  it("get all prefectures of Greece (in greek language)", () => {
    expect(getPrefectures()).toBe(prefectures.el);
    expect(getPrefectures({ locale: "el" })).toBe(prefectures.el);
    expect(getPrefectures({ includeMountAthos: false })).toBe(prefectures.el);
    expect(getPrefectures({ locale: "el", includeMountAthos: false })).toBe(prefectures.el);
    expect(getPrefectures().length).toBe(54);
  });

  it("get all prefectures of Greece including Mount Athos (in greek language)", () => {
    expect(getPrefectures({ includeMountAthos: true })).toBe(prefecturesWithMountAthos.el);
    expect(getPrefectures({ locale: "el", includeMountAthos: true })).toBe(prefecturesWithMountAthos.el);
    expect(getPrefectures({ includeMountAthos: true }).length).toBe(55);
  });

  it("get all prefectures of Greece (in english language)", () => {
    expect(getPrefectures({ locale: "en" })).toBe(prefectures.en);
    expect(getPrefectures({ locale: "en", includeMountAthos: false })).toBe(prefectures.en);
    expect(getPrefectures({ locale: "en" }).length).toBe(54);
  });

  it("get all prefectures of Greece including Mount Athos (in english language)", () => {
    expect(getPrefectures({ locale: "en", includeMountAthos: true })).toBe(prefecturesWithMountAthos.en);
    expect(getPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(55);
  });
});
