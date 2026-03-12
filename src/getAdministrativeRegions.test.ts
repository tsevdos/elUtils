import { getAdministrativeRegions, MOUNT_ATHOS_REGION_ID } from "./getAdministrativeRegions";
import administrativeRegionsEl from "./data/administrative-regions-el.json";
import administrativeRegionsEn from "./data/administrative-regions-en.json";

const administrativeRegions = { el: administrativeRegionsEl, en: administrativeRegionsEn };
const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
};

describe("getAdministrativeRegions", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.el;

    expect(getAdministrativeRegions()).toEqual(expectedData);
    expect(getAdministrativeRegions({ locale: "el" })).toEqual(expectedData);
    expect(getAdministrativeRegions({ includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeRegions({ level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(getAdministrativeRegions({ locale: "el", includeMountAthos: false, level: "municipality" })).toEqual(
      expectedData,
    );
    expect(getAdministrativeRegions().length).toEqual(13);
  });

  it("correctly returns data including Mount Athos (in greek language)", () => {
    const expectedData = administrativeRegions.el;

    expect(getAdministrativeRegions({ includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeRegions({ locale: "el", includeMountAthos: true, level: "municipality" })).toEqual(
      expectedData,
    );
    expect(getAdministrativeRegions({ includeMountAthos: true }).length).toEqual(14);
  });

  it("correctly returns data depending the level (in greek language)", () => {
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(
      ({ units: _units, ...region }) => region,
    );
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
    }));
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el;

    expect(getAdministrativeRegions({ level: "region" })).toEqual(expectedRegionLevelData);
    expect(getAdministrativeRegions({ level: "unit" })).toEqual(expectedUnitLevelData);
    expect(getAdministrativeRegions({ level: "municipality" })).toEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.en;

    expect(getAdministrativeRegions({ locale: "en" })).toEqual(expectedData);
    expect(getAdministrativeRegions({ locale: "en", includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(expectedData);
    expect(getAdministrativeRegions().length).toEqual(13);
  });

  it("correctly returns data including Mount Athos (in english language)", () => {
    const expectedData = administrativeRegions.en;

    expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true, level: "municipality" })).toEqual(
      expectedData,
    );
    expect(getAdministrativeRegions({ locale: "en", includeMountAthos: true }).length).toEqual(14);
  });

  it("correctly returns data depending the level (in english language)", () => {
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(
      ({ units: _units, ...region }) => region,
    );
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
    }));

    expect(getAdministrativeRegions({ locale: "en", level: "region" })).toEqual(expectedRegionLevelData);
    expect(getAdministrativeRegions({ locale: "en", level: "unit" })).toEqual(expectedUnitLevelData);
    expect(getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(
      administrativeRegionsWithoutMountAthos.en,
    );
  });
});
