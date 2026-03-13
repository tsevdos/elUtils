import { getAdministrativeRegions, MOUNT_ATHOS_REGION_ID } from "./getAdministrativeRegions";
import administrativeRegionsEl from "./data/administrative-regions-el.json";
import administrativeRegionsEn from "./data/administrative-regions-en.json";

const administrativeRegions = { el: administrativeRegionsEl, en: administrativeRegionsEn };
const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
};

describe("getAdministrativeRegions", () => {
  describe("default behavior", () => {
    it("returns Greek data without Mount Athos at municipality level with no options", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el;

      expect(getAdministrativeRegions()).toEqual(expectedData);
      expect(getAdministrativeRegions().length).toEqual(13);
    });

    it("returns Greek data without Mount Athos when using default option values explicitly", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el;

      expect(getAdministrativeRegions({ locale: "el" })).toEqual(expectedData);
      expect(getAdministrativeRegions({ includeMountAthos: false })).toEqual(expectedData);
      expect(getAdministrativeRegions({ level: "municipality" })).toEqual(expectedData);
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: false, level: "municipality" })).toEqual(
        expectedData,
      );
    });

    it("handles empty options object explicitly", () => {
      expect(getAdministrativeRegions()).toEqual(administrativeRegionsWithoutMountAthos.el);
    });
  });

  describe("Mount Athos inclusion", () => {
    it("Mount Athos has correct ID constant", () => {
      const mountAthos = administrativeRegionsEl.find((r) => r.id === MOUNT_ATHOS_REGION_ID);

      expect(mountAthos).toBeDefined();
      expect(MOUNT_ATHOS_REGION_ID).toBe(14);
    });

    it("includes Mount Athos when includeMountAthos is true (Greek)", () => {
      const expectedData = administrativeRegions.el;

      expect(getAdministrativeRegions({ includeMountAthos: true })).toEqual(expectedData);
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true })).toEqual(expectedData);
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true, level: "municipality" })).toEqual(
        expectedData,
      );
      expect(getAdministrativeRegions({ includeMountAthos: true }).length).toEqual(14);
    });

    it("includes Mount Athos when includeMountAthos is true (English)", () => {
      const expectedData = administrativeRegions.en;

      expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true })).toEqual(expectedData);
      expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true, level: "municipality" })).toEqual(
        expectedData,
      );
      expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true }).length).toEqual(14);
    });

    it("filters out only Mount Athos when includeMountAthos is false", () => {
      const withoutMountAthos = getAdministrativeRegions({ includeMountAthos: false });
      const withMountAthos = getAdministrativeRegions({ includeMountAthos: true });

      expect(withMountAthos.length - withoutMountAthos.length).toBe(1);
      expect(withoutMountAthos.every((r) => r.id !== MOUNT_ATHOS_REGION_ID)).toBe(true);
      expect(withMountAthos.some((r) => r.id === MOUNT_ATHOS_REGION_ID)).toBe(true);
    });

    it("correctly handles Mount Athos with different levels (Greek)", () => {
      const regionLevel = getAdministrativeRegions({ includeMountAthos: true, level: "region" });
      const unitLevel = getAdministrativeRegions({ includeMountAthos: true, level: "unit" });
      const municipalityLevel = getAdministrativeRegions({ includeMountAthos: true, level: "municipality" });

      expect(regionLevel.length).toBe(14);
      expect(unitLevel.length).toBe(14);
      expect(municipalityLevel.length).toBe(14);
      expect(regionLevel.some((r) => r.id === MOUNT_ATHOS_REGION_ID)).toBe(true);
      expect(unitLevel.some((r) => r.id === MOUNT_ATHOS_REGION_ID)).toBe(true);
      expect(municipalityLevel.some((r) => r.id === MOUNT_ATHOS_REGION_ID)).toBe(true);
    });
  });

  describe("level filtering", () => {
    it("returns region level data without units (Greek)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(
        ({ units: _units, ...region }) => region,
      );

      expect(getAdministrativeRegions({ level: "region" })).toEqual(expectedRegionLevelData);
    });

    it("returns unit level data without municipalities (Greek)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      }));

      expect(getAdministrativeRegions({ level: "unit" })).toEqual(expectedUnitLevelData);
    });

    it("returns municipality level data with full nesting (Greek)", () => {
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el;

      expect(getAdministrativeRegions({ level: "municipality" })).toEqual(expectedMunicipalityLevelData);
    });

    it("returns region level data without units (English)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(
        ({ units: _units, ...region }) => region,
      );

      expect(getAdministrativeRegions({ locale: "en", level: "region" })).toEqual(expectedRegionLevelData);
    });

    it("returns unit level data without municipalities (English)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      }));

      expect(getAdministrativeRegions({ locale: "en", level: "unit" })).toEqual(expectedUnitLevelData);
    });

    it("returns municipality level data with full nesting (English)", () => {
      expect(getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(
        administrativeRegionsWithoutMountAthos.en,
      );
    });
  });

  describe("data structure validation", () => {
    it("returns correct data structure for region level", () => {
      const result = getAdministrativeRegions({ level: "region" });

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("iso31662");
      expect(result[0]).not.toHaveProperty("units");
    });

    it("returns correct data structure for unit level", () => {
      const result = getAdministrativeRegions({ level: "unit" });

      expect(result.length).toBeGreaterThan(0);
      const firstRegion = result[0];
      expect(firstRegion).toBeDefined();
      expect(firstRegion).toHaveProperty("id");
      expect(firstRegion).toHaveProperty("name");
      expect(firstRegion).toHaveProperty("iso31662");
      expect(firstRegion).toHaveProperty("units");

      if (firstRegion && "units" in firstRegion) {
        expect(Array.isArray(firstRegion.units)).toBe(true);
        expect(firstRegion.units.length).toBeGreaterThan(0);
        const firstUnit = firstRegion.units[0];
        expect(firstUnit).toBeDefined();
        expect(firstUnit).toHaveProperty("id");
        expect(firstUnit).toHaveProperty("name");
        expect(firstUnit).not.toHaveProperty("municipalities");
      }
    });

    it("returns correct data structure for municipality level", () => {
      const result = getAdministrativeRegions({ level: "municipality" });

      expect(result.length).toBeGreaterThan(0);
      const firstRegion = result[0];
      expect(firstRegion).toBeDefined();
      expect(firstRegion).toHaveProperty("id");
      expect(firstRegion).toHaveProperty("name");
      expect(firstRegion).toHaveProperty("iso31662");
      expect(firstRegion).toHaveProperty("units");

      if (firstRegion && "units" in firstRegion) {
        expect(Array.isArray(firstRegion.units)).toBe(true);
        expect(firstRegion.units.length).toBeGreaterThan(0);
        const firstUnit = firstRegion.units[0];
        expect(firstUnit).toBeDefined();
        expect(firstUnit).toHaveProperty("municipalities");

        if (firstUnit && "municipalities" in firstUnit) {
          expect(Array.isArray(firstUnit.municipalities)).toBe(true);
          expect(firstUnit.municipalities.length).toBeGreaterThan(0);
          const firstMunicipality = firstUnit.municipalities[0];
          expect(firstMunicipality).toBeDefined();
          expect(firstMunicipality).toHaveProperty("id");
          expect(firstMunicipality).toHaveProperty("name");
        }
      }
    });
  });

  describe("locale support", () => {
    it("returns Greek data when locale is 'el'", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el;

      expect(getAdministrativeRegions({ locale: "el" })).toEqual(expectedData);
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: false })).toEqual(expectedData);
      expect(getAdministrativeRegions({ locale: "el", level: "municipality" })).toEqual(expectedData);
    });

    it("returns English data when locale is 'en'", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en;

      expect(getAdministrativeRegions({ locale: "en" })).toEqual(expectedData);
      expect(getAdministrativeRegions({ locale: "en", includeMountAthos: false })).toEqual(expectedData);
      expect(getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(expectedData);
    });
  });

  describe("option combinations", () => {
    it("correctly combines region level + Mount Athos + Greek", () => {
      const result = getAdministrativeRegions({ locale: "el", includeMountAthos: true, level: "region" });

      expect(result.length).toBe(14);
      expect(result[0]).not.toHaveProperty("units");
      expect(result.some((r) => r.id === MOUNT_ATHOS_REGION_ID)).toBe(true);
    });

    it("correctly combines region level + Mount Athos + English", () => {
      const result = getAdministrativeRegions({ locale: "en", includeMountAthos: true, level: "region" });

      expect(result.length).toBe(14);
      expect(result[0]).not.toHaveProperty("units");
      expect(result.some((r) => r.id === MOUNT_ATHOS_REGION_ID)).toBe(true);
    });

    it("correctly combines unit level + Mount Athos + Greek", () => {
      const result = getAdministrativeRegions({ locale: "el", includeMountAthos: true, level: "unit" });

      expect(result.length).toBe(14);

      const firstRegion = result[0];

      expect(firstRegion).toHaveProperty("units");

      if (firstRegion && "units" in firstRegion && firstRegion.units[0]) {
        expect(firstRegion.units[0]).not.toHaveProperty("municipalities");
      }
      expect(result.some((r) => r.id === MOUNT_ATHOS_REGION_ID)).toBe(true);
    });

    it("correctly combines unit level + Mount Athos + English", () => {
      const result = getAdministrativeRegions({ locale: "en", includeMountAthos: true, level: "unit" });

      expect(result.length).toBe(14);

      const firstRegion = result[0];

      expect(firstRegion).toHaveProperty("units");

      if (firstRegion && "units" in firstRegion && firstRegion.units[0]) {
        expect(firstRegion.units[0]).not.toHaveProperty("municipalities");
      }
      expect(result.some((r) => r.id === MOUNT_ATHOS_REGION_ID)).toBe(true);
    });

    it("correctly combines unit level + without Mount Athos + English", () => {
      const result = getAdministrativeRegions({
        locale: "en",
        includeMountAthos: false,
        level: "unit",
      });

      expect(result.length).toBe(13);
      const firstRegion = result[0];
      expect(firstRegion).toHaveProperty("units");
      if (firstRegion && "units" in firstRegion && firstRegion.units[0]) {
        expect(firstRegion.units[0]).not.toHaveProperty("municipalities");
      }
      expect(result.every((r) => r.id !== MOUNT_ATHOS_REGION_ID)).toBe(true);
    });
  });

  describe("data consistency", () => {
    it("returns same number of regions for both locales", () => {
      expect(getAdministrativeRegions({ locale: "el" }).length).toBe(getAdministrativeRegions({ locale: "en" }).length);
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true }).length).toBe(
        getAdministrativeRegions({ locale: "en", includeMountAthos: true }).length,
      );
    });

    it("returns regions with matching IDs across locales", () => {
      const elIds = getAdministrativeRegions({ locale: "el" }).map((r) => r.id);
      const enIds = getAdministrativeRegions({ locale: "en" }).map((r) => r.id);

      expect(new Set(elIds)).toEqual(new Set(enIds));
      expect(elIds.length).toBe(enIds.length);
    });

    it("returns regions with matching IDs across locales including Mount Athos", () => {
      const elIds = getAdministrativeRegions({ locale: "el", includeMountAthos: true }).map((r) => r.id);
      const enIds = getAdministrativeRegions({ locale: "en", includeMountAthos: true }).map((r) => r.id);

      expect(new Set(elIds)).toEqual(new Set(enIds));
      expect(elIds.length).toBe(enIds.length);
    });

    it("returns regions with matching ISO codes across locales", () => {
      const elIsoCodes = getAdministrativeRegions({ locale: "el" }).map((r) => r.iso31662);
      const enIsoCodes = getAdministrativeRegions({ locale: "en" }).map((r) => r.iso31662);

      expect(new Set(elIsoCodes)).toEqual(new Set(enIsoCodes));
      expect(elIsoCodes.length).toBe(enIsoCodes.length);
    });
  });

  describe("immutability", () => {
    it("does not mutate original data when filtering Mount Athos", () => {
      const originalLength = administrativeRegionsEl.length;
      const originalFirstRegion = administrativeRegionsEl[0];
      const originalFirstRegionUnitsLength = originalFirstRegion?.units.length;

      getAdministrativeRegions({ includeMountAthos: false });

      expect(administrativeRegionsEl.length).toBe(originalLength);
      const currentFirstRegion = administrativeRegionsEl[0];
      expect(currentFirstRegion).toBe(originalFirstRegion);
      if (currentFirstRegion) {
        expect(currentFirstRegion.units.length).toBe(originalFirstRegionUnitsLength);
      }
    });

    it("does not mutate original data when filtering to region level", () => {
      const originalFirstRegion = administrativeRegionsEl[0];
      if (!originalFirstRegion) return;
      const hasUnits = "units" in originalFirstRegion;
      const originalUnitsLength = originalFirstRegion.units.length;

      getAdministrativeRegions({ level: "region" });

      const currentFirstRegion = administrativeRegionsEl[0];
      if (currentFirstRegion) {
        expect("units" in currentFirstRegion).toBe(hasUnits);
        expect(currentFirstRegion.units.length).toBe(originalUnitsLength);
      }
    });

    it("does not mutate original data when filtering to unit level", () => {
      const originalFirstRegion = administrativeRegionsEl[0];
      if (!originalFirstRegion) return;
      const originalFirstUnit = originalFirstRegion.units[0];
      if (!originalFirstUnit) return;
      const hasMunicipalities = "municipalities" in originalFirstUnit;
      const originalMunicipalitiesLength = originalFirstUnit.municipalities.length;

      getAdministrativeRegions({ level: "unit" });

      const currentFirstRegion = administrativeRegionsEl[0];
      if (currentFirstRegion) {
        const currentFirstUnit = currentFirstRegion.units[0];
        if (currentFirstUnit) {
          expect("municipalities" in currentFirstUnit).toBe(hasMunicipalities);
          expect(currentFirstUnit.municipalities.length).toBe(originalMunicipalitiesLength);
        }
      }
    });

    it("does not mutate English data when filtering", () => {
      const originalLength = administrativeRegionsEn.length;
      const originalFirstRegion = administrativeRegionsEn[0];

      getAdministrativeRegions({ locale: "en", includeMountAthos: false });
      getAdministrativeRegions({ locale: "en", level: "region" });

      expect(administrativeRegionsEn.length).toBe(originalLength);
      const currentFirstRegion = administrativeRegionsEn[0];
      expect(currentFirstRegion).toBe(originalFirstRegion);
    });

    it("returns same reference for municipality level (performance optimization)", () => {
      const result1 = getAdministrativeRegions();
      const result2 = getAdministrativeRegions();

      // Municipality level returns same reference for performance (documented as read-only)
      expect(result1).toBe(result2);
      expect(result1).toEqual(result2);
    });

    it("returns new object instances at region level", () => {
      const result1 = getAdministrativeRegions({ level: "region" });
      const result2 = getAdministrativeRegions({ level: "region" });

      const first1 = result1[0];
      const first2 = result2[0];
      if (first1 && first2) {
        expect(first1).not.toBe(first2);
        expect(first1).toEqual(first2);
      }
    });
  });
});
