import { getAdministrativeRegionById } from "./getAdministrativeRegionById";
import { getAdministrativeRegions } from "./getAdministrativeRegions";

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
    const expectedRegionLevelData = greekAdministrativeRegionsWithoutMountAthos.map(
      ({ units: _units, ...region }) => region,
    )[7];
    const expectedUnitLevelData = greekAdministrativeRegionsWithoutMountAthos.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
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
    const expectedRegionLevelData = englishAdministrativeRegionsWithoutMountAthos.map(
      ({ units: _units, ...region }) => region,
    )[5];
    const expectedUnitLevelData = englishAdministrativeRegionsWithoutMountAthos.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
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
});
