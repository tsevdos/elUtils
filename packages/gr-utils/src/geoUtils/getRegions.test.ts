import { regions, regionsWithMountAthos } from "../../data/geospatial";
import { getRegions } from "./getRegions";

describe("getRegions", () => {
  it("get all regions of Greece (in greek language)", () => {
    expect(getRegions()).toBe(regions.el);
    expect(getRegions({ locale: "el" })).toBe(regions.el);
    expect(getRegions({ includeMountAthos: false })).toBe(regions.el);
    expect(getRegions({ locale: "el", includeMountAthos: false })).toBe(regions.el);
    expect(getRegions().length).toBe(13);
  });

  it("get all regions of Greece including Mount Athos (in greek language)", () => {
    expect(getRegions({ includeMountAthos: true })).toBe(regionsWithMountAthos.el);
    expect(getRegions({ locale: "el", includeMountAthos: true })).toBe(regionsWithMountAthos.el);
    expect(getRegions({ includeMountAthos: true }).length).toBe(14);
  });

  it("get all regions of Greece (in english language)", () => {
    expect(getRegions({ locale: "en" })).toBe(regions.en);
    expect(getRegions({ locale: "en", includeMountAthos: false })).toBe(regions.en);
    expect(getRegions({ locale: "en" }).length).toBe(13);
  });

  it("get all regions of Greece including Mount Athos (in english language)", () => {
    expect(getRegions({ locale: "en", includeMountAthos: true })).toBe(regionsWithMountAthos.en);
    expect(getRegions({ locale: "en", includeMountAthos: true }).length).toBe(14);
  });
});
