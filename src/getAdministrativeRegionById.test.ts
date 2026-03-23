import { getAdministrativeRegionById } from "./getAdministrativeRegionById";
import { getAdministrativeRegions } from "./getAdministrativeRegions";
import type { Region, Unit, UnitWithoutMunicipalities } from "./types";

const greekAdministrativeRegionsWithoutMountAthos = getAdministrativeRegions({ includeMountAthos: false });
const englishAdministrativeRegionsWithoutMountAthos = getAdministrativeRegions({
  locale: "en",
  includeMountAthos: false,
});
const greekAdministrativeRegionsWithMountAthos = getAdministrativeRegions({ includeMountAthos: true });
const englishAdministrativeRegionsWithMountAthos = getAdministrativeRegions({
  locale: "en",
  includeMountAthos: true,
});

describe("getAdministrativeRegionById", () => {
  it("correctly returns region with default values (in greek language)", () => {
    const expectedData = greekAdministrativeRegionsWithoutMountAthos[0];

    expect(getAdministrativeRegionById({ id: 1 })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 1, locale: "el" })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 1, level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(
      getAdministrativeRegionById({
        id: 1,
        locale: "el",
        includeMountAthos: false,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns Mount Athos region (in greek language)", () => {
    const expectedData = greekAdministrativeRegionsWithMountAthos[13];

    expect(getAdministrativeRegionById({ id: 14, includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true })).toEqual(expectedData);
    expect(
      getAdministrativeRegionById({
        id: 14,
        locale: "el",
        includeMountAthos: true,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns region data with correct level (in greek language)", () => {
    const regionsAsRegionType = greekAdministrativeRegionsWithoutMountAthos as Region[];
    const expectedRegionLevelData = regionsAsRegionType.map(({ units: _units, ...region }) => region)[7];
    const expectedUnitLevelData = regionsAsRegionType.map((region) => ({
      ...region,
      units: (region.units as Unit[]).map(
        ({ municipalities: _municipalities, ...unit }) => unit,
      ) as UnitWithoutMunicipalities[],
    }))[7];
    const expectedMunicipalityLevelData = greekAdministrativeRegionsWithoutMountAthos[7];

    expect(getAdministrativeRegionById({ id: 8, level: "region" })).toStrictEqual(expectedRegionLevelData);
    expect(getAdministrativeRegionById({ id: 8, level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegionById({ id: 8, level: "municipality" })).toStrictEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns region (in english language)", () => {
    const expectedData = englishAdministrativeRegionsWithoutMountAthos[3];

    expect(getAdministrativeRegionById({ id: 4, locale: "en" })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 4, locale: "en", level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(
      getAdministrativeRegionById({
        id: 4,
        locale: "en",
        includeMountAthos: false,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns Mount Athos region (in english language)", () => {
    const expectedData = englishAdministrativeRegionsWithMountAthos[13];

    expect(getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true })).toEqual(expectedData);
    expect(
      getAdministrativeRegionById({
        id: 14,
        locale: "en",
        includeMountAthos: true,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns region data with correct level (in english language)", () => {
    const regionsAsRegionType = englishAdministrativeRegionsWithoutMountAthos as Region[];
    const expectedRegionLevelData = regionsAsRegionType.map(({ units: _units, ...region }) => region)[5];
    const expectedUnitLevelData = regionsAsRegionType.map((region) => ({
      ...region,
      units: (region.units as Unit[]).map(
        ({ municipalities: _municipalities, ...unit }) => unit,
      ) as UnitWithoutMunicipalities[],
    }))[5];
    const expectedMunicipalityLevelData = englishAdministrativeRegionsWithoutMountAthos[5];

    expect(getAdministrativeRegionById({ id: 6, locale: "en", level: "region" })).toStrictEqual(
      expectedRegionLevelData,
    );
    expect(getAdministrativeRegionById({ id: 6, locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegionById({ id: 6, locale: "en", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });

  describe("Edge cases - Invalid IDs", () => {
    it("returns undefined for non-existent ID (0)", () => {
      expect(getAdministrativeRegionById({ id: 0 })).toBeUndefined();
      expect(getAdministrativeRegionById({ id: 0, locale: "en" })).toBeUndefined();
    });

    it("returns undefined for non-existent ID (negative number)", () => {
      expect(getAdministrativeRegionById({ id: -1 })).toBeUndefined();
      expect(getAdministrativeRegionById({ id: -5, locale: "en" })).toBeUndefined();
      expect(getAdministrativeRegionById({ id: -100 })).toBeUndefined();
    });

    it("returns undefined for non-existent ID (above max)", () => {
      expect(getAdministrativeRegionById({ id: 15 })).toBeUndefined();
      expect(getAdministrativeRegionById({ id: 100, locale: "en" })).toBeUndefined();
      expect(getAdministrativeRegionById({ id: 999 })).toBeUndefined();
    });

    it("returns undefined for Mount Athos ID when includeMountAthos is false", () => {
      expect(getAdministrativeRegionById({ id: 14, includeMountAthos: false })).toBeUndefined();
      expect(getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: false })).toBeUndefined();
    });
  });

  describe("Edge cases - Boundary IDs", () => {
    it("correctly returns first region (ID 1) in Greek", () => {
      const expectedData = greekAdministrativeRegionsWithoutMountAthos[0];
      expect(getAdministrativeRegionById({ id: 1 })).toEqual(expectedData);
      expect(getAdministrativeRegionById({ id: 1 })?.id).toBe(1);
      expect(getAdministrativeRegionById({ id: 1 })?.name).toBe("Ανατολικής Μακεδονίας και Θράκης");
    });

    it("correctly returns first region (ID 1) in English", () => {
      const expectedData = englishAdministrativeRegionsWithoutMountAthos[0];
      expect(getAdministrativeRegionById({ id: 1, locale: "en" })).toEqual(expectedData);
      expect(getAdministrativeRegionById({ id: 1, locale: "en" })?.id).toBe(1);
      expect(getAdministrativeRegionById({ id: 1, locale: "en" })?.name).toBe("Eastern Macedonia and Thrace");
    });

    it("correctly returns last regular region (ID 13) in Greek", () => {
      const expectedData = greekAdministrativeRegionsWithoutMountAthos[12];
      expect(getAdministrativeRegionById({ id: 13 })).toEqual(expectedData);
      expect(getAdministrativeRegionById({ id: 13 })?.id).toBe(13);
      expect(getAdministrativeRegionById({ id: 13 })?.name).toBe("Κρήτης");
    });

    it("correctly returns last regular region (ID 13) in English", () => {
      const expectedData = englishAdministrativeRegionsWithoutMountAthos[12];
      expect(getAdministrativeRegionById({ id: 13, locale: "en" })).toEqual(expectedData);
      expect(getAdministrativeRegionById({ id: 13, locale: "en" })?.id).toBe(13);
      expect(getAdministrativeRegionById({ id: 13, locale: "en" })?.name).toBe("Crete");
    });

    it("correctly returns Mount Athos (ID 14) when included in Greek", () => {
      const expectedData = greekAdministrativeRegionsWithMountAthos[13];
      expect(getAdministrativeRegionById({ id: 14, includeMountAthos: true })).toEqual(expectedData);
      expect(getAdministrativeRegionById({ id: 14, includeMountAthos: true })?.id).toBe(14);
      expect(getAdministrativeRegionById({ id: 14, includeMountAthos: true })?.name).toBe("Άγιον Όρος");
    });

    it("correctly returns Mount Athos (ID 14) when included in English", () => {
      const expectedData = englishAdministrativeRegionsWithMountAthos[13];
      expect(getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true })).toEqual(expectedData);
      expect(getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true })?.id).toBe(14);
      expect(getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true })?.name).toBe("Mount Athos");
    });
  });

  describe("Happy paths - All valid regions", () => {
    it("correctly returns all valid regions without Mount Athos in Greek", () => {
      for (let id = 1; id <= 13; id++) {
        const result = getAdministrativeRegionById({ id });
        expect(result).toBeDefined();
        expect(result?.id).toBe(id);
      }
    });

    it("correctly returns all valid regions without Mount Athos in English", () => {
      for (let id = 1; id <= 13; id++) {
        const result = getAdministrativeRegionById({ id, locale: "en" });
        expect(result).toBeDefined();
        expect(result?.id).toBe(id);
      }
    });

    it("correctly returns all valid regions with Mount Athos in Greek", () => {
      for (let id = 1; id <= 14; id++) {
        const result = getAdministrativeRegionById({ id, includeMountAthos: true });
        expect(result).toBeDefined();
        expect(result?.id).toBe(id);
      }
    });

    it("correctly returns all valid regions with Mount Athos in English", () => {
      for (let id = 1; id <= 14; id++) {
        const result = getAdministrativeRegionById({ id, locale: "en", includeMountAthos: true });
        expect(result).toBeDefined();
        expect(result?.id).toBe(id);
      }
    });
  });

  describe("Level variations - All regions", () => {
    it("correctly returns region level data for all regions in Greek", () => {
      for (let id = 1; id <= 13; id++) {
        const result = getAdministrativeRegionById({ id, level: "region" });
        expect(result).toBeDefined();
        expect(result?.id).toBe(id);
        expect(result).not.toHaveProperty("units");
      }
    });

    it("correctly returns unit level data for all regions in Greek", () => {
      for (let id = 1; id <= 13; id++) {
        const result = getAdministrativeRegionById({ id, level: "unit" });
        expect(result).toBeDefined();
        expect(result?.id).toBe(id);
        expect(result).toHaveProperty("units");
        // Verify units don't have municipalities
        if (result && "units" in result && result.units) {
          for (const unit of result.units) {
            expect(unit).not.toHaveProperty("municipalities");
          }
        }
      }
    });

    it("correctly returns municipality level data for all regions in Greek", () => {
      for (let id = 1; id <= 13; id++) {
        const result = getAdministrativeRegionById({ id, level: "municipality" });
        expect(result).toBeDefined();
        expect(result?.id).toBe(id);
        expect(result).toHaveProperty("units");
        // Verify units have municipalities
        if (result && "units" in result && result.units) {
          for (const unit of result.units) {
            expect(unit).toHaveProperty("municipalities");
          }
        }
      }
    });

    it("correctly returns different levels for same region ID in English", () => {
      const id = 5; // Thessaly
      const regionLevel = getAdministrativeRegionById({ id, locale: "en", level: "region" });
      const unitLevel = getAdministrativeRegionById({ id, locale: "en", level: "unit" });
      const municipalityLevel = getAdministrativeRegionById({ id, locale: "en", level: "municipality" });

      expect(regionLevel).toBeDefined();
      expect(unitLevel).toBeDefined();
      expect(municipalityLevel).toBeDefined();

      expect(regionLevel).not.toHaveProperty("units");
      expect(unitLevel).toHaveProperty("units");
      expect(municipalityLevel).toHaveProperty("units");

      // All should have the same ID and basic properties
      expect(regionLevel?.id).toBe(id);
      expect(unitLevel?.id).toBe(id);
      expect(municipalityLevel?.id).toBe(id);
    });
  });

  describe("Combined options - Complex scenarios", () => {
    it("correctly handles all combinations of options for Attica (ID 9)", () => {
      const id = 9;

      // Greek, without Mount Athos, all levels
      expect(getAdministrativeRegionById({ id, level: "region" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, level: "unit" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, level: "municipality" })?.id).toBe(id);

      // English, without Mount Athos, all levels
      expect(getAdministrativeRegionById({ id, locale: "en", level: "region" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, locale: "en", level: "unit" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, locale: "en", level: "municipality" })?.id).toBe(id);

      // Greek, with Mount Athos, all levels
      expect(getAdministrativeRegionById({ id, includeMountAthos: true, level: "region" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, includeMountAthos: true, level: "unit" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, includeMountAthos: true, level: "municipality" })?.id).toBe(id);

      // English, with Mount Athos, all levels
      expect(getAdministrativeRegionById({ id, locale: "en", includeMountAthos: true, level: "region" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, locale: "en", includeMountAthos: true, level: "unit" })?.id).toBe(id);
      expect(
        getAdministrativeRegionById({ id, locale: "en", includeMountAthos: true, level: "municipality" })?.id,
      ).toBe(id);
    });

    it("correctly handles Mount Athos with all level options", () => {
      const id = 14;

      // Should return undefined when includeMountAthos is false
      expect(getAdministrativeRegionById({ id, level: "region" })).toBeUndefined();
      expect(getAdministrativeRegionById({ id, level: "unit" })).toBeUndefined();
      expect(getAdministrativeRegionById({ id, level: "municipality" })).toBeUndefined();

      // Should return data when includeMountAthos is true
      expect(getAdministrativeRegionById({ id, includeMountAthos: true, level: "region" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, includeMountAthos: true, level: "unit" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, includeMountAthos: true, level: "municipality" })?.id).toBe(id);

      // English versions
      expect(getAdministrativeRegionById({ id, locale: "en", includeMountAthos: true, level: "region" })?.id).toBe(id);
      expect(getAdministrativeRegionById({ id, locale: "en", includeMountAthos: true, level: "unit" })?.id).toBe(id);
      expect(
        getAdministrativeRegionById({ id, locale: "en", includeMountAthos: true, level: "municipality" })?.id,
      ).toBe(id);
    });
  });

  describe("Data consistency checks", () => {
    it("returns consistent IDs across different options", () => {
      for (let id = 1; id <= 13; id++) {
        const greekDefault = getAdministrativeRegionById({ id });
        const greekExplicit = getAdministrativeRegionById({ id, locale: "el" });
        const englishVersion = getAdministrativeRegionById({ id, locale: "en" });

        expect(greekDefault?.id).toBe(id);
        expect(greekExplicit?.id).toBe(id);
        expect(englishVersion?.id).toBe(id);
      }
    });

    it("returns consistent ISO codes across locales", () => {
      for (let id = 1; id <= 13; id++) {
        const greek = getAdministrativeRegionById({ id, locale: "el" });
        const english = getAdministrativeRegionById({ id, locale: "en" });

        expect(greek?.iso31662).toBe(english?.iso31662);
      }
    });

    it("ensures region names differ between Greek and English", () => {
      for (let id = 1; id <= 13; id++) {
        const greek = getAdministrativeRegionById({ id, locale: "el" });
        const english = getAdministrativeRegionById({ id, locale: "en" });

        expect(greek?.name).not.toBe(english?.name);
      }
    });

    it("ensures all regions have units property at municipality level", () => {
      for (let id = 1; id <= 13; id++) {
        const result = getAdministrativeRegionById({ id, level: "municipality" });

        expect(result).toHaveProperty("units");
        if (result && "units" in result && result.units) {
          expect(Array.isArray(result.units)).toBe(true);
          expect(result.units.length).toBeGreaterThan(0);
        }
      }
    });

    it("ensures all regions do not have units property at region level", () => {
      for (let id = 1; id <= 13; id++) {
        const result = getAdministrativeRegionById({ id, level: "region" });

        expect(result).not.toHaveProperty("units");
      }
    });
  });
});
