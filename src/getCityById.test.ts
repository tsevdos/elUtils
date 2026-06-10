import { getCityById } from "./getCityById";
import { getCities } from "./getCities";

const citiesEl = getCities({ locale: "el" });
const citiesEn = getCities({ locale: "en" });

describe("getCityById", () => {
  describe("default behavior", () => {
    it("correctly returns city by id with default locale (greek)", () => {
      const city = getCityById({ id: 24 });

      expect(city).toEqual(citiesEl[23]);
      expect(city).toBeDefined();
      expect(city?.id).toBe(24);
    });

    it("correctly returns city by id explicitly specifying greek locale", () => {
      expect(getCityById({ id: 24, locale: "el" })).toEqual(citiesEl[23]);
    });
  });

  describe("locale handling", () => {
    it("correctly returns city by id (in english language)", () => {
      expect(getCityById({ id: 24, locale: "en" })).toEqual(citiesEn[23]);
    });

    it("returns same city ID across locales but different names", () => {
      const greekCity = getCityById({ id: 1, locale: "el" });
      const englishCity = getCityById({ id: 1, locale: "en" });

      expect(greekCity?.id).toBe(englishCity?.id);
      expect(greekCity?.id).toBe(1);
      // Names should be different (Athens vs Αθήνα)
      expect(greekCity?.name).not.toBe(englishCity?.name);
    });

    it("returns cities with same coordinates across locales", () => {
      const greekCity = getCityById({ id: 10, locale: "el" });
      const englishCity = getCityById({ id: 10, locale: "en" });

      expect(greekCity?.coordinates).toStrictEqual(englishCity?.coordinates);
    });

    it("returns cities with same relations across locales", () => {
      const greekCity = getCityById({ id: 15, locale: "el" });
      const englishCity = getCityById({ id: 15, locale: "en" });

      expect(greekCity?.relations).toStrictEqual(englishCity?.relations);
    });
  });

  describe("edge cases and error handling", () => {
    it("returns undefined for non-existent city ID", () => {
      expect(getCityById({ id: 999 })).toBeUndefined();
      expect(getCityById({ id: 9999, locale: "el" })).toBeUndefined();
      expect(getCityById({ id: 9999, locale: "en" })).toBeUndefined();
    });

    it("returns undefined for negative ID", () => {
      expect(getCityById({ id: -1 })).toBeUndefined();
      expect(getCityById({ id: -100, locale: "el" })).toBeUndefined();
    });

    it("returns undefined for zero ID", () => {
      expect(getCityById({ id: 0 })).toBeUndefined();
      expect(getCityById({ id: 0, locale: "en" })).toBeUndefined();
    });

    it("handles boundary IDs correctly", () => {
      // ID 1 should exist (Athens)
      const firstCity = getCityById({ id: 1 });
      expect(firstCity).toBeDefined();
      expect(firstCity?.id).toBe(1);

      // ID 51 should exist (last city)
      const lastCity = getCityById({ id: 51 });
      expect(lastCity).toBeDefined();
      expect(lastCity?.id).toBe(51);

      // ID 52 should not exist
      expect(getCityById({ id: 52 })).toBeUndefined();
    });
  });

  describe("data structure validation", () => {
    it("returns city with all required properties", () => {
      const city = getCityById({ id: 5 });

      expect(city).toBeDefined();
      if (city) {
        expect(city).toHaveProperty("id");
        expect(city).toHaveProperty("name");
        expect(city).toHaveProperty("coordinates");
        expect(city).toHaveProperty("relations");
      }
    });

    it("returns city with valid coordinates array", () => {
      const city = getCityById({ id: 8 });

      expect(city).toBeDefined();
      if (city) {
        expect(Array.isArray(city.coordinates)).toBe(true);
        expect(city.coordinates.length).toBe(2);
        expect(typeof city.coordinates[0]).toBe("number");
        expect(typeof city.coordinates[1]).toBe("number");
      }
    });

    it("returns city with valid relations object", () => {
      const city = getCityById({ id: 12 });

      expect(city).toBeDefined();
      if (city) {
        expect(city.relations).toHaveProperty("regionId");
        expect(city.relations).toHaveProperty("regionIso31662");
        expect(city.relations).toHaveProperty("unitId");
        expect(city.relations).toHaveProperty("municipalityId");
        expect(city.relations).toHaveProperty("prefectureId");
        expect(typeof city.relations.regionId).toBe("number");
        expect(typeof city.relations.regionIso31662).toBe("string");
      }
    });
  });

  describe("specific cities verification", () => {
    it("returns Athens (ID 1) with correct data in Greek", () => {
      const athens = getCityById({ id: 1, locale: "el" });

      expect(athens).toBeDefined();
      if (athens) {
        expect(athens.id).toBe(1);
        expect(athens.name).toBe("Αθήνα");
        expect(athens.coordinates.length).toBe(2);
        expect(athens.relations.regionId).toBeGreaterThan(0);
      }
    });

    it("returns Athens (ID 1) with correct data in English", () => {
      const athens = getCityById({ id: 1, locale: "en" });

      expect(athens).toBeDefined();
      if (athens) {
        expect(athens.id).toBe(1);
        expect(athens.name).toBe("Athens");
        expect(athens.coordinates.length).toBe(2);
        expect(athens.relations.regionId).toBeGreaterThan(0);
      }
    });

    it("returns different city objects for different IDs", () => {
      const city1 = getCityById({ id: 1 });
      const city2 = getCityById({ id: 2 });

      expect(city1).toBeDefined();
      expect(city2).toBeDefined();
      if (city1 && city2) {
        expect(city1.id).not.toBe(city2.id);
        expect(city1.name).not.toBe(city2.name);
      }
    });
  });

  describe("consistency checks", () => {
    it("returns consistent results for multiple calls with same ID", () => {
      const first = getCityById({ id: 20 });
      const second = getCityById({ id: 20 });

      expect(first).toStrictEqual(second);
    });

    it("matches data from getCities for the same index", () => {
      const cityById = getCityById({ id: 10 });
      const cityFromList = citiesEl.find((c) => c.id === 10);

      expect(cityById).toStrictEqual(cityFromList);
    });

    it("all valid IDs from 1 to 51 return defined cities", () => {
      for (let id = 1; id <= 51; id++) {
        const city = getCityById({ id });
        expect(city).toBeDefined();
        expect(city?.id).toBe(id);
      }
    });

    it("returned city matches the same city from getCities array", () => {
      const testIds = [1, 10, 25, 40, 51];

      testIds.forEach((id) => {
        const cityById = getCityById({ id, locale: "el" });
        const cityFromArray = citiesEl.find((c) => c.id === id);

        expect(cityById).toStrictEqual(cityFromArray);
      });
    });
  });

  describe("type safety", () => {
    it("returns City type or undefined", () => {
      const existingCity = getCityById({ id: 1 });
      const nonExistingCity = getCityById({ id: 999 });

      // TypeScript should allow these without type errors
      expect(existingCity === undefined || typeof existingCity.id === "number").toBe(true);
      expect(nonExistingCity).toBeUndefined();
    });
  });
});
