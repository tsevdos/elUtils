/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  administrativeRegions,
  administrativeRegionsWithoutMountAthos,
  getAdministrativeRegions,
  getAdministrativeRegionById,
  getAdministrativeRegionByIsoCode,
} from "./administrativeRegions";

describe("getAdministrativeRegions", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.el;

    expect(getAdministrativeRegions()).toBe(expectedData);
    expect(getAdministrativeRegions({ locale: "el" })).toBe(expectedData);
    expect(getAdministrativeRegions({ includeMountAthos: false })).toBe(expectedData);
    expect(getAdministrativeRegions({ level: "municipality" })).toBe(expectedData);
    // all default options
    expect(getAdministrativeRegions({ locale: "el", includeMountAthos: false, level: "municipality" })).toBe(
      expectedData,
    );

    expect(getAdministrativeRegions().length).toBe(13);
  });

  it("correctly returns data including Mount Athos (in greek language)", () => {
    const expectedData = administrativeRegions.el;

    expect(getAdministrativeRegions({ includeMountAthos: true })).toBe(expectedData);
    expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true })).toBe(expectedData);
    expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true, level: "municipality" })).toBe(
      expectedData,
    );

    expect(getAdministrativeRegions({ includeMountAthos: true }).length).toBe(14);
  });

  it("correctly returns data depending the level (in greek language)", () => {
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(({ units, ...region }) => region);
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities, ...unit }) => unit),
    }));
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el;

    expect(getAdministrativeRegions({ level: "region" })).toStrictEqual(expectedRegionLevelData);
    expect(getAdministrativeRegions({ level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegions({ level: "municipality" })).toStrictEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.en;

    expect(getAdministrativeRegions({ locale: "en" })).toBe(expectedData);
    expect(getAdministrativeRegions({ locale: "en", includeMountAthos: false })).toBe(expectedData);
    expect(getAdministrativeRegions({ locale: "en", level: "municipality" })).toBe(expectedData);

    expect(getAdministrativeRegions().length).toBe(13);
  });

  it("correctly returns data including Mount Athos (in english language)", () => {
    const expectedData = administrativeRegions.en;

    expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true })).toBe(expectedData);
    expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true, level: "municipality" })).toBe(
      expectedData,
    );

    expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true }).length).toBe(14);
  });

  it("correctly returns data depending the level (in english language)", () => {
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(({ units, ...region }) => region);
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities, ...unit }) => unit),
    }));

    expect(getAdministrativeRegions({ locale: "en", level: "region" })).toStrictEqual(expectedRegionLevelData);
    expect(getAdministrativeRegions({ locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegions({ locale: "en", level: "municipality" })).toStrictEqual(
      administrativeRegionsWithoutMountAthos.en,
    );
  });
});

describe("getAdministrativeRegionById", () => {
  it("correctly returns region with default values (in greek language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.el[0];

    expect(getAdministrativeRegionById()).toBe(expectedData);
    expect(getAdministrativeRegionById({ id: 1 })).toBe(expectedData);
    expect(getAdministrativeRegionById({ locale: "el" })).toBe(expectedData);
    expect(getAdministrativeRegionById({ includeMountAthos: false })).toBe(expectedData);
    expect(getAdministrativeRegionById({ level: "municipality" })).toBe(expectedData);
    // all default options
    expect(getAdministrativeRegionById({ id: 1, locale: "el", includeMountAthos: false, level: "municipality" })).toBe(
      expectedData,
    );
  });

  it("correctly returns Mount Athos region (in greek language)", () => {
    const expectedData = administrativeRegions.el[13];

    expect(getAdministrativeRegionById({ id: 14, includeMountAthos: true })).toBe(expectedData);
    expect(getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true })).toBe(expectedData);
    expect(getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true, level: "municipality" })).toBe(
      expectedData,
    );
  });

  it("correctly returns region data with correct level (in greek language)", () => {
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(({ units, ...region }) => region)[7];
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities, ...unit }) => unit),
    }))[7];
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el[7];

    expect(getAdministrativeRegionById({ id: 8, level: "region" })).toStrictEqual(expectedRegionLevelData);
    expect(getAdministrativeRegionById({ id: 8, level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegionById({ id: 8, level: "municipality" })).toStrictEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns region (in english language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.en[3];

    expect(getAdministrativeRegionById({ id: 4, locale: "en" })).toBe(expectedData);
    expect(getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false })).toBe(expectedData);
    expect(getAdministrativeRegionById({ id: 4, locale: "en", level: "municipality" })).toBe(expectedData);
    // all default options
    expect(getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false, level: "municipality" })).toBe(
      expectedData,
    );
  });

  it("correctly returns Mount Athos region (in english language)", () => {
    const expectedData = administrativeRegions.en[13];

    expect(getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true })).toBe(expectedData);
    expect(getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true, level: "municipality" })).toBe(
      expectedData,
    );
  });

  it("correctly returns region data with correct level (in english language)", () => {
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(({ units, ...region }) => region)[5];
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities, ...unit }) => unit),
    }))[5];
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en[5];

    expect(getAdministrativeRegionById({ id: 6, locale: "en", level: "region" })).toStrictEqual(
      expectedRegionLevelData,
    );
    expect(getAdministrativeRegionById({ id: 6, locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegionById({ id: 6, locale: "en", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });
});

describe("getAdministrativeRegionByIsoCode", () => {
  it("correctly returns region with default values (in greek language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.el[0];

    expect(getAdministrativeRegionByIsoCode()).toBe(expectedData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-A" })).toBe(expectedData);
    expect(getAdministrativeRegionByIsoCode({ locale: "el" })).toBe(expectedData);
    expect(getAdministrativeRegionByIsoCode({ includeMountAthos: false })).toBe(expectedData);
    expect(getAdministrativeRegionByIsoCode({ level: "municipality" })).toBe(expectedData);
    // all default options
    expect(
      getAdministrativeRegionByIsoCode({
        isocode: "GR-A",
        locale: "el",
        includeMountAthos: false,
        level: "municipality",
      }),
    ).toBe(expectedData);
  });

  it("correctly returns Mount Athos region (in greek language)", () => {
    const expectedData = administrativeRegions.el[13];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-69", includeMountAthos: true })).toBe(expectedData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-69", locale: "el", includeMountAthos: true })).toBe(
      expectedData,
    );
    expect(
      getAdministrativeRegionByIsoCode({
        isocode: "GR-69",
        locale: "el",
        includeMountAthos: true,
        level: "municipality",
      }),
    ).toBe(expectedData);
  });

  it("correctly returns region data with correct level (in greek language)", () => {
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(({ units, ...region }) => region)[7];
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities, ...unit }) => unit),
    }))[7];
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el[7];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "region" })).toStrictEqual(
      expectedRegionLevelData,
    );
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });

  it("correctly returns region (in english language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.en[3];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en" })).toBe(expectedData);
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en", includeMountAthos: false })).toBe(
      expectedData,
    );
    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en", level: "municipality" })).toBe(
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
    ).toBe(expectedData);
  });

  it("correctly returns Mount Athos region (in english language)", () => {
    const expectedData = administrativeRegions.en[13];

    expect(getAdministrativeRegionByIsoCode({ isocode: "GR-69", locale: "en", includeMountAthos: true })).toBe(
      expectedData,
    );
    expect(
      getAdministrativeRegionByIsoCode({
        isocode: "GR-69",
        locale: "en",
        includeMountAthos: true,
        level: "municipality",
      }),
    ).toBe(expectedData);
  });

  it("correctly returns region data with correct level (in english language)", () => {
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(({ units, ...region }) => region)[5];
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities, ...unit }) => unit),
    }))[5];
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en[5];

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
});
