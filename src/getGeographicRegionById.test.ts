import { getGeographicRegionById } from "./getGeographicRegionById";
import { getGeographicRegions } from "./getGeographicRegions";

const greekGeographicRegions = getGeographicRegions({ locale: "el" });
const englishGeographicRegions = getGeographicRegions({ locale: "en" });

describe("getGeographicRegionById:", () => {
  describe("default behavior", () => {
    it("correctly returns geographic region with default values (in greek language)", () => {
      const expectedData = greekGeographicRegions[4];

      expect(getGeographicRegionById({ id: 5 })).toEqual(expectedData);
      expect(getGeographicRegionById({ id: 5, locale: "el" })).toEqual(expectedData);
    });

    it("should return geographic region with all required properties", () => {
      const region = getGeographicRegionById({ id: 1 });

      expect(region).toBeDefined();
      expect(region).toHaveProperty("id");
      expect(region).toHaveProperty("name");
      expect(region).toHaveProperty("seat");
      expect(region).toHaveProperty("administrativeRegions");
    });
  });

  describe("locale handling", () => {
    it("correctly returns geographic region by id (in greek language)", () => {
      const expectedData = greekGeographicRegions[4];

      expect(getGeographicRegionById({ id: 5, locale: "el" })).toEqual(expectedData);
    });

    it("correctly returns geographic region by id (in english language)", () => {
      const expectedData = englishGeographicRegions[4];

      expect(getGeographicRegionById({ id: 5, locale: "en" })).toEqual(expectedData);
    });

    it("should return same region ID across locales but different names", () => {
      const greekRegion = getGeographicRegionById({ id: 1, locale: "el" });
      const englishRegion = getGeographicRegionById({ id: 1, locale: "en" });

      expect(greekRegion).toBeDefined();
      expect(englishRegion).toBeDefined();
      if (greekRegion && englishRegion) {
        expect(greekRegion.id).toBe(englishRegion.id);
        expect(greekRegion.name).not.toBe(englishRegion.name);
        expect(greekRegion.administrativeRegions).toStrictEqual(englishRegion.administrativeRegions);
      }
    });
  });

  describe("error handling and edge cases", () => {
    it("should return undefined for non-existent geographic region ID", () => {
      expect(getGeographicRegionById({ id: 999 })).toBeUndefined();
      expect(getGeographicRegionById({ id: 9999, locale: "en" })).toBeUndefined();
    });

    it("should return undefined for negative ID", () => {
      expect(getGeographicRegionById({ id: -1 })).toBeUndefined();
      expect(getGeographicRegionById({ id: -100, locale: "el" })).toBeUndefined();
    });

    it("should return undefined for zero ID", () => {
      expect(getGeographicRegionById({ id: 0 })).toBeUndefined();
      expect(getGeographicRegionById({ id: 0, locale: "en" })).toBeUndefined();
    });
  });

  describe("boundary tests", () => {
    it("should handle first geographic region ID (1)", () => {
      const region = getGeographicRegionById({ id: 1 });

      expect(region).toBeDefined();
      expect(region?.id).toBe(1);
    });

    it("should handle last geographic region ID (9)", () => {
      const region = getGeographicRegionById({ id: 9 });

      expect(region).toBeDefined();
      expect(region?.id).toBe(9);
    });

    it("should return undefined for ID beyond valid range", () => {
      expect(getGeographicRegionById({ id: 10 })).toBeUndefined();
      expect(getGeographicRegionById({ id: 10, locale: "en" })).toBeUndefined();
    });
  });

  describe("data structure validation", () => {
    it("should return geographic region with valid administrativeRegions array", () => {
      const region = getGeographicRegionById({ id: 5 });

      expect(region).toBeDefined();
      expect(Array.isArray(region?.administrativeRegions)).toBe(true);
      expect(region?.administrativeRegions.length).toBeGreaterThan(0);

      region?.administrativeRegions.forEach((adminRegion) => {
        expect(adminRegion).toHaveProperty("id");
        expect(adminRegion).toHaveProperty("iso31662");
      });
    });
  });
});
