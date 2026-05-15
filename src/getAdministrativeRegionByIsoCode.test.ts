import { getAdministrativeRegionByIsoCode } from "./getAdministrativeRegionByIsoCode";
import { getAdministrativeRegions } from "./getAdministrativeRegions";
import type { Region, Unit } from "./types";

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

describe("getAdministrativeRegionByIsoCode", () => {
  it("correctly returns region with default values (in greek language)", () => {
    const expectedData = greekAdministrativeRegionsWithoutMountAthos[0];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-A" })).toEqual(expectedData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-A", locale: "el" })).toEqual(expectedData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-A", includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-A", level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(
      getAdministrativeRegionByIsoCode({
        isocode: "GR-A",
        locale: "el",
        includeMountAthos: false,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns Mount Athos region (in greek language)", () => {
    const expectedData = greekAdministrativeRegionsWithMountAthos[13];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-69", includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-69", locale: "el", includeMountAthos: true })).toEqual(
      expectedData,
    );
    expect(
      getAdministrativeRegionByIsoCode({
        isocode: "GR-69",
        locale: "el",
        includeMountAthos: true,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns region data with correct level (in greek language)", () => {
    const expectedRegionLevelData = (greekAdministrativeRegionsWithoutMountAthos as Region[]).map(
      ({ units: _units, ...region }) => region,
    )[7];
    const expectedUnitLevelData = (greekAdministrativeRegionsWithoutMountAthos as Region[]).map((region) => ({
      ...region,
      units: (region.units as Unit[]).map(({ municipalities: _municipalities, ...unit }) => unit),
    }))[7];
    const expectedMunicipalityLevelData = greekAdministrativeRegionsWithoutMountAthos[7];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "region" })).toStrictEqual(
      expectedRegionLevelData,
    );
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });

  it("correctly returns region (in english language)", () => {
    const expectedData = englishAdministrativeRegionsWithoutMountAthos[3];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en" })).toEqual(expectedData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en", includeMountAthos: false })).toEqual(
      expectedData,
    );
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en", level: "municipality" })).toEqual(
      expectedData,
    );
    // all default options
    expect(
      getAdministrativeRegionByIsoCode({
        isocode: "GR-D",
        locale: "en",
        includeMountAthos: false,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns Mount Athos region (in english language)", () => {
    const expectedData = englishAdministrativeRegionsWithMountAthos[13];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-69", locale: "en", includeMountAthos: true })).toEqual(
      expectedData,
    );
    expect(
      getAdministrativeRegionByIsoCode({
        isocode: "GR-69",
        locale: "en",
        includeMountAthos: true,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns region data with correct level (in english language)", () => {
    const expectedRegionLevelData = (englishAdministrativeRegionsWithMountAthos as Region[]).map(
      ({ units: _units, ...region }) => region,
    )[5];
    const expectedUnitLevelData = (englishAdministrativeRegionsWithMountAthos as Region[]).map((region) => ({
      ...region,
      units: (region.units as Unit[]).map(({ municipalities: _municipalities, ...unit }) => unit),
    }))[5];
    const expectedMunicipalityLevelData = englishAdministrativeRegionsWithMountAthos[5];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "region" })).toStrictEqual(
      expectedRegionLevelData,
    );
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "unit" })).toStrictEqual(
      expectedUnitLevelData,
    );
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });

  it("correctly returns region data with correct level (in english language without Mount Athos)", () => {
    const expectedRegionLevelData = (englishAdministrativeRegionsWithoutMountAthos as Region[]).map(
      ({ units: _units, ...region }) => region,
    )[2];
    const expectedUnitLevelData = (englishAdministrativeRegionsWithoutMountAthos as Region[]).map((region) => ({
      ...region,
      units: (region.units as Unit[]).map(({ municipalities: _municipalities, ...unit }) => unit),
    }))[2];
    const expectedMunicipalityLevelData = englishAdministrativeRegionsWithoutMountAthos[2];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-C", locale: "en", level: "region" })).toStrictEqual(
      expectedRegionLevelData,
    );
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-C", locale: "en", level: "unit" })).toStrictEqual(
      expectedUnitLevelData,
    );
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-C", locale: "en", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
    expect(
      getAdministrativeRegionByIsoCode({
        isocode: "GR-C",
        locale: "en",
        includeMountAthos: false,
        level: "municipality",
      }),
    ).toStrictEqual(expectedMunicipalityLevelData);
  });

  it("returns undefined for non-existent ISO codes", () => {
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-Z" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-ZZ" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-99" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-ABC" })).toBeUndefined();
  });

  it("returns undefined for invalid ISO code formats", () => {
    expect(getAdministrativeRegionByIsoCode({ isocode: "INVALID" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "A" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GRA" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "" })).toBeUndefined();
  });

  it("is case-sensitive for ISO codes", () => {
    const expectedData = greekAdministrativeRegionsWithoutMountAthos[0];

    // Correct case works
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-A" })).toEqual(expectedData);

    // Wrong case returns undefined
    expect(getAdministrativeRegionByIsoCode({ isocode: "gr-a" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "Gr-A" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-a" })).toBeUndefined();
  });

  it("returns undefined for Mount Athos when includeMountAthos is false", () => {
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-69", includeMountAthos: false })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-69" })).toBeUndefined(); // default is false
  });

  it("correctly handles all valid Greek ISO codes without Mount Athos", () => {
    const validIsoCodes = [
      "GR-A",
      "GR-B",
      "GR-C",
      "GR-D",
      "GR-E",
      "GR-F",
      "GR-G",
      "GR-H",
      "GR-I",
      "GR-J",
      "GR-K",
      "GR-L",
      "GR-M",
    ];

    for (const isocode of validIsoCodes) {
      const result = getAdministrativeRegionByIsoCode({ isocode });
      expect(result).toBeDefined();
      expect(result?.iso31662).toBe(isocode);
    }
  });

  it("correctly handles all valid Greek ISO codes with Mount Athos", () => {
    const validIsoCodesWithMountAthos = [
      "GR-A",
      "GR-B",
      "GR-C",
      "GR-D",
      "GR-E",
      "GR-F",
      "GR-G",
      "GR-H",
      "GR-I",
      "GR-J",
      "GR-K",
      "GR-L",
      "GR-M",
      "GR-69",
    ];

    for (const isocode of validIsoCodesWithMountAthos) {
      const result = getAdministrativeRegionByIsoCode({ isocode, includeMountAthos: true });
      expect(result).toBeDefined();
      expect(result?.iso31662).toBe(isocode);
    }
  });

  it("returns correct data structure based on level parameter", () => {
    const regionLevel = getAdministrativeRegionByIsoCode({ isocode: "GR-A", level: "region" });
    const unitLevel = getAdministrativeRegionByIsoCode({ isocode: "GR-A", level: "unit" });
    const municipalityLevel = getAdministrativeRegionByIsoCode({ isocode: "GR-A", level: "municipality" });

    // Region level should not have units property
    expect(regionLevel).toBeDefined();
    expect(regionLevel).not.toHaveProperty("units");

    // Unit level should have units without municipalities
    expect(unitLevel).toBeDefined();
    expect(unitLevel).toHaveProperty("units");
    expect((unitLevel as Region)?.units[0]).not.toHaveProperty("municipalities");

    // Municipality level should have full structure
    expect(municipalityLevel).toBeDefined();
    expect(municipalityLevel).toHaveProperty("units");
    expect((municipalityLevel as Region)?.units[0]).toHaveProperty("municipalities");
  });

  it("returns same region for same ISO code across different levels (with different structure)", () => {
    const regionLevel = getAdministrativeRegionByIsoCode({ isocode: "GR-B", level: "region" });
    const unitLevel = getAdministrativeRegionByIsoCode({ isocode: "GR-B", level: "unit" });
    const municipalityLevel = getAdministrativeRegionByIsoCode({ isocode: "GR-B", level: "municipality" });

    // All should have same basic properties
    expect(regionLevel?.id).toBe(unitLevel?.id);
    expect(regionLevel?.id).toBe(municipalityLevel?.id);
    expect(regionLevel?.iso31662).toBe("GR-B");
    expect(unitLevel?.iso31662).toBe("GR-B");
    expect(municipalityLevel?.iso31662).toBe("GR-B");
  });

  it("returns data in correct locale", () => {
    const greekRegion = getAdministrativeRegionByIsoCode({ isocode: "GR-A", locale: "el" });
    const englishRegion = getAdministrativeRegionByIsoCode({ isocode: "GR-A", locale: "en" });

    expect(greekRegion).toBeDefined();
    expect(englishRegion).toBeDefined();

    // Names should be different based on locale
    expect(greekRegion?.name).not.toBe(englishRegion?.name);
    // But ID and ISO code should be the same
    expect(greekRegion?.id).toBe(englishRegion?.id);
    expect(greekRegion?.iso31662).toBe(englishRegion?.iso31662);
  });

  it("handles all combinations of options for Mount Athos", () => {
    // Greek locale, region level
    const greekRegionLevel = getAdministrativeRegionByIsoCode({
      isocode: "GR-69",
      locale: "el",
      includeMountAthos: true,
      level: "region",
    });
    expect(greekRegionLevel).toBeDefined();
    expect(greekRegionLevel?.iso31662).toBe("GR-69");
    expect(greekRegionLevel).not.toHaveProperty("units");

    // English locale, unit level
    const englishUnitLevel = getAdministrativeRegionByIsoCode({
      isocode: "GR-69",
      locale: "en",
      includeMountAthos: true,
      level: "unit",
    });
    expect(englishUnitLevel).toBeDefined();
    expect(englishUnitLevel?.iso31662).toBe("GR-69");
    expect(englishUnitLevel).toHaveProperty("units");

    // Municipality level
    const municipalityLevel = getAdministrativeRegionByIsoCode({
      isocode: "GR-69",
      includeMountAthos: true,
      level: "municipality",
    });
    expect(municipalityLevel).toBeDefined();
    expect(municipalityLevel?.iso31662).toBe("GR-69");
  });

  it("handles boundary ISO codes correctly", () => {
    // First region
    const firstRegion = getAdministrativeRegionByIsoCode({ isocode: "GR-A" });
    expect(firstRegion).toBeDefined();
    expect(firstRegion?.iso31662).toBe("GR-A");

    // Last regular region
    const lastRegion = getAdministrativeRegionByIsoCode({ isocode: "GR-M" });
    expect(lastRegion).toBeDefined();
    expect(lastRegion?.iso31662).toBe("GR-M");

    // Special case Mount Athos (when included)
    const mountAthos = getAdministrativeRegionByIsoCode({ isocode: "GR-69", includeMountAthos: true });
    expect(mountAthos).toBeDefined();
    expect(mountAthos?.iso31662).toBe("GR-69");
  });

  it("returns undefined for ISO codes with extra whitespace or special characters", () => {
    expect(getAdministrativeRegionByIsoCode({ isocode: " GR-A" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-A " })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: " GR-A " })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR- A" })).toBeUndefined();
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-A\n" })).toBeUndefined();
  });

  it("returns consistent results across multiple calls with same parameters", () => {
    const call1 = getAdministrativeRegionByIsoCode({ isocode: "GR-C", locale: "el", level: "municipality" });
    const call2 = getAdministrativeRegionByIsoCode({ isocode: "GR-C", locale: "el", level: "municipality" });
    const call3 = getAdministrativeRegionByIsoCode({ isocode: "GR-C", locale: "el", level: "municipality" });

    expect(call1).toEqual(call2);
    expect(call2).toEqual(call3);
    expect(call1).toEqual(call3);
  });
});
