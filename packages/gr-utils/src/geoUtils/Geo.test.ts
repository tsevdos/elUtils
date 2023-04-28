/* eslint-disable @typescript-eslint/no-unused-vars */
import regionsEl from "../../data/administrative-regions-el.json";
import regionsEn from "../../data/administrative-regions-en.json";
import { Geo } from "./Geo";

const administrativeRegions = {
  el: regionsEl,
  en: regionsEn,
};

const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== Geo.MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== Geo.MOUNT_ATHOS_REGION_ID),
};

describe("Geo Singleton class", () => {
  describe("method getAdministrativeRegions:", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el;

      expect(Geo.getAdministrativeRegions()).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions({ locale: "el" })).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions({ includeMountAthos: false })).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions({ level: "municipality" })).toEqual(expectedData);
      // all default options
      expect(Geo.getAdministrativeRegions({ locale: "el", includeMountAthos: false, level: "municipality" })).toEqual(
        expectedData,
      );
      expect(Geo.getAdministrativeRegions().length).toEqual(13);
    });

    it("correctly returns data including Mount Athos (in greek language)", () => {
      const expectedData = administrativeRegions.el;

      expect(Geo.getAdministrativeRegions({ includeMountAthos: true })).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions({ locale: "el", includeMountAthos: true })).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions({ locale: "el", includeMountAthos: true, level: "municipality" })).toEqual(
        expectedData,
      );
      expect(Geo.getAdministrativeRegions({ includeMountAthos: true }).length).toEqual(14);
    });

    it("correctly returns data depending the level (in greek language)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(({ units, ...region }) => region);
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities, ...unit }) => unit),
      }));
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el;

      expect(Geo.getAdministrativeRegions({ level: "region" })).toEqual(expectedRegionLevelData);
      expect(Geo.getAdministrativeRegions({ level: "unit" })).toEqual(expectedUnitLevelData);
      expect(Geo.getAdministrativeRegions({ level: "municipality" })).toEqual(expectedMunicipalityLevelData);
    });

    it("correctly returns data (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en;

      expect(Geo.getAdministrativeRegions({ locale: "en" })).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions({ locale: "en", includeMountAthos: false })).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions().length).toEqual(13);
    });

    it("correctly returns data including Mount Athos (in english language)", () => {
      const expectedData = administrativeRegions.en;

      expect(Geo.getAdministrativeRegions({ locale: "en", includeMountAthos: true })).toEqual(expectedData);
      expect(Geo.getAdministrativeRegions({ locale: "en", includeMountAthos: true, level: "municipality" })).toEqual(
        expectedData,
      );
      expect(Geo.getAdministrativeRegions({ locale: "en", includeMountAthos: true }).length).toEqual(14);
    });

    it("correctly returns data depending the level (in english language)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(({ units, ...region }) => region);
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities, ...unit }) => unit),
      }));

      expect(Geo.getAdministrativeRegions({ locale: "en", level: "region" })).toEqual(expectedRegionLevelData);
      expect(Geo.getAdministrativeRegions({ locale: "en", level: "unit" })).toEqual(expectedUnitLevelData);
      expect(Geo.getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(
        administrativeRegionsWithoutMountAthos.en,
      );
    });
  });
});
