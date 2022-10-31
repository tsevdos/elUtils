import { regionsWithPrefectures, regionsWithPrefecturesAndMountAthos } from "../../data/geospatial";
import { getRegionsWithPrefectures } from "./getRegionsWithPrefectures";

describe("getRegionsWithPrefectures", () => {
  it("get all regions with prefectures of Greece (in greek language)", () => {
    expect(getRegionsWithPrefectures()).toBe(regionsWithPrefectures.el);
    expect(getRegionsWithPrefectures({ locale: "el" })).toBe(regionsWithPrefectures.el);
    expect(getRegionsWithPrefectures({ includeMountAthos: false })).toBe(regionsWithPrefectures.el);
    expect(getRegionsWithPrefectures({ locale: "el", includeMountAthos: false })).toBe(regionsWithPrefectures.el);
    expect(getRegionsWithPrefectures().length).toBe(13);
  });

  it("get all regions with prefectures of Greece including Mount Athos (in greek language)", () => {
    expect(getRegionsWithPrefectures({ includeMountAthos: true })).toBe(regionsWithPrefecturesAndMountAthos.el);
    expect(getRegionsWithPrefectures({ locale: "el", includeMountAthos: true })).toBe(
      regionsWithPrefecturesAndMountAthos.el,
    );
    expect(getRegionsWithPrefectures({ includeMountAthos: true }).length).toBe(14);
  });

  it("get all regions with prefectures of Greece (in english language)", () => {
    expect(getRegionsWithPrefectures({ locale: "en" })).toBe(regionsWithPrefectures.en);
    expect(getRegionsWithPrefectures({ locale: "en", includeMountAthos: false })).toBe(regionsWithPrefectures.en);
    expect(getRegionsWithPrefectures({ locale: "en" }).length).toBe(13);
  });

  it("get all regions with prefectures of Greece including Mount Athos (in english language)", () => {
    expect(getRegionsWithPrefectures({ locale: "en", includeMountAthos: true })).toBe(
      regionsWithPrefecturesAndMountAthos.en,
    );
    expect(getRegionsWithPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(14);
  });
});
