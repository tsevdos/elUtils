import { getAdministrativeRegions, MOUNT_ATHOS_REGION_ID } from "./getAdministrativeRegions";

describe("getAdministrativeRegions", () => {
  describe("default behavior", () => {
    it("returns Greek data without Mount Athos at municipality level with no options", () => {
      const regions = getAdministrativeRegions();

      expect(regions.length).toBe(13);
      const firstRegion = regions[0];
      expect(firstRegion).toMatchObject({
        id: 1,
        iso31662: "GR-A",
        name: "Ανατολικής Μακεδονίας και Θράκης",
        seat: "Κομοτηνή",
      });
      if (firstRegion && "units" in firstRegion) {
        expect(firstRegion.units[0]).toMatchObject({
          id: 1,
          name: "Δράμας",
          seat: "Δράμα",
          region: { id: 1, iso31662: "GR-A" },
        });
      }
    });

    it("returns Greek data without Mount Athos when using default option values explicitly", () => {
      const defaultRegions = getAdministrativeRegions();

      expect(getAdministrativeRegions({ locale: "el" })).toEqual(defaultRegions);
      expect(getAdministrativeRegions({ includeMountAthos: false })).toEqual(defaultRegions);
      expect(getAdministrativeRegions({ level: "municipality" })).toEqual(defaultRegions);
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: false, level: "municipality" })).toEqual(
        defaultRegions,
      );
    });

    it("handles empty options object explicitly", () => {
      expect(getAdministrativeRegions({})).toEqual(getAdministrativeRegions());
    });
  });

  describe("Mount Athos inclusion", () => {
    it("Mount Athos has correct ID constant", () => {
      expect(MOUNT_ATHOS_REGION_ID).toBe(14);
    });

    it("includes Mount Athos when includeMountAthos is true (Greek)", () => {
      const regions = getAdministrativeRegions({ includeMountAthos: true });

      expect(regions.length).toBe(14);
      expect(regions.some(({ id }) => id === MOUNT_ATHOS_REGION_ID)).toBe(true);
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true })).toEqual(regions);
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true, level: "municipality" })).toEqual(
        regions,
      );
    });

    it("includes Mount Athos when includeMountAthos is true (English)", () => {
      const regions = getAdministrativeRegions({ locale: "en", includeMountAthos: true });

      expect(regions.length).toBe(14);
      expect(regions.some(({ id }) => id === MOUNT_ATHOS_REGION_ID)).toBe(true);
      expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true, level: "municipality" })).toEqual(
        regions,
      );
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
      const regions = getAdministrativeRegions({ level: "region" });

      expect(regions[0]).toEqual({
        id: 1,
        iso31662: "GR-A",
        name: "Ανατολικής Μακεδονίας και Θράκης",
        seat: "Κομοτηνή",
      });
      expect(regions.every((region) => !("units" in region))).toBe(true);
    });

    it("returns unit level data without municipalities (Greek)", () => {
      const regions = getAdministrativeRegions({ level: "unit" });

      expect(regions[0]).toMatchObject({
        id: 1,
        iso31662: "GR-A",
        name: "Ανατολικής Μακεδονίας και Θράκης",
        seat: "Κομοτηνή",
      });
      const firstRegion = regions[0];
      if (firstRegion && "units" in firstRegion) {
        expect(firstRegion.units[0]).toMatchObject({
          id: 1,
          name: "Δράμας",
          seat: "Δράμα",
          region: { id: 1, iso31662: "GR-A" },
        });
      }
      expect(
        regions.every(
          (region) =>
            "units" in region &&
            Array.isArray(region.units) &&
            region.units.every((unit) => !("municipalities" in unit)),
        ),
      ).toBe(true);
    });

    it("returns municipality level data with full nesting (Greek)", () => {
      const regions = getAdministrativeRegions({ level: "municipality" });

      expect(regions).toEqual(getAdministrativeRegions());
      const firstRegion = regions[0];
      if (firstRegion && "units" in firstRegion) {
        const firstUnit = firstRegion.units[0];
        if (firstUnit && "municipalities" in firstUnit) {
          expect(firstUnit.municipalities[0]).toMatchObject({ id: 1, name: "Δοξάτου" });
        }
      }
    });

    it("returns region level data without units (English)", () => {
      const regions = getAdministrativeRegions({ locale: "en", level: "region" });

      expect(regions[0]).toEqual({
        id: 1,
        iso31662: "GR-A",
        name: "Eastern Macedonia and Thrace",
        seat: "Komotini",
      });
      expect(regions.every((region) => !("units" in region))).toBe(true);
    });

    it("returns unit level data without municipalities (English)", () => {
      const regions = getAdministrativeRegions({ locale: "en", level: "unit" });

      expect(regions[0]).toMatchObject({
        id: 1,
        iso31662: "GR-A",
        name: "Eastern Macedonia and Thrace",
        seat: "Komotini",
      });
      const firstRegion = regions[0];
      if (firstRegion && "units" in firstRegion) {
        expect(firstRegion.units[0]).toMatchObject({
          id: 1,
          name: "Drama",
          seat: "Drama",
          region: { id: 1, iso31662: "GR-A" },
        });
      }
      expect(
        regions.every(
          (region) =>
            "units" in region &&
            Array.isArray(region.units) &&
            region.units.every((unit) => !("municipalities" in unit)),
        ),
      ).toBe(true);
    });

    it("returns municipality level data with full nesting (English)", () => {
      const regions = getAdministrativeRegions({ locale: "en", level: "municipality" });

      const firstRegion = regions[0];
      if (firstRegion && "units" in firstRegion) {
        const firstUnit = firstRegion.units[0];
        if (firstUnit && "municipalities" in firstUnit) {
          expect(firstUnit.municipalities[0]).toMatchObject({ id: 1, name: "Doxato" });
        }
      }
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
      const regions = getAdministrativeRegions({ locale: "el" });

      expect(regions[0]?.name).toBe("Ανατολικής Μακεδονίας και Θράκης");
      expect(getAdministrativeRegions({ locale: "el", includeMountAthos: false })).toEqual(regions);
      expect(getAdministrativeRegions({ locale: "el", level: "municipality" })).toEqual(regions);
    });

    it("returns English data when locale is 'en'", () => {
      const regions = getAdministrativeRegions({ locale: "en" });

      expect(regions[0]?.name).toBe("Eastern Macedonia and Thrace");
      expect(getAdministrativeRegions({ locale: "en", includeMountAthos: false })).toEqual(regions);
      expect(getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(regions);
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
      const originalRegions = getAdministrativeRegions({ includeMountAthos: true });
      const originalLength = originalRegions.length;
      const originalFirstRegion = originalRegions[0];
      const originalFirstRegionUnitsLength =
        originalFirstRegion && "units" in originalFirstRegion ? originalFirstRegion.units.length : undefined;

      getAdministrativeRegions({ includeMountAthos: false });

      const currentRegions = getAdministrativeRegions({ includeMountAthos: true });
      expect(currentRegions).toBe(originalRegions);
      expect(currentRegions.length).toBe(originalLength);
      const currentFirstRegion = currentRegions[0];
      expect(currentFirstRegion).toBe(originalFirstRegion);
      if (currentFirstRegion && "units" in currentFirstRegion) {
        expect(currentFirstRegion.units.length).toBe(originalFirstRegionUnitsLength);
      }
    });

    it("does not mutate original data when filtering to region level", () => {
      const originalFirstRegion = getAdministrativeRegions({ includeMountAthos: true })[0];
      if (!originalFirstRegion || !("units" in originalFirstRegion)) return;
      const originalUnitsLength = originalFirstRegion.units.length;

      getAdministrativeRegions({ level: "region" });

      const currentFirstRegion = getAdministrativeRegions({ includeMountAthos: true })[0];
      if (currentFirstRegion && "units" in currentFirstRegion) {
        expect(currentFirstRegion.units.length).toBe(originalUnitsLength);
      }
    });

    it("does not mutate original data when filtering to unit level", () => {
      const originalFirstRegion = getAdministrativeRegions({ includeMountAthos: true })[0];
      if (!originalFirstRegion || !("units" in originalFirstRegion)) return;
      const originalFirstUnit = originalFirstRegion.units[0];
      if (!originalFirstUnit) return;
      if (!("municipalities" in originalFirstUnit)) return;
      const originalMunicipalitiesLength = originalFirstUnit.municipalities.length;

      getAdministrativeRegions({ level: "unit" });

      const currentFirstRegion = getAdministrativeRegions({ includeMountAthos: true })[0];
      if (currentFirstRegion && "units" in currentFirstRegion) {
        const currentFirstUnit = currentFirstRegion.units[0];
        if (currentFirstUnit && "municipalities" in currentFirstUnit) {
          expect(currentFirstUnit.municipalities.length).toBe(originalMunicipalitiesLength);
        }
      }
    });

    it("does not mutate English data when filtering", () => {
      const originalRegions = getAdministrativeRegions({ locale: "en", includeMountAthos: true });
      const originalLength = originalRegions.length;
      const originalFirstRegion = originalRegions[0];

      getAdministrativeRegions({ locale: "en", includeMountAthos: false });
      getAdministrativeRegions({ locale: "en", level: "region" });

      const currentRegions = getAdministrativeRegions({ locale: "en", includeMountAthos: true });
      expect(currentRegions.length).toBe(originalLength);
      const currentFirstRegion = currentRegions[0];
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
