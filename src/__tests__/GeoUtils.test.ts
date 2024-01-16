import administrativeRegionsEl from "../../data/administrative-regions-el.json";
import administrativeRegionsEn from "../../data/administrative-regions-en.json";
import geographicRegionsEl from "../../data/geographic-regions-el.json";
import geographicRegionsEn from "../../data/geographic-regions-en.json";
import prefecturesEl from "../../data/prefectures-el.json";
import prefecturesEn from "../../data/prefectures-en.json";
import { GeoUtils } from "../GeoUtils";

const administrativeRegions = { el: administrativeRegionsEl, en: administrativeRegionsEn };
const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== GeoUtils.MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== GeoUtils.MOUNT_ATHOS_REGION_ID),
};
const geographicRegions = { el: geographicRegionsEl, en: geographicRegionsEn };
const prefectures = { el: prefecturesEl, en: prefecturesEn };
export const prefecturesWithoutMountAthos = {
  el: prefectures.el.filter(({ id }) => id !== GeoUtils.MOUNT_ATHOS_PREFECTURE_ID),
  en: prefectures.en.filter(({ id }) => id !== GeoUtils.MOUNT_ATHOS_PREFECTURE_ID),
};

describe("Geo singleton object", () => {
  describe("getAdministrativeRegions", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el;

      expect(GeoUtils.getAdministrativeRegions()).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions({ locale: "el" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions({ includeMountAthos: false })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions({ level: "municipality" })).toEqual(expectedData);
      // all default options
      expect(
        GeoUtils.getAdministrativeRegions({ locale: "el", includeMountAthos: false, level: "municipality" }),
      ).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions().length).toEqual(13);
    });

    it("correctly returns data including Mount Athos (in greek language)", () => {
      const expectedData = administrativeRegions.el;

      expect(GeoUtils.getAdministrativeRegions({ includeMountAthos: true })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions({ locale: "el", includeMountAthos: true })).toEqual(expectedData);
      expect(
        GeoUtils.getAdministrativeRegions({ locale: "el", includeMountAthos: true, level: "municipality" }),
      ).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions({ includeMountAthos: true }).length).toEqual(14);
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

      expect(GeoUtils.getAdministrativeRegions({ level: "region" })).toEqual(expectedRegionLevelData);
      expect(GeoUtils.getAdministrativeRegions({ level: "unit" })).toEqual(expectedUnitLevelData);
      expect(GeoUtils.getAdministrativeRegions({ level: "municipality" })).toEqual(expectedMunicipalityLevelData);
    });

    it("correctly returns data (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en;

      expect(GeoUtils.getAdministrativeRegions({ locale: "en" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions({ locale: "en", includeMountAthos: false })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions().length).toEqual(13);
    });

    it("correctly returns data including Mount Athos (in english language)", () => {
      const expectedData = administrativeRegions.en;

      expect(GeoUtils.getAdministrativeRegions({ locale: "en", includeMountAthos: true })).toEqual(expectedData);
      expect(
        GeoUtils.getAdministrativeRegions({ locale: "en", includeMountAthos: true, level: "municipality" }),
      ).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegions({ locale: "en", includeMountAthos: true }).length).toEqual(14);
    });

    it("correctly returns data depending the level (in english language)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(
        ({ units: _units, ...region }) => region,
      );
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      }));

      expect(GeoUtils.getAdministrativeRegions({ locale: "en", level: "region" })).toEqual(expectedRegionLevelData);
      expect(GeoUtils.getAdministrativeRegions({ locale: "en", level: "unit" })).toEqual(expectedUnitLevelData);
      expect(GeoUtils.getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(
        administrativeRegionsWithoutMountAthos.en,
      );
    });
  });

  describe("getAdministrativeRegionById", () => {
    it("correctly returns region with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el[0];

      expect(GeoUtils.getAdministrativeRegionById({ id: 1 })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegionById({ id: 1, locale: "el" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegionById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegionById({ id: 1, level: "municipality" })).toEqual(expectedData);
      // all default options
      expect(
        GeoUtils.getAdministrativeRegionById({ id: 1, locale: "el", includeMountAthos: false, level: "municipality" }),
      ).toEqual(expectedData);
    });

    it("correctly returns Mount Athos region (in greek language)", () => {
      const expectedData = administrativeRegions.el[13];

      expect(GeoUtils.getAdministrativeRegionById({ id: 14, includeMountAthos: true })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true })).toEqual(
        expectedData,
      );
      expect(
        GeoUtils.getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true, level: "municipality" }),
      ).toEqual(expectedData);
    });

    it("correctly returns region data with correct level (in greek language)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(
        ({ units: _units, ...region }) => region,
      )[7];
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      }))[7];
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el[7];

      expect(GeoUtils.getAdministrativeRegionById({ id: 8, level: "region" })).toStrictEqual(expectedRegionLevelData);
      expect(GeoUtils.getAdministrativeRegionById({ id: 8, level: "unit" })).toStrictEqual(expectedUnitLevelData);
      expect(GeoUtils.getAdministrativeRegionById({ id: 8, level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });

    it("correctly returns region (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en[3];

      expect(GeoUtils.getAdministrativeRegionById({ id: 4, locale: "en" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false })).toEqual(
        expectedData,
      );
      expect(GeoUtils.getAdministrativeRegionById({ id: 4, locale: "en", level: "municipality" })).toEqual(
        expectedData,
      );
      // all default options
      expect(
        GeoUtils.getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false, level: "municipality" }),
      ).toEqual(expectedData);
    });

    it("correctly returns Mount Athos region (in english language)", () => {
      const expectedData = administrativeRegions.en[13];

      expect(GeoUtils.getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true })).toEqual(
        expectedData,
      );
      expect(
        GeoUtils.getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true, level: "municipality" }),
      ).toEqual(expectedData);
    });

    it("correctly returns region data with correct level (in english language)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(
        ({ units: _units, ...region }) => region,
      )[5];
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      }))[5];
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en[5];

      expect(GeoUtils.getAdministrativeRegionById({ id: 6, locale: "en", level: "region" })).toStrictEqual(
        expectedRegionLevelData,
      );
      expect(GeoUtils.getAdministrativeRegionById({ id: 6, locale: "en", level: "unit" })).toStrictEqual(
        expectedUnitLevelData,
      );
      expect(GeoUtils.getAdministrativeRegionById({ id: 6, locale: "en", level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });
  });

  describe("getAdministrativeRegionByIsoCode", () => {
    it("correctly returns region with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el[0];

      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-A" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-A", locale: "el" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-A", includeMountAthos: false })).toEqual(
        expectedData,
      );
      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-A", level: "municipality" })).toEqual(
        expectedData,
      );
      // all default options
      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({
          isocode: "GR-A",
          locale: "el",
          includeMountAthos: false,
          level: "municipality",
        }),
      ).toEqual(expectedData);
    });

    it("correctly returns Mount Athos region (in greek language)", () => {
      const expectedData = administrativeRegions.el[13];

      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-69", includeMountAthos: true })).toEqual(
        expectedData,
      );
      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-69", locale: "el", includeMountAthos: true }),
      ).toEqual(expectedData);
      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({
          isocode: "GR-69",
          locale: "el",
          includeMountAthos: true,
          level: "municipality",
        }),
      ).toEqual(expectedData);
    });

    it("correctly returns region data with correct level (in greek language)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(
        ({ units: _units, ...region }) => region,
      )[7];
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      }))[7];
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el[7];

      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "region" })).toStrictEqual(
        expectedRegionLevelData,
      );
      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "unit" })).toStrictEqual(
        expectedUnitLevelData,
      );
      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });

    it("correctly returns region (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en[3];

      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en" })).toEqual(expectedData);
      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en", includeMountAthos: false }),
      ).toEqual(expectedData);
      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en", level: "municipality" }),
      ).toEqual(expectedData);
      // all default options
      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({
          isocode: "GR-D",
          locale: "en",
          includeMountAthos: false,
          level: "municipality",
        }),
      ).toEqual(expectedData);
    });

    it("correctly returns Mount Athos region (in english language)", () => {
      const expectedData = administrativeRegions.en[13];

      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-69", locale: "en", includeMountAthos: true }),
      ).toEqual(expectedData);
      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({
          isocode: "GR-69",
          locale: "en",
          includeMountAthos: true,
          level: "municipality",
        }),
      ).toEqual(expectedData);
    });

    it("correctly returns region data with correct level (in english language)", () => {
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(
        ({ units: _units, ...region }) => region,
      )[5];
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      }))[5];
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en[5];

      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "region" }),
      ).toStrictEqual(expectedRegionLevelData);
      expect(GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "unit" })).toStrictEqual(
        expectedUnitLevelData,
      );
      expect(
        GeoUtils.getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "municipality" }),
      ).toStrictEqual(expectedMunicipalityLevelData);
    });
  });

  describe("getAdministrativeUnits", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [...units]);

      expect(GeoUtils.getAdministrativeUnits()).toStrictEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnits({ locale: "el" })).toStrictEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnits({ includeMountAthos: false })).toStrictEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnits({ level: "municipality" })).toStrictEqual(expectedData);
      // all default options
      expect(
        GeoUtils.getAdministrativeUnits({ locale: "el", includeMountAthos: false, level: "municipality" }),
      ).toStrictEqual(expectedData);

      expect(GeoUtils.getAdministrativeUnits().length).toBe(74);
    });

    it("correctly returns data including Mount Athos (in greek language)", () => {
      const expectedData = administrativeRegions.el.flatMap(({ units }) => [...units]);

      expect(GeoUtils.getAdministrativeUnits({ includeMountAthos: true })).toStrictEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnits({ locale: "el", includeMountAthos: true })).toStrictEqual(expectedData);
      expect(
        GeoUtils.getAdministrativeUnits({ locale: "el", includeMountAthos: true, level: "municipality" }),
      ).toStrictEqual(expectedData);

      expect(GeoUtils.getAdministrativeUnits({ includeMountAthos: true }).length).toBe(75);
    });

    it("correctly returns data depending the level (in greek language)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el
        .flatMap(({ units }) => [...units])
        .map(({ municipalities: _municipalities, ...unit }) => unit);
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [
        ...units,
      ]);

      expect(GeoUtils.getAdministrativeUnits({ level: "unit" })).toStrictEqual(expectedUnitLevelData);
      expect(GeoUtils.getAdministrativeUnits({ level: "municipality" })).toStrictEqual(expectedMunicipalityLevelData);
    });

    it("correctly returns data (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [...units]);

      expect(GeoUtils.getAdministrativeUnits({ locale: "en" })).toStrictEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnits({ locale: "en", includeMountAthos: false })).toStrictEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnits({ locale: "en", level: "municipality" })).toStrictEqual(expectedData);

      expect(GeoUtils.getAdministrativeUnits().length).toBe(74);
    });

    it("correctly returns data including Mount Athos (in english language)", () => {
      const expectedData = administrativeRegions.en.flatMap(({ units }) => [...units]);

      expect(GeoUtils.getAdministrativeUnits({ locale: "en", includeMountAthos: true })).toStrictEqual(expectedData);
      expect(
        GeoUtils.getAdministrativeUnits({ locale: "en", includeMountAthos: true, level: "municipality" }),
      ).toStrictEqual(expectedData);

      expect(GeoUtils.getAdministrativeUnits({ locale: "en", includeMountAthos: true }).length).toBe(75);
    });

    it("correctly returns data depending the level (in english language)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en
        .flatMap(({ units }) => [...units])
        .map(({ municipalities: _municipalities, ...unit }) => unit);
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [
        ...units,
      ]);

      expect(GeoUtils.getAdministrativeUnits({ locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
      expect(GeoUtils.getAdministrativeUnits({ locale: "en", level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });
  });

  describe("getAdministrativeUnitById", () => {
    it("correctly returns region with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [...units])[0];

      expect(GeoUtils.getAdministrativeUnitById({ id: 1 })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnitById({ id: 1, locale: "el" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnitById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnitById({ id: 1, level: "municipality" })).toEqual(expectedData);
      // all default options
      expect(
        GeoUtils.getAdministrativeUnitById({ id: 1, locale: "el", includeMountAthos: false, level: "municipality" }),
      ).toEqual(expectedData);
    });

    it("correctly returns Mount Athos region (in greek language)", () => {
      const expectedData = administrativeRegions.el.flatMap(({ units }) => [...units])[74];

      expect(GeoUtils.getAdministrativeUnitById({ id: 75, includeMountAthos: true })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnitById({ id: 75, locale: "el", includeMountAthos: true })).toEqual(
        expectedData,
      );
      expect(
        GeoUtils.getAdministrativeUnitById({ id: 75, locale: "el", includeMountAthos: true, level: "municipality" }),
      ).toEqual(expectedData);
    });

    it("correctly returns region data with correct level (in greek language)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el
        .flatMap(({ units }) => [...units])
        .map(({ municipalities: _municipalities, ...unit }) => unit)[15];
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [
        ...units,
      ])[15];

      expect(GeoUtils.getAdministrativeUnitById({ id: 16, level: "unit" })).toEqual(expectedUnitLevelData);
      expect(GeoUtils.getAdministrativeUnitById({ id: 16, level: "municipality" })).toEqual(
        expectedMunicipalityLevelData,
      );
    });

    it("correctly returns region (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [...units])[3];

      expect(GeoUtils.getAdministrativeUnitById({ id: 4, locale: "en" })).toEqual(expectedData);
      expect(GeoUtils.getAdministrativeUnitById({ id: 4, locale: "en", includeMountAthos: false })).toEqual(
        expectedData,
      );
      expect(GeoUtils.getAdministrativeUnitById({ id: 4, locale: "en", level: "municipality" })).toEqual(expectedData);
      // all default options
      expect(
        GeoUtils.getAdministrativeUnitById({ id: 4, locale: "en", includeMountAthos: false, level: "municipality" }),
      ).toEqual(expectedData);
    });

    it("correctly returns Mount Athos region (in english language)", () => {
      const expectedData = administrativeRegions.en.flatMap(({ units }) => [...units])[74];

      expect(GeoUtils.getAdministrativeUnitById({ id: 75, locale: "en", includeMountAthos: true })).toEqual(
        expectedData,
      );
      expect(
        GeoUtils.getAdministrativeUnitById({ id: 75, locale: "en", includeMountAthos: true, level: "municipality" }),
      ).toEqual(expectedData);
    });

    it("correctly returns region data with correct level (in english language)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en
        .flatMap(({ units }) => [...units])
        .map(({ municipalities: _municipalities, ...unit }) => unit)[25];
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [
        ...units,
      ])[25];

      expect(GeoUtils.getAdministrativeUnitById({ id: 26, locale: "en", level: "unit" })).toStrictEqual(
        expectedUnitLevelData,
      );
      expect(GeoUtils.getAdministrativeUnitById({ id: 26, locale: "en", level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });
  });

  describe("getMunicipalities", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el
        .flatMap(({ units }) => [...units])
        .flatMap(({ municipalities }) => [...municipalities]);

      expect(GeoUtils.getMunicipalities()).toStrictEqual(expectedData);
      // all default options
      expect(GeoUtils.getMunicipalities({ locale: "el" })).toStrictEqual(expectedData);

      expect(GeoUtils.getMunicipalities().length).toBe(332);
    });

    it("correctly returns data (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en
        .flatMap(({ units }) => [...units])
        .flatMap(({ municipalities }) => [...municipalities]);

      expect(GeoUtils.getMunicipalities({ locale: "en" })).toStrictEqual(expectedData);
      expect(GeoUtils.getMunicipalities({ locale: "en" }).length).toBe(332);
    });
  });

  describe("getGeographicRegions:", () => {
    it("correctly returns all geographic regions in greek language", () => {
      const expectedData = geographicRegions.el;

      expect(GeoUtils.getGeographicRegions()).toEqual(expectedData);
      expect(GeoUtils.getGeographicRegions({ locale: "el" })).toEqual(expectedData);
      expect(GeoUtils.getGeographicRegions().length).toEqual(9);
    });

    it("correctly returns all geographic regions in english language", () => {
      const expectedData = geographicRegions.en;

      expect(GeoUtils.getGeographicRegions({ locale: "en" })).toEqual(expectedData);
      expect(GeoUtils.getGeographicRegions().length).toEqual(9);
    });
  });

  describe("getGeographicRegionById:", () => {
    it("correctly returns geographic region by id (in greek language)", () => {
      const expectedData = geographicRegions.el[4];

      expect(GeoUtils.getGeographicRegionById({ id: 5 })).toEqual(expectedData);
      expect(GeoUtils.getGeographicRegionById({ id: 5, locale: "el" })).toEqual(expectedData);
    });

    it("correctly returns geographic region by id (in english language)", () => {
      const expectedData = geographicRegions.en[4];

      expect(GeoUtils.getGeographicRegionById({ id: 5, locale: "en" })).toEqual(expectedData);
    });
  });

  describe("getPrefectures", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = prefecturesWithoutMountAthos.el;

      expect(GeoUtils.getPrefectures()).toEqual(expectedData);
      expect(GeoUtils.getPrefectures({ locale: "el" })).toEqual(expectedData);
      expect(GeoUtils.getPrefectures({ includeMountAthos: false })).toEqual(expectedData);
      expect(GeoUtils.getPrefectures({ locale: "el", includeMountAthos: false })).toEqual(expectedData);
      expect(GeoUtils.getPrefectures().length).toBe(54);
    });

    it("correctly returns data including Mount Athos (in greek language)", () => {
      const expectedData = prefectures.el;

      expect(GeoUtils.getPrefectures({ includeMountAthos: true })).toEqual(expectedData);
      expect(GeoUtils.getPrefectures({ locale: "el", includeMountAthos: true })).toEqual(expectedData);
      expect(GeoUtils.getPrefectures({ includeMountAthos: true }).length).toBe(55);
    });

    it("correctly returns data (in english language)", () => {
      const expectedData = prefecturesWithoutMountAthos.en;

      expect(GeoUtils.getPrefectures({ locale: "en" })).toEqual(expectedData);
      expect(GeoUtils.getPrefectures({ locale: "en", includeMountAthos: false })).toEqual(expectedData);
      expect(GeoUtils.getPrefectures().length).toBe(54);
    });

    it("correctly returns data including Mount Athos (in english language)", () => {
      const expectedData = prefectures.en;

      expect(GeoUtils.getPrefectures({ locale: "en", includeMountAthos: true })).toEqual(expectedData);
      expect(GeoUtils.getPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(55);
    });
  });

  describe("getPrefectureById", () => {
    it("correctly returns prefecture with default values (in greek language)", () => {
      const expectedData = prefecturesWithoutMountAthos.el[0];

      expect(GeoUtils.getPrefectureById({ id: 1 })).toEqual(expectedData);
      expect(GeoUtils.getPrefectureById({ id: 1, locale: "el" })).toEqual(expectedData);
      expect(GeoUtils.getPrefectureById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
      // all default options
      expect(GeoUtils.getPrefectureById({ id: 1, locale: "el", includeMountAthos: false })).toEqual(expectedData);
    });

    it("correctly returns Mount Athos prefecture (in greek language)", () => {
      const expectedData = prefectures.el[54];

      expect(GeoUtils.getPrefectureById({ id: 55, includeMountAthos: true })).toEqual(expectedData);
      expect(GeoUtils.getPrefectureById({ id: 55, locale: "el", includeMountAthos: true })).toEqual(expectedData);
    });

    it("correctly returns prefecture (in english language)", () => {
      const expectedData = prefecturesWithoutMountAthos.en[33];

      expect(GeoUtils.getPrefectureById({ id: 34, locale: "en" })).toEqual(expectedData);
      expect(GeoUtils.getPrefectureById({ id: 34, locale: "en", includeMountAthos: false })).toEqual(expectedData);
    });

    it("correctly returns Mount Athos prefecture (in english language)", () => {
      const expectedData = prefectures.en[54];

      expect(GeoUtils.getPrefectureById({ id: 55, locale: "en", includeMountAthos: true })).toEqual(expectedData);
    });
  });

  describe("validatePostalCode", () => {
    it("returns true on existing postal codes", () => {
      expect(GeoUtils.validatePostalCode("17562")).toBe(true);
      expect(GeoUtils.validatePostalCode("30005")).toBe(true);
      expect(GeoUtils.validatePostalCode("17122")).toBe(true);
      expect(GeoUtils.validatePostalCode("25008")).toBe(true);
      expect(GeoUtils.validatePostalCode("68014")).toBe(true);
      expect(GeoUtils.validatePostalCode("27066")).toBe(true);
      expect(GeoUtils.validatePostalCode("54250")).toBe(true);
    });

    it("returns false on not existing postal codes", () => {
      expect(GeoUtils.validatePostalCode("12345")).toBe(false);
      expect(GeoUtils.validatePostalCode("11111")).toBe(false);
      expect(GeoUtils.validatePostalCode("22222")).toBe(false);
      expect(GeoUtils.validatePostalCode("99999")).toBe(false);
      expect(GeoUtils.validatePostalCode("98765")).toBe(false);
      expect(GeoUtils.validatePostalCode("56789")).toBe(false);
    });
  });

  describe("findByPostalCode", () => {
    it("correctly returns undefined in case of invalid postal code", () => {
      expect(GeoUtils.findByPostalCode("12345")).toBe(undefined);
      expect(GeoUtils.findByPostalCode("11111", { locale: "en" })).toBe(undefined);
      expect(GeoUtils.findByPostalCode("22222", { locale: "en", entity: "prefecture" })).toBe(undefined);
      expect(GeoUtils.findByPostalCode("99999", { locale: "el" })).toBe(undefined);
      expect(GeoUtils.findByPostalCode("98765")).toBe(undefined);
      expect(GeoUtils.findByPostalCode("56789", { locale: "el", entity: "prefecture" })).toBe(undefined);
    });

    it("correctly returns prefecture (en and el languages)", () => {
      expect(GeoUtils.findByPostalCode("17562")).toEqual({
        id: 1,
        name: "Νομός Αθηνών",
        seat: "Αθήνα",
        regionAndUnit: { regionId: 9, regionIso31662: "GR-I", unitId: 42 },
      });
      expect(GeoUtils.findByPostalCode("30005", { locale: "en" })).toEqual({
        id: 49,
        name: "Aetolia-Acarnania",
        seat: "Messolonghi",
        regionAndUnit: { regionId: 7, regionIso31662: "GR-G", unitId: 32 },
      });
      expect(GeoUtils.findByPostalCode("17122", { locale: "en", entity: "prefecture" })).toEqual({
        id: 1,
        name: "Athens Prefecture",
        seat: "Athens",
        regionAndUnit: { regionId: 9, regionIso31662: "GR-I", unitId: 42 },
      });
      expect(GeoUtils.findByPostalCode("25008", { locale: "el" })).toEqual({
        id: 48,
        name: "Νομός Αχαΐας",
        seat: "Πάτρα",
        regionAndUnit: {
          regionId: 7,
          regionIso31662: "GR-G",
          unitId: 33,
        },
      });
      expect(GeoUtils.findByPostalCode("68014", { locale: "el", entity: "prefecture" })).toEqual({
        id: 22,
        name: "Νομός Έβρου",
        seat: "Αλεξανδρούπολη",
        regionAndUnit: {
          regionId: 1,
          regionIso31662: "GR-A",
          unitId: 2,
        },
      });
      expect(GeoUtils.findByPostalCode("27066")).toEqual({
        id: 50,
        name: "Νομός Ηλείας",
        seat: "Πύργος",
        regionAndUnit: {
          regionId: 7,
          regionIso31662: "GR-G",
          unitId: 34,
        },
      });
      expect(GeoUtils.findByPostalCode("54250", { locale: "en" })).toEqual({
        id: 16,
        name: "Thessaloniki",
        seat: "Thessaloniki",
        regionAndUnit: {
          regionId: 2,
          regionIso31662: "GR-B",
          unitId: 8,
        },
      });
    });

    it("correctly returns region (en and el languages)", () => {
      expect(GeoUtils.findByPostalCode("17562", { entity: "region" })).toEqual({
        id: 9,
        iso31662: "GR-I",
        name: "Αττικής",
        seat: "Αθήνα",
      });
      expect(GeoUtils.findByPostalCode("30005", { locale: "en", entity: "region" })).toEqual({
        id: 7,
        iso31662: "GR-G",
        name: "Western Greece",
        seat: "Patras",
      });
      expect(GeoUtils.findByPostalCode("17122", { locale: "en", entity: "region" })).toEqual({
        id: 9,
        iso31662: "GR-I",
        name: "Attica",
        seat: "Athens",
      });
      expect(GeoUtils.findByPostalCode("25008", { locale: "el", entity: "region" })).toEqual({
        id: 7,
        iso31662: "GR-G",
        name: "Δυτικής Ελλάδας",
        seat: "Πάτρα",
      });
      expect(GeoUtils.findByPostalCode("68014", { locale: "el", entity: "region" })).toEqual({
        id: 1,
        iso31662: "GR-A",
        name: "Ανατολικής Μακεδονίας και Θράκης",
        seat: "Κομοτηνή",
      });
      expect(GeoUtils.findByPostalCode("27066", { entity: "region" })).toEqual({
        id: 7,
        iso31662: "GR-G",
        name: "Δυτικής Ελλάδας",
        seat: "Πάτρα",
      });
      expect(GeoUtils.findByPostalCode("54250", { locale: "en", entity: "region" })).toEqual({
        id: 2,
        iso31662: "GR-B",
        name: "Central Macedonia",
        seat: "Thessaloniki",
      });
    });

    it("correctly returns unit (en and el languages)", () => {
      expect(GeoUtils.findByPostalCode("17562", { entity: "unit" })).toEqual({
        id: 42,
        name: "Κεντρικού Τομέα Αθηνών",
        seat: "Αθήνα",
        region: {
          id: 9,
          iso31662: "GR-I",
        },
        carPlatesPattern: [],
      });
      expect(GeoUtils.findByPostalCode("30005", { locale: "en", entity: "unit" })).toEqual({
        id: 32,
        name: "Aetolia - Acarnania",
        seat: "Messolonghi",
        region: {
          id: 7,
          iso31662: "GR-G",
        },
        carPlatesPattern: ["AI*", "ME*"],
      });
      expect(GeoUtils.findByPostalCode("17122", { locale: "en", entity: "unit" })).toEqual({
        id: 42,
        name: "Central Athens",
        seat: "Athens",
        region: {
          id: 9,
          iso31662: "GR-I",
        },
        carPlatesPattern: [],
      });
      expect(GeoUtils.findByPostalCode("25008", { locale: "el", entity: "unit" })).toEqual({
        id: 33,
        name: "Αχαΐας",
        seat: "Πάτρα",
        region: {
          id: 7,
          iso31662: "GR-G",
        },
        carPlatesPattern: ["AX*", "AZ*"],
      });
      expect(GeoUtils.findByPostalCode("68014", { locale: "el", entity: "unit" })).toEqual({
        id: 2,
        name: "Έβρου",
        seat: "Αλεξανδρούπολη",
        region: {
          id: 1,
          iso31662: "GR-A",
        },
        carPlatesPattern: ["EB*", "MX*", "OP*"],
      });
      expect(GeoUtils.findByPostalCode("27066", { entity: "unit" })).toEqual({
        id: 34,
        name: "Ηλείας",
        seat: "Πύργος",
        region: {
          id: 7,
          iso31662: "GR-G",
        },
        carPlatesPattern: [],
      });
      expect(GeoUtils.findByPostalCode("54250", { locale: "en", entity: "unit" })).toEqual({
        id: 8,
        name: "Thessaloniki",
        seat: "Thessaloniki",
        region: {
          id: 2,
          iso31662: "GR-B",
        },
        carPlatesPattern: ["N*"],
      });
    });
  });
});
