import regionsEl from "../../data/administrative-regions-el.json";
import regionsEn from "../../data/administrative-regions-en.json";
import { Geo } from "./Geo";

const administrativeRegions = { el: regionsEl, en: regionsEn };

const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== Geo.MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== Geo.MOUNT_ATHOS_REGION_ID),
};

describe("Geo singleton object", () => {
  describe("getAdministrativeRegions:", () => {
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
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(
        ({ units: _units, ...region }) => region,
      );
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
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
      const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(
        ({ units: _units, ...region }) => region,
      );
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
        ...region,
        units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
      }));

      expect(Geo.getAdministrativeRegions({ locale: "en", level: "region" })).toEqual(expectedRegionLevelData);
      expect(Geo.getAdministrativeRegions({ locale: "en", level: "unit" })).toEqual(expectedUnitLevelData);
      expect(Geo.getAdministrativeRegions({ locale: "en", level: "municipality" })).toEqual(
        administrativeRegionsWithoutMountAthos.en,
      );
    });
  });

  describe("getAdministrativeRegionById:", () => {
    it("correctly returns region with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el[0];

      expect(Geo.getAdministrativeRegionById({ id: 1 })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionById({ id: 1, locale: "el" })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionById({ id: 1, includeMountAthos: false })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionById({ id: 1, level: "municipality" })).toBe(expectedData);
      // all default options
      expect(
        Geo.getAdministrativeRegionById({ id: 1, locale: "el", includeMountAthos: false, level: "municipality" }),
      ).toBe(expectedData);
    });

    it("correctly returns Mount Athos region (in greek language)", () => {
      const expectedData = administrativeRegions.el[13];

      expect(Geo.getAdministrativeRegionById({ id: 14, includeMountAthos: true })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true })).toBe(expectedData);
      expect(
        Geo.getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true, level: "municipality" }),
      ).toBe(expectedData);
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

      expect(Geo.getAdministrativeRegionById({ id: 8, level: "region" })).toStrictEqual(expectedRegionLevelData);
      expect(Geo.getAdministrativeRegionById({ id: 8, level: "unit" })).toStrictEqual(expectedUnitLevelData);
      expect(Geo.getAdministrativeRegionById({ id: 8, level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });

    it("correctly returns region (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en[3];

      expect(Geo.getAdministrativeRegionById({ id: 4, locale: "en" })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionById({ id: 4, locale: "en", level: "municipality" })).toBe(expectedData);
      // all default options
      expect(
        Geo.getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false, level: "municipality" }),
      ).toBe(expectedData);
    });

    it("correctly returns Mount Athos region (in english language)", () => {
      const expectedData = administrativeRegions.en[13];

      expect(Geo.getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true })).toBe(expectedData);
      expect(
        Geo.getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true, level: "municipality" }),
      ).toBe(expectedData);
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

      expect(Geo.getAdministrativeRegionById({ id: 6, locale: "en", level: "region" })).toStrictEqual(
        expectedRegionLevelData,
      );
      expect(Geo.getAdministrativeRegionById({ id: 6, locale: "en", level: "unit" })).toStrictEqual(
        expectedUnitLevelData,
      );
      expect(Geo.getAdministrativeRegionById({ id: 6, locale: "en", level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });
  });

  describe("getAdministrativeRegionByIsoCode:", () => {
    it("correctly returns region with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el[0];

      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-A" })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-A", locale: "el" })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-A", includeMountAthos: false })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-A", level: "municipality" })).toBe(expectedData);
      // all default options
      expect(
        Geo.getAdministrativeRegionByIsoCode({
          isocode: "GR-A",
          locale: "el",
          includeMountAthos: false,
          level: "municipality",
        }),
      ).toBe(expectedData);
    });

    it("correctly returns Mount Athos region (in greek language)", () => {
      const expectedData = administrativeRegions.el[13];

      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-69", includeMountAthos: true })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-69", locale: "el", includeMountAthos: true })).toBe(
        expectedData,
      );
      expect(
        Geo.getAdministrativeRegionByIsoCode({
          isocode: "GR-69",
          locale: "el",
          includeMountAthos: true,
          level: "municipality",
        }),
      ).toBe(expectedData);
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

      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "region" })).toStrictEqual(
        expectedRegionLevelData,
      );
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "unit" })).toStrictEqual(
        expectedUnitLevelData,
      );
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-H", level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });

    it("correctly returns region (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en[3];

      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en" })).toBe(expectedData);
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en", includeMountAthos: false })).toBe(
        expectedData,
      );
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-D", locale: "en", level: "municipality" })).toBe(
        expectedData,
      );
      // all default options
      expect(
        Geo.getAdministrativeRegionByIsoCode({
          isocode: "GR-D",
          locale: "en",
          includeMountAthos: false,
          level: "municipality",
        }),
      ).toBe(expectedData);
    });

    it("correctly returns Mount Athos region (in english language)", () => {
      const expectedData = administrativeRegions.en[13];

      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-69", locale: "en", includeMountAthos: true })).toBe(
        expectedData,
      );
      expect(
        Geo.getAdministrativeRegionByIsoCode({
          isocode: "GR-69",
          locale: "en",
          includeMountAthos: true,
          level: "municipality",
        }),
      ).toBe(expectedData);
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

      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "region" })).toStrictEqual(
        expectedRegionLevelData,
      );
      expect(Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "unit" })).toStrictEqual(
        expectedUnitLevelData,
      );
      expect(
        Geo.getAdministrativeRegionByIsoCode({ isocode: "GR-F", locale: "en", level: "municipality" }),
      ).toStrictEqual(expectedMunicipalityLevelData);
    });
  });

  describe("getAdministrativeUnits:", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [...units]);

      expect(Geo.getAdministrativeUnits()).toStrictEqual(expectedData);
      expect(Geo.getAdministrativeUnits({ locale: "el" })).toStrictEqual(expectedData);
      expect(Geo.getAdministrativeUnits({ includeMountAthos: false })).toStrictEqual(expectedData);
      expect(Geo.getAdministrativeUnits({ level: "municipality" })).toStrictEqual(expectedData);
      // all default options
      expect(
        Geo.getAdministrativeUnits({ locale: "el", includeMountAthos: false, level: "municipality" }),
      ).toStrictEqual(expectedData);

      expect(Geo.getAdministrativeUnits().length).toBe(74);
    });

    it("correctly returns data including Mount Athos (in greek language)", () => {
      const expectedData = administrativeRegions.el.flatMap(({ units }) => [...units]);

      expect(Geo.getAdministrativeUnits({ includeMountAthos: true })).toStrictEqual(expectedData);
      expect(Geo.getAdministrativeUnits({ locale: "el", includeMountAthos: true })).toStrictEqual(expectedData);
      expect(
        Geo.getAdministrativeUnits({ locale: "el", includeMountAthos: true, level: "municipality" }),
      ).toStrictEqual(expectedData);

      expect(Geo.getAdministrativeUnits({ includeMountAthos: true }).length).toBe(75);
    });

    it("correctly returns data depending the level (in greek language)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el
        .flatMap(({ units }) => [...units])
        .map(({ municipalities: _municipalities, ...unit }) => unit);
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [
        ...units,
      ]);

      expect(Geo.getAdministrativeUnits({ level: "unit" })).toStrictEqual(expectedUnitLevelData);
      expect(Geo.getAdministrativeUnits({ level: "municipality" })).toStrictEqual(expectedMunicipalityLevelData);
    });

    it("correctly returns data (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [...units]);

      expect(Geo.getAdministrativeUnits({ locale: "en" })).toStrictEqual(expectedData);
      expect(Geo.getAdministrativeUnits({ locale: "en", includeMountAthos: false })).toStrictEqual(expectedData);
      expect(Geo.getAdministrativeUnits({ locale: "en", level: "municipality" })).toStrictEqual(expectedData);

      expect(Geo.getAdministrativeUnits().length).toBe(74);
    });

    it("correctly returns data including Mount Athos (in english language)", () => {
      const expectedData = administrativeRegions.en.flatMap(({ units }) => [...units]);

      expect(Geo.getAdministrativeUnits({ locale: "en", includeMountAthos: true })).toStrictEqual(expectedData);
      expect(
        Geo.getAdministrativeUnits({ locale: "en", includeMountAthos: true, level: "municipality" }),
      ).toStrictEqual(expectedData);

      expect(Geo.getAdministrativeUnits({ locale: "en", includeMountAthos: true }).length).toBe(75);
    });

    it("correctly returns data depending the level (in english language)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en
        .flatMap(({ units }) => [...units])
        .map(({ municipalities: _municipalities, ...unit }) => unit);
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [
        ...units,
      ]);

      expect(Geo.getAdministrativeUnits({ locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
      expect(Geo.getAdministrativeUnits({ locale: "en", level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });
  });

  describe("getAdministrativeUnitById:", () => {
    it("correctly returns region with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [...units])[0];

      expect(Geo.getAdministrativeUnitById({ id: 1 })).toBe(expectedData);
      expect(Geo.getAdministrativeUnitById({ id: 1, locale: "el" })).toBe(expectedData);
      expect(Geo.getAdministrativeUnitById({ id: 1, includeMountAthos: false })).toBe(expectedData);
      expect(Geo.getAdministrativeUnitById({ id: 1, level: "municipality" })).toBe(expectedData);
      // all default options
      expect(
        Geo.getAdministrativeUnitById({ id: 1, locale: "el", includeMountAthos: false, level: "municipality" }),
      ).toBe(expectedData);
    });

    it("correctly returns Mount Athos region (in greek language)", () => {
      const expectedData = administrativeRegions.el.flatMap(({ units }) => [...units])[74];

      expect(Geo.getAdministrativeUnitById({ id: 75, includeMountAthos: true })).toBe(expectedData);
      expect(Geo.getAdministrativeUnitById({ id: 75, locale: "el", includeMountAthos: true })).toBe(expectedData);
      expect(
        Geo.getAdministrativeUnitById({ id: 75, locale: "el", includeMountAthos: true, level: "municipality" }),
      ).toBe(expectedData);
    });

    it("correctly returns region data with correct level (in greek language)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el
        .flatMap(({ units }) => [...units])
        .map(({ municipalities: _municipalities, ...unit }) => unit)[15];
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [
        ...units,
      ])[15];

      expect(Geo.getAdministrativeUnitById({ id: 16, level: "unit" })).toStrictEqual(expectedUnitLevelData);
      expect(Geo.getAdministrativeUnitById({ id: 16, level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });

    it("correctly returns region (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [...units])[3];

      expect(Geo.getAdministrativeUnitById({ id: 4, locale: "en" })).toBe(expectedData);
      expect(Geo.getAdministrativeUnitById({ id: 4, locale: "en", includeMountAthos: false })).toBe(expectedData);
      expect(Geo.getAdministrativeUnitById({ id: 4, locale: "en", level: "municipality" })).toBe(expectedData);
      // all default options
      expect(
        Geo.getAdministrativeUnitById({ id: 4, locale: "en", includeMountAthos: false, level: "municipality" }),
      ).toBe(expectedData);
    });

    it("correctly returns Mount Athos region (in english language)", () => {
      const expectedData = administrativeRegions.en.flatMap(({ units }) => [...units])[74];

      expect(Geo.getAdministrativeUnitById({ id: 75, locale: "en", includeMountAthos: true })).toBe(expectedData);
      expect(
        Geo.getAdministrativeUnitById({ id: 75, locale: "en", includeMountAthos: true, level: "municipality" }),
      ).toBe(expectedData);
    });

    it("correctly returns region data with correct level (in english language)", () => {
      const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en
        .flatMap(({ units }) => [...units])
        .map(({ municipalities: _municipalities, ...unit }) => unit)[25];
      const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [
        ...units,
      ])[25];

      expect(Geo.getAdministrativeUnitById({ id: 26, locale: "en", level: "unit" })).toStrictEqual(
        expectedUnitLevelData,
      );
      expect(Geo.getAdministrativeUnitById({ id: 26, locale: "en", level: "municipality" })).toStrictEqual(
        expectedMunicipalityLevelData,
      );
    });
  });

  describe("getMunicipalities:", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.el
        .flatMap(({ units }) => [...units])
        .flatMap(({ municipalities }) => [...municipalities]);

      expect(Geo.getMunicipalities()).toStrictEqual(expectedData);
      // all default options
      expect(Geo.getMunicipalities({ locale: "el" })).toStrictEqual(expectedData);

      expect(Geo.getMunicipalities().length).toBe(332);
    });

    it("correctly returns data (in english language)", () => {
      const expectedData = administrativeRegionsWithoutMountAthos.en
        .flatMap(({ units }) => [...units])
        .flatMap(({ municipalities }) => [...municipalities]);

      expect(Geo.getMunicipalities({ locale: "en" })).toStrictEqual(expectedData);
      expect(Geo.getMunicipalities({ locale: "en" }).length).toBe(0);
    });
  });
});
