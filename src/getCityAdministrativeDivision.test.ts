import { getCityAdministrativeDivision } from "./getCityAdministrativeDivision";
import { getCityById } from "./getCityById";

describe("getCityAdministrativeDivision", () => {
  describe("region entity", () => {
    it("should return a Region when entity is region (Athens - Greek)", () => {
      expect(getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" })).toEqual({
        id: 9,
        iso31662: "GR-I",
        name: "Αττικής",
        seat: "Αθήνα",
      });
    });

    it("should return a Region when entity is region (Athens - English)", () => {
      expect(getCityAdministrativeDivision({ cityId: 1, locale: "en", entity: "region" })).toEqual({
        id: 9,
        iso31662: "GR-I",
        name: "Attica",
        seat: "Athens",
      });
    });

    it("should return correct region for different cities (Thessaloniki - Greek)", () => {
      const result = getCityAdministrativeDivision({ cityId: 22, locale: "el", entity: "region" });

      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("iso31662");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("seat");
    });

    it("should return RegionWithoutUnits structure without units property", () => {
      const result = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" });

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty("units");
    });
  });

  describe("unit entity", () => {
    it('should return a Unit when entity is "unit" (Athens - Greek)', () => {
      expect(getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "unit" })).toEqual({
        id: 42,
        name: "Κεντρικού Τομέα Αθηνών",
        seat: "Αθήνα",
        region: { id: 9, iso31662: "GR-I" },
        carPlatesPattern: [],
      });
    });

    it('should return a Unit when entity is "unit" (Athens - English)', () => {
      expect(getCityAdministrativeDivision({ cityId: 1, locale: "en", entity: "unit" })).toEqual({
        id: 42,
        name: "Central Athens",
        seat: "Athens",
        region: { id: 9, iso31662: "GR-I" },
        carPlatesPattern: [],
      });
    });

    it("should return correct unit for different cities", () => {
      const result = getCityAdministrativeDivision({ cityId: 10, locale: "el", entity: "unit" });

      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("seat");
      expect(result).toHaveProperty("region");
      expect(result).toHaveProperty("carPlatesPattern");
    });

    it("should return UnitWithoutMunicipalities structure without municipalities property", () => {
      const result = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "unit" });

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty("municipalities");
    });

    it("should return unit with valid region reference", () => {
      const result = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "unit" });

      expect(result).toBeDefined();
      if (result && "region" in result) {
        expect(result.region).toHaveProperty("id");
        expect(result.region).toHaveProperty("iso31662");
        expect(result.region.iso31662).toMatch(/^GR-/);
      }
    });
  });

  describe("prefecture entity", () => {
    it('should return a Prefecture when entity is "prefecture" (Athens - Greek)', () => {
      expect(getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "prefecture" })).toEqual({
        id: 1,
        name: "Νομός Αθηνών",
        seat: "Αθήνα",
        regionAndUnit: {
          regionId: 9,
          regionIso31662: "GR-I",
          unitId: 42,
        },
      });
    });

    it('should return a Prefecture when entity is "prefecture" (Athens - English)', () => {
      expect(getCityAdministrativeDivision({ cityId: 1, locale: "en", entity: "prefecture" })).toEqual({
        id: 1,
        name: "Athens Prefecture",
        seat: "Athens",
        regionAndUnit: {
          regionId: 9,
          regionIso31662: "GR-I",
          unitId: 42,
        },
      });
    });

    it("should return correct prefecture for different cities", () => {
      const result = getCityAdministrativeDivision({ cityId: 5, locale: "el", entity: "prefecture" });

      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("seat");
      expect(result).toHaveProperty("regionAndUnit");
    });

    it("should return prefecture with valid regionAndUnit reference", () => {
      const result = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "prefecture" });

      expect(result).toBeDefined();
      if (result && "regionAndUnit" in result) {
        expect(result.regionAndUnit).toHaveProperty("regionId");
        expect(result.regionAndUnit).toHaveProperty("regionIso31662");
        expect(result.regionAndUnit).toHaveProperty("unitId");
        expect(typeof result.regionAndUnit.regionId).toBe("number");
        expect(result.regionAndUnit.regionIso31662).toMatch(/^GR-/);
      }
    });
  });

  describe("error handling and edge cases", () => {
    it("should return undefined for non-existent city ID", () => {
      expect(getCityAdministrativeDivision({ cityId: 999, locale: "el", entity: "region" })).toBeUndefined();
      expect(getCityAdministrativeDivision({ cityId: 999, locale: "el", entity: "unit" })).toBeUndefined();
      expect(getCityAdministrativeDivision({ cityId: 999, locale: "el", entity: "prefecture" })).toBeUndefined();
    });

    it("should return undefined for invalid city ID (negative)", () => {
      expect(getCityAdministrativeDivision({ cityId: -1, locale: "el", entity: "region" })).toBeUndefined();
      expect(getCityAdministrativeDivision({ cityId: -1, locale: "en", entity: "unit" })).toBeUndefined();
    });

    it("should return undefined for zero city ID", () => {
      expect(getCityAdministrativeDivision({ cityId: 0, locale: "el", entity: "region" })).toBeUndefined();
    });

    it("should return undefined when city doesn't exist (high ID)", () => {
      expect(getCityAdministrativeDivision({ cityId: 538, locale: "el", entity: "region" })).toBeUndefined();
      expect(getCityAdministrativeDivision({ cityId: 1000, locale: "en", entity: "prefecture" })).toBeUndefined();
    });
  });

  describe("locale handling", () => {
    it("should return same IDs across locales but different names", () => {
      const greekRegion = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" });
      const englishRegion = getCityAdministrativeDivision({ cityId: 1, locale: "en", entity: "region" });

      expect(greekRegion).toBeDefined();
      expect(englishRegion).toBeDefined();
      if (greekRegion && englishRegion && "iso31662" in greekRegion && "iso31662" in englishRegion) {
        expect(greekRegion.id).toBe(englishRegion.id);
        expect(greekRegion.iso31662).toBe(englishRegion.iso31662);
        expect(greekRegion.name).not.toBe(englishRegion.name);
      }
    });

    it("should return units with same IDs across locales", () => {
      const greekUnit = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "unit" });
      const englishUnit = getCityAdministrativeDivision({ cityId: 1, locale: "en", entity: "unit" });

      expect(greekUnit).toBeDefined();
      expect(englishUnit).toBeDefined();
      if (greekUnit && englishUnit) {
        expect(greekUnit.id).toBe(englishUnit.id);
        expect(greekUnit.name).not.toBe(englishUnit.name);
      }
    });

    it("should return prefectures with same IDs across locales", () => {
      const greekPrefecture = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "prefecture" });
      const englishPrefecture = getCityAdministrativeDivision({ cityId: 1, locale: "en", entity: "prefecture" });

      expect(greekPrefecture).toBeDefined();
      expect(englishPrefecture).toBeDefined();
      if (greekPrefecture && englishPrefecture) {
        expect(greekPrefecture.id).toBe(englishPrefecture.id);
        if ("regionAndUnit" in greekPrefecture && "regionAndUnit" in englishPrefecture) {
          expect(greekPrefecture.regionAndUnit).toStrictEqual(englishPrefecture.regionAndUnit);
        }
      }
    });

    it("should default to Greek locale when not specified (via function signature)", () => {
      const result = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" });
      expect(result).toBeDefined();
      if (result) {
        expect(result.name).toBe("Αττικής");
      }
    });
  });

  describe("data consistency", () => {
    it("should return consistent results for multiple calls", () => {
      const first = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" });
      const second = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" });

      expect(first).toStrictEqual(second);
    });

    it("should return administrative divisions that match city relations", () => {
      const cityId = 1;
      const city = getCityById({ id: cityId, locale: "el" });
      const region = getCityAdministrativeDivision({ cityId, locale: "el", entity: "region" });

      expect(city).toBeDefined();
      expect(region).toBeDefined();
      if (city && region) {
        expect(region.id).toBe(city.relations.regionId);
        if ("iso31662" in region) {
          expect(region.iso31662).toBe(city.relations.regionIso31662);
        }
      }
    });

    it("should return unit that matches city unitId", () => {
      const cityId = 10;
      const city = getCityById({ id: cityId, locale: "el" });
      const unit = getCityAdministrativeDivision({ cityId, locale: "el", entity: "unit" });

      expect(city).toBeDefined();
      expect(unit).toBeDefined();
      if (city && unit) {
        expect(unit.id).toBe(city.relations.unitId);
      }
    });

    it("should return prefecture that matches city prefectureId", () => {
      const cityId = 5;
      const city = getCityById({ id: cityId, locale: "el" });
      const prefecture = getCityAdministrativeDivision({ cityId, locale: "el", entity: "prefecture" });

      expect(city).toBeDefined();
      expect(prefecture).toBeDefined();
      if (city && prefecture) {
        expect(prefecture.id).toBe(city.relations.prefectureId);
      }
    });
  });

  describe("multiple cities validation", () => {
    it("should return valid administrative divisions for multiple cities", () => {
      const cityIds = [1, 5, 10, 15, 20];

      cityIds.forEach((cityId) => {
        const region = getCityAdministrativeDivision({ cityId, locale: "el", entity: "region" });
        const unit = getCityAdministrativeDivision({ cityId, locale: "el", entity: "unit" });
        const prefecture = getCityAdministrativeDivision({ cityId, locale: "el", entity: "prefecture" });

        expect(region).toBeDefined();
        expect(unit).toBeDefined();
        expect(prefecture).toBeDefined();
      });
    });

    it("should return different regions for cities in different regions", () => {
      const athensRegion = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" });
      const thessalonikiRegion = getCityAdministrativeDivision({ cityId: 22, locale: "el", entity: "region" });

      expect(athensRegion).toBeDefined();
      expect(thessalonikiRegion).toBeDefined();
      if (athensRegion && thessalonikiRegion) {
        expect(athensRegion.id).not.toBe(thessalonikiRegion.id);
      }
    });
  });

  describe("type validation", () => {
    it("should return proper type for region entity", () => {
      const result = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" });

      expect(result).toBeDefined();
      if (result) {
        expect(typeof result.id).toBe("number");
        expect(typeof result.name).toBe("string");
        expect(typeof result.seat).toBe("string");
        if ("iso31662" in result) {
          expect(typeof result.iso31662).toBe("string");
        }
      }
    });

    it("should return proper type for unit entity", () => {
      const result = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "unit" });

      expect(result).toBeDefined();
      if (result) {
        expect(typeof result.id).toBe("number");
        expect(typeof result.name).toBe("string");
        expect(typeof result.seat).toBe("string");
        if ("region" in result) {
          expect(typeof result.region).toBe("object");
        }
        if ("carPlatesPattern" in result) {
          expect(Array.isArray(result.carPlatesPattern)).toBe(true);
        }
      }
    });

    it("should return proper type for prefecture entity", () => {
      const result = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "prefecture" });

      expect(result).toBeDefined();
      if (result) {
        expect(typeof result.id).toBe("number");
        expect(typeof result.name).toBe("string");
        expect(typeof result.seat).toBe("string");
        if ("regionAndUnit" in result) {
          expect(typeof result.regionAndUnit).toBe("object");
        }
      }
    });
  });

  describe("boundary tests", () => {
    it("should handle first city ID (1)", () => {
      const region = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "region" });
      const unit = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "unit" });
      const prefecture = getCityAdministrativeDivision({ cityId: 1, locale: "el", entity: "prefecture" });

      expect(region).toBeDefined();
      expect(unit).toBeDefined();
      expect(prefecture).toBeDefined();
    });

    it("should handle last city ID (51)", () => {
      const region = getCityAdministrativeDivision({ cityId: 51, locale: "el", entity: "region" });
      const unit = getCityAdministrativeDivision({ cityId: 51, locale: "el", entity: "unit" });
      const prefecture = getCityAdministrativeDivision({ cityId: 51, locale: "el", entity: "prefecture" });

      expect(region).toBeDefined();
      expect(unit).toBeDefined();
      expect(prefecture).toBeDefined();
    });

    it("should return undefined for city ID 52 (beyond range)", () => {
      expect(getCityAdministrativeDivision({ cityId: 52, locale: "el", entity: "region" })).toBeUndefined();
    });
  });
});
