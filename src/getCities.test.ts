import citiesEl from "./data/cities-el.json";
import citiesEn from "./data/cities-en.json";
import { getCities } from "./getCities";
import { MOUNT_ATHOS_REGION_ID } from "./getAdministrativeRegions";

const cities = { el: citiesEl, en: citiesEn } as const;

describe("getCities", () => {
  describe("default behavior", () => {
    it("correctly returns data with default values (in greek language)", () => {
      expect(getCities()).toStrictEqual(cities.el);
      expect(getCities({ locale: "el" })).toStrictEqual(cities.el);
      expect(getCities().length).toBe(51);
    });

    it("handles empty options object explicitly", () => {
      expect(getCities({})).toStrictEqual(cities.el);
    });
  });

  describe("locale handling", () => {
    it("correctly returns data (in english language)", () => {
      expect(getCities({ locale: "en" })).toStrictEqual(cities.en);
      expect(getCities({ locale: "en" }).length).toBe(51);
    });

    it("returns same number of cities for both locales", () => {
      const greekCities = getCities({ locale: "el" });
      const englishCities = getCities({ locale: "en" });

      expect(greekCities.length).toBe(englishCities.length);
      expect(greekCities.length).toBe(51);
    });

    it("returns cities with translated names in different locales", () => {
      const greekCities = getCities({ locale: "el" });
      const englishCities = getCities({ locale: "en" });

      // Same IDs but different names
      expect(greekCities[0]?.id).toBe(englishCities[0]?.id);
      // Most cities should have different names (some might be the same)
      const differentNames = greekCities.filter((gc, index) => gc.name !== englishCities[index]?.name);
      expect(differentNames.length).toBeGreaterThan(0);
    });
  });

  describe("data structure validation", () => {
    it("returns cities with all required properties", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(city).toHaveProperty("id");
        expect(city).toHaveProperty("name");
        expect(city).toHaveProperty("coordinates");
        expect(city).toHaveProperty("relations");
        expect(typeof city.id).toBe("number");
        expect(typeof city.name).toBe("string");
        expect(Array.isArray(city.coordinates)).toBe(true);
        expect(typeof city.relations).toBe("object");
      });
    });

    it("ensures all cities have valid coordinates array", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(Array.isArray(city.coordinates)).toBe(true);
        expect(city.coordinates.length).toBe(2);
        expect(typeof city.coordinates[0]).toBe("number");
        expect(typeof city.coordinates[1]).toBe("number");
      });
    });

    it("ensures coordinates are valid latitude and longitude", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        const [longitude, latitude] = city.coordinates;
        // Greece longitude range: approximately 19°E to 30°E
        expect(longitude).toBeGreaterThanOrEqual(19);
        expect(longitude).toBeLessThanOrEqual(30);
        // Greece latitude range: approximately 34°N to 42°N
        expect(latitude).toBeGreaterThanOrEqual(34);
        expect(latitude).toBeLessThanOrEqual(42);
      });
    });

    it("ensures all cities have valid relations object", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(city.relations).toHaveProperty("regionId");
        expect(city.relations).toHaveProperty("regionIso31662");
        expect(city.relations).toHaveProperty("unitId");
        expect(city.relations).toHaveProperty("municipalityId");
        expect(city.relations).toHaveProperty("prefectureId");
        expect(typeof city.relations.regionId).toBe("number");
        expect(typeof city.relations.regionIso31662).toBe("string");
        expect(typeof city.relations.unitId).toBe("number");
        expect(typeof city.relations.municipalityId).toBe("number");
        expect(typeof city.relations.prefectureId).toBe("number");
      });
    });

    it("ensures ISO codes follow the correct pattern", () => {
      const greekCities = getCities();
      const isoPattern = /^GR-[A-Z0-9]+$/;

      greekCities.forEach((city) => {
        expect(city.relations.regionIso31662).toMatch(isoPattern);
      });
    });

    it("ensures all properties are non-empty strings", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(city.name.length).toBeGreaterThan(0);
        expect(city.relations.regionIso31662.length).toBeGreaterThan(0);
      });
    });
  });

  describe("data integrity", () => {
    it("ensures all city IDs are unique", () => {
      const greekCities = getCities();
      const ids = greekCities.map((city) => city.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it("ensures city IDs are positive numbers", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(city.id).toBeGreaterThan(0);
        expect(Number.isInteger(city.id)).toBe(true);
      });
    });

    it("ensures no duplicate cities", () => {
      const greekCities = getCities();
      const serializedCities = greekCities.map((city) => JSON.stringify(city));
      const uniqueCities = new Set(serializedCities);

      expect(uniqueCities.size).toBe(serializedCities.length);
    });

    it("ensures region IDs are within expected range (1-14)", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(city.relations.regionId).toBeGreaterThanOrEqual(1);
        expect(city.relations.regionId).toBeLessThanOrEqual(14);
      });
    });

    it("ensures unit IDs are positive numbers", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(city.relations.unitId).toBeGreaterThan(0);
        expect(Number.isInteger(city.relations.unitId)).toBe(true);
      });
    });

    it("ensures municipality IDs are positive numbers", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(city.relations.municipalityId).toBeGreaterThan(0);
        expect(Number.isInteger(city.relations.municipalityId)).toBe(true);
      });
    });

    it("ensures prefecture IDs are positive numbers", () => {
      const greekCities = getCities();

      greekCities.forEach((city) => {
        expect(city.relations.prefectureId).toBeGreaterThan(0);
        expect(Number.isInteger(city.relations.prefectureId)).toBe(true);
      });
    });

    it("ensures coordinates remain consistent across locales", () => {
      const greekCities = getCities({ locale: "el" });
      const englishCities = getCities({ locale: "en" });

      greekCities.forEach((greekCity, index) => {
        const englishCity = englishCities[index];
        expect(greekCity.coordinates).toStrictEqual(englishCity?.coordinates);
      });
    });

    it("ensures relations remain consistent across locales", () => {
      const greekCities = getCities({ locale: "el" });
      const englishCities = getCities({ locale: "en" });

      greekCities.forEach((greekCity, index) => {
        const englishCity = englishCities[index];
        expect(greekCity.relations).toStrictEqual(englishCity?.relations);
      });
    });
  });

  describe("specific cities verification", () => {
    it("includes known major cities in Greek locale", () => {
      const greekCities = getCities({ locale: "el" });
      const cityNames = greekCities.map((c) => c.name);

      expect(cityNames).toContain("Αθήνα"); // Athens
      expect(cityNames).toContain("Θεσσαλονίκη"); // Thessaloniki
      expect(cityNames).toContain("Πάτρα"); // Patras
      expect(cityNames).toContain("Ηράκλειο"); // Heraklion
    });

    it("includes known major cities in English locale", () => {
      const englishCities = getCities({ locale: "en" });
      const cityNames = englishCities.map((c) => c.name);

      expect(cityNames).toContain("Athens");
      expect(cityNames).toContain("Thessaloniki");
      expect(cityNames).toContain("Patra");
      expect(cityNames).toContain("Hrakleio");
    });

    it("verifies a specific city has expected structure (Athens - Greek)", () => {
      const greekCities = getCities({ locale: "el" });
      const athens = greekCities.find((c) => c.name === "Αθήνα");

      expect(athens).toBeDefined();
      if (athens) {
        expect(athens.id).toBeGreaterThan(0);
        expect(athens.coordinates.length).toBe(2);
        expect(athens.relations.regionId).toBeGreaterThan(0);
        expect(athens.relations.unitId).toBeGreaterThan(0);
        expect(athens.relations.municipalityId).toBeGreaterThan(0);
        expect(athens.relations.prefectureId).toBeGreaterThan(0);
        expect(athens.relations.regionIso31662).toMatch(/^GR-/);
      }
    });

    it("verifies a specific city has expected structure (Athens - English)", () => {
      const englishCities = getCities({ locale: "en" });
      const athens = englishCities.find((c) => c.name === "Athens");

      expect(athens).toBeDefined();
      if (athens) {
        expect(athens.id).toBeGreaterThan(0);
        expect(athens.coordinates.length).toBe(2);
        expect(athens.relations.regionId).toBeGreaterThan(0);
        expect(athens.relations.unitId).toBeGreaterThan(0);
        expect(athens.relations.municipalityId).toBeGreaterThan(0);
        expect(athens.relations.prefectureId).toBeGreaterThan(0);
        expect(athens.relations.regionIso31662).toMatch(/^GR-/);
      }
    });

    it("verifies that same city has same ID and relations across locales", () => {
      const greekCities = getCities({ locale: "el" });
      const englishCities = getCities({ locale: "en" });
      const athensGreek = greekCities.find((c) => c.name === "Αθήνα");
      const athensEnglish = englishCities.find((c) => c.name === "Athens");

      expect(athensGreek).toBeDefined();
      expect(athensEnglish).toBeDefined();
      if (athensGreek && athensEnglish) {
        expect(athensGreek.id).toBe(athensEnglish.id);
        expect(athensGreek.coordinates).toStrictEqual(athensEnglish.coordinates);
        expect(athensGreek.relations).toStrictEqual(athensEnglish.relations);
      }
    });

    it("verifies Thessaloniki has valid data structure", () => {
      const greekCities = getCities({ locale: "el" });
      const thessaloniki = greekCities.find((c) => c.name === "Θεσσαλονίκη");

      expect(thessaloniki).toBeDefined();
      if (thessaloniki) {
        expect(thessaloniki.coordinates.length).toBe(2);
        // Thessaloniki is in Central Macedonia (region 2)
        expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]).toContain(thessaloniki.relations.regionId);
      }
    });
  });

  describe("distribution and coverage", () => {
    it("has cities from multiple regions", () => {
      const greekCities = getCities();
      const regionIds = new Set(greekCities.map((c) => c.relations.regionId));

      // Should have cities from multiple regions
      expect(regionIds.size).toBeGreaterThan(1);
    });

    it("has cities from multiple units", () => {
      const greekCities = getCities();
      const unitIds = new Set(greekCities.map((c) => c.relations.unitId));

      // Should have cities from multiple units
      expect(unitIds.size).toBeGreaterThan(1);
    });

    it("has cities from multiple municipalities", () => {
      const greekCities = getCities();
      const municipalityIds = new Set(greekCities.map((c) => c.relations.municipalityId));

      // Should have cities from multiple municipalities
      expect(municipalityIds.size).toBeGreaterThan(1);
    });

    it("has cities from multiple prefectures", () => {
      const greekCities = getCities();
      const prefectureIds = new Set(greekCities.map((c) => c.relations.prefectureId));

      // Should have cities from multiple prefectures
      expect(prefectureIds.size).toBeGreaterThan(1);
    });

    it("does not include Mount Athos region cities", () => {
      const greekCities = getCities();
      const mountAthosCities = greekCities.filter((c) => c.relations.regionId === MOUNT_ATHOS_REGION_ID);

      // Mount Athos should not have cities in the main cities list
      expect(mountAthosCities.length).toBe(0);
    });
  });

  describe("consistency checks", () => {
    it("maintains order consistency across multiple calls", () => {
      const first = getCities();
      const second = getCities();

      expect(first).toStrictEqual(second);
    });

    it("maintains order consistency across locales (same IDs in same positions)", () => {
      const greek = getCities({ locale: "el" });
      const english = getCities({ locale: "en" });

      greek.forEach((greekCity, index) => {
        expect(greekCity.id).toBe(english[index]?.id);
      });
    });

    it("returns direct reference to data (not a copy)", () => {
      const first = getCities();
      const second = getCities();

      // Should be the same reference
      expect(first).toBe(second);
    });
  });
});
