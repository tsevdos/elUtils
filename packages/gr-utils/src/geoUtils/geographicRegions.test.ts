import { geographicRegions } from "./geographicRegions";
import { getGeographicRegions, getGeographicRegionById } from "..";

describe("getGeographicRegions", () => {
  it("correctly returns all geographic regions in greek language", () => {
    const expectedData = geographicRegions.el;

    expect(getGeographicRegions()).toBe(expectedData);
    expect(getGeographicRegions({ locale: "el" })).toBe(expectedData);
    expect(getGeographicRegions().length).toBe(9);
  });

  it("correctly returns all geographic regions in english language", () => {
    const expectedData = geographicRegions.en;

    expect(getGeographicRegions({ locale: "en" })).toBe(expectedData);
    expect(getGeographicRegions().length).toBe(9);
  });
});

describe("getGeographicRegionById", () => {
  it("correctly returns geographic region by id (in greek language)", () => {
    const expectedData = geographicRegions.el[4];

    expect(getGeographicRegionById({ id: 5 })).toBe(expectedData);
    expect(getGeographicRegionById({ id: 5, locale: "el" })).toBe(expectedData);
  });

  it("correctly returns geographic region by id (in english language)", () => {
    const expectedData = geographicRegions.en[4];

    expect(getGeographicRegionById({ id: 5, locale: "en" })).toBe(expectedData);
  });
});
