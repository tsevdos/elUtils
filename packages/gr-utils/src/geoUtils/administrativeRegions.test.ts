/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  administrativeRegions,
  administrativeRegionsWithoutMountAthos,
  getAdministrativeRegions,
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
