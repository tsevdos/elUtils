import { getPrefectures, allPrefectures, prefecturesWithoutMountAthos } from "./getPrefectures";
import { MOUNT_ATHOS_PREFECTURE_ID } from "./geoUtils";

describe("getPrefectures", () => {
  describe("default behavior", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = prefecturesWithoutMountAthos.el;

      expect(getPrefectures()).toEqual(expectedData);
      expect(getPrefectures({ locale: "el" })).toEqual(expectedData);
      expect(getPrefectures({ includeMountAthos: false })).toEqual(expectedData);
      expect(getPrefectures({ locale: "el", includeMountAthos: false })).toEqual(expectedData);
      expect(getPrefectures().length).toBe(54);
    });

    it("should handle empty options object", () => {
      expect(getPrefectures({})).toEqual(prefecturesWithoutMountAthos.el);
    });

    it("should return array of prefectures", () => {
      const prefectures = getPrefectures();

      expect(Array.isArray(prefectures)).toBe(true);
      expect(prefectures.length).toBeGreaterThan(0);
    });
  });

  describe("Mount Athos handling", () => {
    it("correctly returns data including Mount Athos (in greek language)", () => {
      const expectedData = allPrefectures.el;

      expect(getPrefectures({ includeMountAthos: true })).toEqual(expectedData);
      expect(getPrefectures({ locale: "el", includeMountAthos: true })).toEqual(expectedData);
      expect(getPrefectures({ includeMountAthos: true }).length).toBe(55);
    });

    it("correctly returns data including Mount Athos (in english language)", () => {
      const expectedData = allPrefectures.en;

      expect(getPrefectures({ locale: "en", includeMountAthos: true })).toEqual(expectedData);
      expect(getPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(55);
    });

    it("should exclude Mount Athos by default", () => {
      const prefectures = getPrefectures();
      const mountAthosFound = prefectures.some((p) => p.id === MOUNT_ATHOS_PREFECTURE_ID);

      expect(mountAthosFound).toBe(false);
    });

    it("should include Mount Athos when includeMountAthos is true", () => {
      const prefectures = getPrefectures({ includeMountAthos: true });
      const mountAthosFound = prefectures.some((p) => p.id === MOUNT_ATHOS_PREFECTURE_ID);

      expect(mountAthosFound).toBe(true);
    });

    it("should have one more prefecture when Mount Athos is included", () => {
      const withoutMountAthos = getPrefectures({ includeMountAthos: false });
      const withMountAthos = getPrefectures({ includeMountAthos: true });

      expect(withMountAthos.length).toBe(withoutMountAthos.length + 1);
    });

    it("Mount Athos prefecture should have unitId as null", () => {
      const prefectures = getPrefectures({ includeMountAthos: true });
      const mountAthos = prefectures.find((p) => p.id === MOUNT_ATHOS_PREFECTURE_ID);

      expect(mountAthos).toBeDefined();
      expect(mountAthos?.regionAndUnit.unitId).toBeNull();
    });
  });

  describe("locale handling", () => {
    it("correctly returns data (in english language)", () => {
      const expectedData = prefecturesWithoutMountAthos.en;

      expect(getPrefectures({ locale: "en" })).toEqual(expectedData);
      expect(getPrefectures({ locale: "en", includeMountAthos: false })).toEqual(expectedData);
      expect(getPrefectures({ locale: "en" }).length).toBe(54);
    });

    it("should return same number of prefectures for both locales (without Mount Athos)", () => {
      const greekPrefectures = getPrefectures({ locale: "el" });
      const englishPrefectures = getPrefectures({ locale: "en" });

      expect(greekPrefectures.length).toBe(englishPrefectures.length);
      expect(greekPrefectures.length).toBe(54);
    });

    it("should return same number of prefectures for both locales (with Mount Athos)", () => {
      const greekPrefectures = getPrefectures({ locale: "el", includeMountAthos: true });
      const englishPrefectures = getPrefectures({ locale: "en", includeMountAthos: true });

      expect(greekPrefectures.length).toBe(englishPrefectures.length);
      expect(greekPrefectures.length).toBe(55);
    });

    it("should return prefectures with translated names in different locales", () => {
      const greekPrefectures = getPrefectures({ locale: "el" });
      const englishPrefectures = getPrefectures({ locale: "en" });

      // Same IDs but different names
      expect(greekPrefectures[0]?.id).toBe(englishPrefectures[0]?.id);
      // Most prefectures should have different names
      const differentNames = greekPrefectures.filter((gp, index) => gp.name !== englishPrefectures[index]?.name);
      expect(differentNames.length).toBeGreaterThan(0);
    });
  });

  describe("data structure validation", () => {
    it("should return prefectures with all required properties", () => {
      const prefectures = getPrefectures();

      prefectures.forEach((prefecture) => {
        expect(prefecture).toHaveProperty("id");
        expect(prefecture).toHaveProperty("name");
        expect(prefecture).toHaveProperty("seat");
        expect(prefecture).toHaveProperty("regionAndUnit");
        expect(typeof prefecture.id).toBe("number");
        expect(typeof prefecture.name).toBe("string");
        expect(typeof prefecture.seat).toBe("string");
        expect(typeof prefecture.regionAndUnit).toBe("object");
      });
    });

    it("should have valid regionAndUnit structure", () => {
      const prefectures = getPrefectures();

      prefectures.forEach((prefecture) => {
        expect(prefecture.regionAndUnit).toHaveProperty("regionId");
        expect(prefecture.regionAndUnit).toHaveProperty("regionIso31662");
        expect(prefecture.regionAndUnit).toHaveProperty("unitId");
        expect(typeof prefecture.regionAndUnit.regionId).toBe("number");
        expect(typeof prefecture.regionAndUnit.regionIso31662).toBe("string");
      });
    });

    it("should have valid ISO code patterns", () => {
      const prefectures = getPrefectures({ includeMountAthos: true });
      const isoPattern = /^GR-/;

      prefectures.forEach((prefecture) => {
        expect(prefecture.regionAndUnit.regionIso31662).toMatch(isoPattern);
      });
    });

    it("should have non-empty string properties", () => {
      const prefectures = getPrefectures();

      prefectures.forEach((prefecture) => {
        expect(prefecture.name.length).toBeGreaterThan(0);
        expect(prefecture.seat.length).toBeGreaterThan(0);
        expect(prefecture.regionAndUnit.regionIso31662.length).toBeGreaterThan(0);
      });
    });
  });

  describe("data integrity", () => {
    it("should have unique prefecture IDs", () => {
      const prefectures = getPrefectures({ includeMountAthos: true });
      const ids = prefectures.map((p) => p.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have positive prefecture IDs", () => {
      const prefectures = getPrefectures({ includeMountAthos: true });

      prefectures.forEach((prefecture) => {
        expect(prefecture.id).toBeGreaterThan(0);
        expect(Number.isInteger(prefecture.id)).toBe(true);
      });
    });

    it("should have no duplicate prefectures", () => {
      const prefectures = getPrefectures({ includeMountAthos: true });
      const serialized = prefectures.map((p) => JSON.stringify(p));
      const unique = new Set(serialized);

      expect(unique.size).toBe(serialized.length);
    });

    it("should have region IDs within expected range (1-14)", () => {
      const prefectures = getPrefectures({ includeMountAthos: true });

      prefectures.forEach((prefecture) => {
        expect(prefecture.regionAndUnit.regionId).toBeGreaterThanOrEqual(1);
        expect(prefecture.regionAndUnit.regionId).toBeLessThanOrEqual(14);
      });
    });

    it("should have positive unit IDs (except Mount Athos)", () => {
      const prefectures = getPrefectures({ includeMountAthos: true });

      prefectures.forEach((prefecture) => {
        if (prefecture.id !== MOUNT_ATHOS_PREFECTURE_ID) {
          expect(prefecture.regionAndUnit.unitId).toBeGreaterThan(0);
          expect(Number.isInteger(prefecture.regionAndUnit.unitId as number)).toBe(true);
        }
      });
    });

    it("should maintain coordinate consistency across locales", () => {
      const greekPrefectures = getPrefectures({ locale: "el" });
      const englishPrefectures = getPrefectures({ locale: "en" });

      greekPrefectures.forEach((greekPrefecture, index) => {
        const englishPrefecture = englishPrefectures[index];
        expect(greekPrefecture.regionAndUnit).toStrictEqual(englishPrefecture?.regionAndUnit);
      });
    });
  });

  describe("specific prefectures verification", () => {
    it("should include known prefectures in Greek locale", () => {
      const prefectures = getPrefectures({ locale: "el" });
      const prefectureNames = prefectures.map((p) => p.name);

      expect(prefectureNames).toContain("Νομός Αθηνών"); // Athens Prefecture
      expect(prefectureNames).toContain("Νομός Θεσσαλονίκης"); // Thessaloniki Prefecture
    });

    it("should include known prefectures in English locale", () => {
      const prefectures = getPrefectures({ locale: "en" });
      const prefectureNames = prefectures.map((p) => p.name);

      expect(prefectureNames).toContain("Athens Prefecture");
      expect(prefectureNames).toContain("Thessaloniki");
    });

    it("should include Mount Athos with correct name in Greek when included", () => {
      const prefectures = getPrefectures({ locale: "el", includeMountAthos: true });
      const mountAthos = prefectures.find((p) => p.id === MOUNT_ATHOS_PREFECTURE_ID);

      expect(mountAthos).toBeDefined();
      expect(mountAthos?.name).toBe("Άγιο Όρος");
      expect(mountAthos?.seat).toBe("Καρυές");
    });

    it("should include Mount Athos with correct name in English when included", () => {
      const prefectures = getPrefectures({ locale: "en", includeMountAthos: true });
      const mountAthos = prefectures.find((p) => p.id === MOUNT_ATHOS_PREFECTURE_ID);

      expect(mountAthos).toBeDefined();
      expect(mountAthos?.name).toBe("Mount Athos");
      expect(mountAthos?.seat).toBe("Karyes");
    });
  });

  describe("distribution and coverage", () => {
    it("should have prefectures from all 13 regions (excluding Mount Athos)", () => {
      const prefectures = getPrefectures();
      const regionIds = new Set(prefectures.map((p) => p.regionAndUnit.regionId));

      // Should have prefectures from at least 13 different regions
      expect(regionIds.size).toBeGreaterThanOrEqual(13);
    });

    it("should have prefectures from multiple units", () => {
      const prefectures = getPrefectures();
      const unitIds = new Set(prefectures.map((p) => p.regionAndUnit.unitId).filter((id): id is number => id !== null));

      // Should have prefectures from multiple units
      expect(unitIds.size).toBeGreaterThan(1);
    });
  });

  describe("consistency checks", () => {
    it("should return consistent results for multiple calls", () => {
      const first = getPrefectures();
      const second = getPrefectures();

      expect(first).toStrictEqual(second);
    });

    it("should maintain order consistency across multiple calls", () => {
      const first = getPrefectures({ includeMountAthos: true });
      const second = getPrefectures({ includeMountAthos: true });

      first.forEach((prefecture, index) => {
        expect(prefecture.id).toBe(second[index]?.id);
      });
    });

    it("should maintain order consistency across locales (same IDs in same positions)", () => {
      const greek = getPrefectures({ locale: "el" });
      const english = getPrefectures({ locale: "en" });

      greek.forEach((greekPrefecture, index) => {
        expect(greekPrefecture.id).toBe(english[index]?.id);
      });
    });

    it("should return direct reference to data (not a copy)", () => {
      const first = getPrefectures();
      const second = getPrefectures();

      // Should be the same reference
      expect(first).toBe(second);
    });
  });

  describe("combined options", () => {
    it("should handle Greek locale with Mount Athos excluded", () => {
      const prefectures = getPrefectures({ locale: "el", includeMountAthos: false });

      expect(prefectures.length).toBe(54);
      expect(prefectures.every((p) => p.id !== MOUNT_ATHOS_PREFECTURE_ID)).toBe(true);
    });

    it("should handle Greek locale with Mount Athos included", () => {
      const prefectures = getPrefectures({ locale: "el", includeMountAthos: true });

      expect(prefectures.length).toBe(55);
      expect(prefectures.some((p) => p.id === MOUNT_ATHOS_PREFECTURE_ID)).toBe(true);
    });

    it("should handle English locale with Mount Athos excluded", () => {
      const prefectures = getPrefectures({ locale: "en", includeMountAthos: false });

      expect(prefectures.length).toBe(54);
      expect(prefectures.every((p) => p.id !== MOUNT_ATHOS_PREFECTURE_ID)).toBe(true);
    });

    it("should handle English locale with Mount Athos included", () => {
      const prefectures = getPrefectures({ locale: "en", includeMountAthos: true });

      expect(prefectures.length).toBe(55);
      expect(prefectures.some((p) => p.id === MOUNT_ATHOS_PREFECTURE_ID)).toBe(true);
    });
  });
});
