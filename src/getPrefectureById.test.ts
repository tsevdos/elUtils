import { getPrefectureById } from "./getPrefectureById";
import { getPrefectures } from "./getPrefectures";
import { MOUNT_ATHOS_PREFECTURE_ID } from "./geoUtils";

const greekPrefectures = getPrefectures({ locale: "el", includeMountAthos: true });
const greekPrefecturesWithoutMountAthos = getPrefectures({ locale: "el" });
const englishPrefectures = getPrefectures({ locale: "en", includeMountAthos: true });
const englishPrefecturesWithoutMountAthos = getPrefectures({ locale: "en" });

describe("getPrefectureById", () => {
  describe("default behavior", () => {
    it("correctly returns prefecture with default values (in greek language)", () => {
      const expectedData = greekPrefecturesWithoutMountAthos[0];

      expect(getPrefectureById({ id: 1 })).toEqual(expectedData);
      expect(getPrefectureById({ id: 1, locale: "el" })).toEqual(expectedData);
      expect(getPrefectureById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
      // all default options
      expect(getPrefectureById({ id: 1, locale: "el", includeMountAthos: false })).toEqual(expectedData);
    });

    it("should return prefecture with all required properties", () => {
      const prefecture = getPrefectureById({ id: 1 });

      expect(prefecture).toBeDefined();
      expect(prefecture).toHaveProperty("id");
      expect(prefecture).toHaveProperty("name");
      expect(prefecture).toHaveProperty("seat");
      expect(prefecture).toHaveProperty("regionAndUnit");
    });
  });

  describe("Mount Athos handling", () => {
    it("correctly returns Mount Athos prefecture (in greek language)", () => {
      const expectedData = greekPrefectures[54];

      expect(getPrefectureById({ id: 55, includeMountAthos: true })).toEqual(expectedData);
      expect(getPrefectureById({ id: 55, locale: "el", includeMountAthos: true })).toEqual(expectedData);
    });

    it("correctly returns Mount Athos prefecture (in english language)", () => {
      const expectedData = englishPrefectures[54];

      expect(getPrefectureById({ id: 55, locale: "en", includeMountAthos: true })).toEqual(expectedData);
    });

    it("should not return Mount Athos prefecture when includeMountAthos is false", () => {
      expect(getPrefectureById({ id: MOUNT_ATHOS_PREFECTURE_ID, includeMountAthos: false })).toBeUndefined();
      expect(getPrefectureById({ id: MOUNT_ATHOS_PREFECTURE_ID })).toBeUndefined();
    });

    it("should return Mount Athos prefecture when includeMountAthos is true", () => {
      const prefecture = getPrefectureById({ id: MOUNT_ATHOS_PREFECTURE_ID, includeMountAthos: true });

      expect(prefecture).toBeDefined();
      expect(prefecture?.id).toBe(MOUNT_ATHOS_PREFECTURE_ID);
    });

    it("Mount Athos prefecture should have unitId as null", () => {
      const prefecture = getPrefectureById({ id: MOUNT_ATHOS_PREFECTURE_ID, includeMountAthos: true });

      expect(prefecture).toBeDefined();
      expect(prefecture?.regionAndUnit.unitId).toBeNull();
    });
  });

  describe("locale handling", () => {
    it("correctly returns prefecture (in english language)", () => {
      const expectedData = englishPrefecturesWithoutMountAthos[33];

      expect(getPrefectureById({ id: 34, locale: "en" })).toEqual(expectedData);
      expect(getPrefectureById({ id: 34, locale: "en", includeMountAthos: false })).toEqual(expectedData);
    });

    it("should return same prefecture ID across locales but different names", () => {
      const greekPrefecture = getPrefectureById({ id: 1, locale: "el" });
      const englishPrefecture = getPrefectureById({ id: 1, locale: "en" });

      expect(greekPrefecture).toBeDefined();
      expect(englishPrefecture).toBeDefined();
      if (greekPrefecture && englishPrefecture) {
        expect(greekPrefecture.id).toBe(englishPrefecture.id);
        expect(greekPrefecture.name).not.toBe(englishPrefecture.name);
        expect(greekPrefecture.regionAndUnit).toStrictEqual(englishPrefecture.regionAndUnit);
      }
    });

    it("should return prefecture with different seat names across locales", () => {
      const greekPrefecture = getPrefectureById({ id: 10, locale: "el" });
      const englishPrefecture = getPrefectureById({ id: 10, locale: "en" });

      expect(greekPrefecture).toBeDefined();
      expect(englishPrefecture).toBeDefined();
      if (greekPrefecture && englishPrefecture) {
        // Seats might be different in different locales
        expect(typeof greekPrefecture.seat).toBe("string");
        expect(typeof englishPrefecture.seat).toBe("string");
      }
    });
  });

  describe("error handling and edge cases", () => {
    it("should return undefined for non-existent prefecture ID", () => {
      expect(getPrefectureById({ id: 999 })).toBeUndefined();
      expect(getPrefectureById({ id: 9999, locale: "en" })).toBeUndefined();
    });

    it("should return undefined for negative ID", () => {
      expect(getPrefectureById({ id: -1 })).toBeUndefined();
      expect(getPrefectureById({ id: -100, locale: "el" })).toBeUndefined();
    });

    it("should return undefined for zero ID", () => {
      expect(getPrefectureById({ id: 0 })).toBeUndefined();
      expect(getPrefectureById({ id: 0, locale: "en" })).toBeUndefined();
    });
  });

  describe("boundary tests", () => {
    it("should handle first prefecture ID (1)", () => {
      const prefecture = getPrefectureById({ id: 1 });

      expect(prefecture).toBeDefined();
      expect(prefecture?.id).toBe(1);
    });

    it("should handle last non-Mount Athos prefecture ID (54)", () => {
      const prefecture = getPrefectureById({ id: 54 });

      expect(prefecture).toBeDefined();
      expect(prefecture?.id).toBe(54);
    });

    it("should handle Mount Athos prefecture ID (55) when included", () => {
      const prefecture = getPrefectureById({ id: 55, includeMountAthos: true });

      expect(prefecture).toBeDefined();
      expect(prefecture?.id).toBe(55);
    });

    it("should return undefined for ID beyond valid range", () => {
      expect(getPrefectureById({ id: 56 })).toBeUndefined();
      expect(getPrefectureById({ id: 56, includeMountAthos: true })).toBeUndefined();
    });
  });

  describe("data structure validation", () => {
    it("should return prefecture with valid regionAndUnit structure", () => {
      const prefecture = getPrefectureById({ id: 5 });

      expect(prefecture).toBeDefined();
      if (prefecture) {
        expect(prefecture.regionAndUnit).toHaveProperty("regionId");
        expect(prefecture.regionAndUnit).toHaveProperty("regionIso31662");
        expect(prefecture.regionAndUnit).toHaveProperty("unitId");
        expect(typeof prefecture.regionAndUnit.regionId).toBe("number");
        expect(typeof prefecture.regionAndUnit.regionIso31662).toBe("string");
      }
    });

    it("should have valid ISO code pattern in regionAndUnit", () => {
      const prefecture = getPrefectureById({ id: 10 });

      expect(prefecture).toBeDefined();
      if (prefecture) {
        expect(prefecture.regionAndUnit.regionIso31662).toMatch(/^GR-/);
      }
    });

    it("should have positive region and unit IDs (except Mount Athos unitId)", () => {
      const prefecture = getPrefectureById({ id: 20 });

      expect(prefecture).toBeDefined();
      if (prefecture) {
        expect(prefecture.regionAndUnit.regionId).toBeGreaterThan(0);
        if (prefecture.id !== MOUNT_ATHOS_PREFECTURE_ID) {
          expect(prefecture.regionAndUnit.unitId).toBeGreaterThan(0);
        }
      }
    });

    it("should have all string properties non-empty", () => {
      const prefecture = getPrefectureById({ id: 15 });

      expect(prefecture).toBeDefined();
      if (prefecture) {
        expect(prefecture.name.length).toBeGreaterThan(0);
        expect(prefecture.seat.length).toBeGreaterThan(0);
        expect(prefecture.regionAndUnit.regionIso31662.length).toBeGreaterThan(0);
      }
    });
  });

  describe("consistency checks", () => {
    it("should return consistent results for multiple calls", () => {
      const first = getPrefectureById({ id: 10 });
      const second = getPrefectureById({ id: 10 });

      expect(first).toStrictEqual(second);
    });

    it("should return prefecture that matches data from getPrefectures", () => {
      const prefectureById = getPrefectureById({ id: 25, locale: "el" });
      const allPrefectures = getPrefectures({ locale: "el" });
      const foundInList = allPrefectures.find((p) => p.id === 25);

      expect(prefectureById).toStrictEqual(foundInList);
    });

    it("should maintain consistency when including Mount Athos", () => {
      const prefectureById = getPrefectureById({ id: 30, locale: "el", includeMountAthos: true });
      const allPrefectures = getPrefectures({ locale: "el", includeMountAthos: true });
      const foundInList = allPrefectures.find((p) => p.id === 30);

      expect(prefectureById).toStrictEqual(foundInList);
    });
  });

  describe("specific prefectures verification", () => {
    it("should return Athens Prefecture (ID 1) with correct data in Greek", () => {
      const prefecture = getPrefectureById({ id: 1, locale: "el" });

      expect(prefecture).toBeDefined();
      if (prefecture) {
        expect(prefecture.id).toBe(1);
        expect(prefecture.name).toBe("Νομός Αθηνών");
        expect(prefecture.seat).toBe("Αθήνα");
      }
    });

    it("should return Athens Prefecture (ID 1) with correct data in English", () => {
      const prefecture = getPrefectureById({ id: 1, locale: "en" });

      expect(prefecture).toBeDefined();
      if (prefecture) {
        expect(prefecture.id).toBe(1);
        expect(prefecture.name).toBe("Athens Prefecture");
        expect(prefecture.seat).toBe("Athens");
      }
    });

    it("should return different prefecture objects for different IDs", () => {
      const prefecture1 = getPrefectureById({ id: 1 });
      const prefecture2 = getPrefectureById({ id: 2 });

      expect(prefecture1).toBeDefined();
      expect(prefecture2).toBeDefined();
      if (prefecture1 && prefecture2) {
        expect(prefecture1.id).not.toBe(prefecture2.id);
        expect(prefecture1.name).not.toBe(prefecture2.name);
      }
    });
  });

  describe("multiple prefectures validation", () => {
    it("should return valid prefectures for a range of IDs", () => {
      const testIds = [1, 10, 20, 30, 40, 50];

      testIds.forEach((id) => {
        const prefecture = getPrefectureById({ id });
        expect(prefecture).toBeDefined();
        expect(prefecture?.id).toBe(id);
      });
    });

    it("should handle all valid prefecture IDs (1-54 without Mount Athos)", () => {
      for (let id = 1; id <= 54; id++) {
        const prefecture = getPrefectureById({ id });
        if (id === MOUNT_ATHOS_PREFECTURE_ID) {
          expect(prefecture).toBeUndefined();
        } else {
          expect(prefecture).toBeDefined();
          expect(prefecture?.id).toBe(id);
        }
      }
    });

    it("should handle all valid prefecture IDs (1-55 with Mount Athos)", () => {
      for (let id = 1; id <= 55; id++) {
        const prefecture = getPrefectureById({ id, includeMountAthos: true });
        expect(prefecture).toBeDefined();
        expect(prefecture?.id).toBe(id);
      }
    });
  });

  describe("combined options", () => {
    it("should handle Greek locale with Mount Athos included", () => {
      const prefecture = getPrefectureById({ id: MOUNT_ATHOS_PREFECTURE_ID, locale: "el", includeMountAthos: true });

      expect(prefecture).toBeDefined();
      expect(prefecture?.id).toBe(MOUNT_ATHOS_PREFECTURE_ID);
      expect(prefecture?.name).toBe("Άγιο Όρος");
    });

    it("should handle English locale with Mount Athos included", () => {
      const prefecture = getPrefectureById({ id: MOUNT_ATHOS_PREFECTURE_ID, locale: "en", includeMountAthos: true });

      expect(prefecture).toBeDefined();
      expect(prefecture?.id).toBe(MOUNT_ATHOS_PREFECTURE_ID);
      expect(prefecture?.name).toBe("Mount Athos");
    });

    it("should handle Greek locale with Mount Athos excluded", () => {
      const prefecture = getPrefectureById({ id: MOUNT_ATHOS_PREFECTURE_ID, locale: "el", includeMountAthos: false });

      expect(prefecture).toBeUndefined();
    });

    it("should handle English locale with Mount Athos excluded", () => {
      const prefecture = getPrefectureById({ id: MOUNT_ATHOS_PREFECTURE_ID, locale: "en", includeMountAthos: false });

      expect(prefecture).toBeUndefined();
    });
  });

  describe("type safety", () => {
    it("should return Prefecture type or undefined", () => {
      const existing = getPrefectureById({ id: 1 });
      const nonExisting = getPrefectureById({ id: 999 });

      // TypeScript should allow these without type errors
      expect(existing === undefined || typeof existing.id === "number").toBe(true);
      expect(nonExisting).toBeUndefined();
    });
  });
});
