import administrativeRegionsEl from "../../data/administrative-regions-el.json";
import administrativeRegionsEn from "../../data/administrative-regions-en.json";
import geographicRegionsEl from "../../data/geographic-regions-el.json";
import geographicRegionsEn from "../../data/geographic-regions-en.json";
import prefecturesEl from "../../data/prefectures-el.json";
import prefecturesEn from "../../data/prefectures-en.json";
import postalCodes from "../../data/postal-codes.json";
import taxOfficesEl from "../../data/taxOffices-el.json";
import taxOfficesEn from "../../data/taxOffices-en.json";
import {
  MOUNT_ATHOS_REGION_ID,
  MOUNT_ATHOS_PREFECTURE_ID,
  getAdministrativeRegions,
  getAdministrativeRegionById,
  getAdministrativeRegionByIsoCode,
  getAdministrativeUnits,
  getAdministrativeUnitById,
  getMunicipalities,
  getGeographicRegions,
  getGeographicRegionById,
  getPrefectures,
  getPrefectureById,
  getAllPostalCodes,
  findByPostalCode,
  getAllTaxOffices,
  getTaxOfficeById,
  searchTaxOffice,
} from "../geoUtils";

const administrativeRegions = { el: administrativeRegionsEl, en: administrativeRegionsEn };
const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
};
const geographicRegions = { el: geographicRegionsEl, en: geographicRegionsEn };
const prefectures = { el: prefecturesEl, en: prefecturesEn };
export const prefecturesWithoutMountAthos = {
  el: prefectures.el.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
  en: prefectures.en.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
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

describe("getAdministrativeRegionById", () => {
  it("correctly returns region with default values (in greek language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.el[0];

    expect(getAdministrativeRegionById({ id: 1 })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 1, locale: "el" })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 1, level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(
      getAdministrativeRegionById({ id: 1, locale: "el", includeMountAthos: false, level: "municipality" }),
    ).toEqual(expectedData);
  });

  it("correctly returns Mount Athos region (in greek language)", () => {
    const expectedData = administrativeRegions.el[13];

    expect(getAdministrativeRegionById({ id: 14, includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true })).toEqual(expectedData);
    expect(
      getAdministrativeRegionById({ id: 14, locale: "el", includeMountAthos: true, level: "municipality" }),
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

    expect(getAdministrativeRegionById({ id: 8, level: "region" })).toStrictEqual(expectedRegionLevelData);
    expect(getAdministrativeRegionById({ id: 8, level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeRegionById({ id: 8, level: "municipality" })).toStrictEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns region (in english language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.en[3];

    expect(getAdministrativeRegionById({ id: 4, locale: "en" })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeRegionById({ id: 4, locale: "en", level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(
      getAdministrativeRegionById({ id: 4, locale: "en", includeMountAthos: false, level: "municipality" }),
    ).toEqual(expectedData);
  });

  it("correctly returns Mount Athos region (in english language)", () => {
    const expectedData = administrativeRegions.en[13];

    expect(getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true })).toEqual(expectedData);
    expect(
      getAdministrativeRegionById({ id: 14, locale: "en", includeMountAthos: true, level: "municipality" }),
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
    const expectedData = administrativeRegions.el[13];

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
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.el.map(
      ({ units: _units, ...region }) => region,
    )[7];
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
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
    const expectedData = administrativeRegions.en[13];

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
    const expectedRegionLevelData = administrativeRegionsWithoutMountAthos.en.map(
      ({ units: _units, ...region }) => region,
    )[5];
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en.map((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
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

describe("getAdministrativeUnits", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits()).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "el" })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ includeMountAthos: false })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ level: "municipality" })).toStrictEqual(expectedData);
    // all default options
    expect(getAdministrativeUnits({ locale: "el", includeMountAthos: false, level: "municipality" })).toStrictEqual(
      expectedData,
    );

    expect(getAdministrativeUnits().length).toBe(74);
  });

  it("correctly returns data including Mount Athos (in greek language)", () => {
    const expectedData = administrativeRegions.el.flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits({ includeMountAthos: true })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "el", includeMountAthos: true })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "el", includeMountAthos: true, level: "municipality" })).toStrictEqual(
      expectedData,
    );

    expect(getAdministrativeUnits({ includeMountAthos: true }).length).toBe(75);
  });

  it("correctly returns data depending the level (in greek language)", () => {
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el
      .flatMap(({ units }) => [...units])
      .map(({ municipalities: _municipalities, ...unit }) => unit);
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits({ level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeUnits({ level: "municipality" })).toStrictEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits({ locale: "en" })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "en", includeMountAthos: false })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "en", level: "municipality" })).toStrictEqual(expectedData);

    expect(getAdministrativeUnits().length).toBe(74);
  });

  it("correctly returns data including Mount Athos (in english language)", () => {
    const expectedData = administrativeRegions.en.flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits({ locale: "en", includeMountAthos: true })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "en", includeMountAthos: true, level: "municipality" })).toStrictEqual(
      expectedData,
    );

    expect(getAdministrativeUnits({ locale: "en", includeMountAthos: true }).length).toBe(75);
  });

  it("correctly returns data depending the level (in english language)", () => {
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en
      .flatMap(({ units }) => [...units])
      .map(({ municipalities: _municipalities, ...unit }) => unit);
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits({ locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeUnits({ locale: "en", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });
});

describe("getAdministrativeUnitById", () => {
  it("correctly returns region with default values (in greek language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [...units])[0];

    expect(getAdministrativeUnitById({ id: 1 })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 1, locale: "el" })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 1, level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(getAdministrativeUnitById({ id: 1, locale: "el", includeMountAthos: false, level: "municipality" })).toEqual(
      expectedData,
    );
  });

  it("correctly returns Mount Athos region (in greek language)", () => {
    const expectedData = administrativeRegions.el.flatMap(({ units }) => [...units])[74];

    expect(getAdministrativeUnitById({ id: 75, includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 75, locale: "el", includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 75, locale: "el", includeMountAthos: true, level: "municipality" })).toEqual(
      expectedData,
    );
  });

  it("correctly returns region data with correct level (in greek language)", () => {
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.el
      .flatMap(({ units }) => [...units])
      .map(({ municipalities: _municipalities, ...unit }) => unit)[15];
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.el.flatMap(({ units }) => [
      ...units,
    ])[15];

    expect(getAdministrativeUnitById({ id: 16, level: "unit" })).toEqual(expectedUnitLevelData);
    expect(getAdministrativeUnitById({ id: 16, level: "municipality" })).toEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns region (in english language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [...units])[3];

    expect(getAdministrativeUnitById({ id: 4, locale: "en" })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 4, locale: "en", includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 4, locale: "en", level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(getAdministrativeUnitById({ id: 4, locale: "en", includeMountAthos: false, level: "municipality" })).toEqual(
      expectedData,
    );
  });

  it("correctly returns Mount Athos region (in english language)", () => {
    const expectedData = administrativeRegions.en.flatMap(({ units }) => [...units])[74];

    expect(getAdministrativeUnitById({ id: 75, locale: "en", includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 75, locale: "en", includeMountAthos: true, level: "municipality" })).toEqual(
      expectedData,
    );
  });

  it("correctly returns region data with correct level (in english language)", () => {
    const expectedUnitLevelData = administrativeRegionsWithoutMountAthos.en
      .flatMap(({ units }) => [...units])
      .map(({ municipalities: _municipalities, ...unit }) => unit)[25];
    const expectedMunicipalityLevelData = administrativeRegionsWithoutMountAthos.en.flatMap(({ units }) => [
      ...units,
    ])[25];

    expect(getAdministrativeUnitById({ id: 26, locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeUnitById({ id: 26, locale: "en", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });
});

describe("getMunicipalities", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.el
      .flatMap(({ units }) => [...units])
      .flatMap(({ municipalities }) => [...municipalities]);

    expect(getMunicipalities()).toStrictEqual(expectedData);
    // all default options
    expect(getMunicipalities({ locale: "el" })).toStrictEqual(expectedData);
    expect(getMunicipalities().length).toBe(332);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = administrativeRegionsWithoutMountAthos.en
      .flatMap(({ units }) => [...units])
      .flatMap(({ municipalities }) => [...municipalities]);

    expect(getMunicipalities({ locale: "en" })).toStrictEqual(expectedData);
    expect(getMunicipalities({ locale: "en" }).length).toBe(332);
  });
});

describe("getGeographicRegions:", () => {
  it("correctly returns all geographic regions in greek language", () => {
    const expectedData = geographicRegions.el;

    expect(getGeographicRegions()).toEqual(expectedData);
    expect(getGeographicRegions({ locale: "el" })).toEqual(expectedData);
    expect(getGeographicRegions().length).toEqual(9);
  });

  it("correctly returns all geographic regions in english language", () => {
    const expectedData = geographicRegions.en;

    expect(getGeographicRegions({ locale: "en" })).toEqual(expectedData);
    expect(getGeographicRegions().length).toEqual(9);
  });
});

describe("getGeographicRegionById:", () => {
  it("correctly returns geographic region by id (in greek language)", () => {
    const expectedData = geographicRegions.el[4];

    expect(getGeographicRegionById({ id: 5 })).toEqual(expectedData);
    expect(getGeographicRegionById({ id: 5, locale: "el" })).toEqual(expectedData);
  });

  it("correctly returns geographic region by id (in english language)", () => {
    const expectedData = geographicRegions.en[4];

    expect(getGeographicRegionById({ id: 5, locale: "en" })).toEqual(expectedData);
  });
});

describe("getPrefectures", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = prefecturesWithoutMountAthos.el;

    expect(getPrefectures()).toEqual(expectedData);
    expect(getPrefectures({ locale: "el" })).toEqual(expectedData);
    expect(getPrefectures({ includeMountAthos: false })).toEqual(expectedData);
    expect(getPrefectures({ locale: "el", includeMountAthos: false })).toEqual(expectedData);
    expect(getPrefectures().length).toBe(54);
  });

  it("correctly returns data including Mount Athos (in greek language)", () => {
    const expectedData = prefectures.el;

    expect(getPrefectures({ includeMountAthos: true })).toEqual(expectedData);
    expect(getPrefectures({ locale: "el", includeMountAthos: true })).toEqual(expectedData);
    expect(getPrefectures({ includeMountAthos: true }).length).toBe(55);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = prefecturesWithoutMountAthos.en;

    expect(getPrefectures({ locale: "en" })).toEqual(expectedData);
    expect(getPrefectures({ locale: "en", includeMountAthos: false })).toEqual(expectedData);
    expect(getPrefectures().length).toBe(54);
  });

  it("correctly returns data including Mount Athos (in english language)", () => {
    const expectedData = prefectures.en;

    expect(getPrefectures({ locale: "en", includeMountAthos: true })).toEqual(expectedData);
    expect(getPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(55);
  });
});

describe("getPrefectureById", () => {
  it("correctly returns prefecture with default values (in greek language)", () => {
    const expectedData = prefecturesWithoutMountAthos.el[0];

    expect(getPrefectureById({ id: 1 })).toEqual(expectedData);
    expect(getPrefectureById({ id: 1, locale: "el" })).toEqual(expectedData);
    expect(getPrefectureById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
    // all default options
    expect(getPrefectureById({ id: 1, locale: "el", includeMountAthos: false })).toEqual(expectedData);
  });

  it("correctly returns Mount Athos prefecture (in greek language)", () => {
    const expectedData = prefectures.el[54];

    expect(getPrefectureById({ id: 55, includeMountAthos: true })).toEqual(expectedData);
    expect(getPrefectureById({ id: 55, locale: "el", includeMountAthos: true })).toEqual(expectedData);
  });

  it("correctly returns prefecture (in english language)", () => {
    const expectedData = prefecturesWithoutMountAthos.en[33];

    expect(getPrefectureById({ id: 34, locale: "en" })).toEqual(expectedData);
    expect(getPrefectureById({ id: 34, locale: "en", includeMountAthos: false })).toEqual(expectedData);
  });

  it("correctly returns Mount Athos prefecture (in english language)", () => {
    const expectedData = prefectures.en[54];

    expect(getPrefectureById({ id: 55, locale: "en", includeMountAthos: true })).toEqual(expectedData);
  });
});

describe("getAllPostalCodes", () => {
  it("correctly returns all available postal codes", () => {
    const expectedResult = postalCodes.flatMap(({ postalCodes }) => postalCodes);

    expect(getAllPostalCodes()).toEqual(expectedResult);
    expect(getAllPostalCodes().length).toBe(1290);
  });
});

describe("findByPostalCode", () => {
  it("correctly returns undefined in case of invalid postal code", () => {
    expect(findByPostalCode("12345")).toBe(undefined);
    expect(findByPostalCode("11111", { locale: "en" })).toBe(undefined);
    expect(findByPostalCode("22222", { locale: "en", entity: "prefecture" })).toBe(undefined);
    expect(findByPostalCode("99999", { locale: "el" })).toBe(undefined);
    expect(findByPostalCode("98765")).toBe(undefined);
    expect(findByPostalCode("56789", { locale: "el", entity: "prefecture" })).toBe(undefined);
  });

  it("correctly returns prefecture (en and el languages)", () => {
    expect(findByPostalCode("17562")).toEqual({
      id: 1,
      name: "Νομός Αθηνών",
      seat: "Αθήνα",
      regionAndUnit: { regionId: 9, regionIso31662: "GR-I", unitId: 42 },
    });
    expect(findByPostalCode("30005", { locale: "en" })).toEqual({
      id: 49,
      name: "Aetolia-Acarnania",
      seat: "Messolonghi",
      regionAndUnit: { regionId: 7, regionIso31662: "GR-G", unitId: 32 },
    });
    expect(findByPostalCode("17122", { locale: "en", entity: "prefecture" })).toEqual({
      id: 1,
      name: "Athens Prefecture",
      seat: "Athens",
      regionAndUnit: { regionId: 9, regionIso31662: "GR-I", unitId: 42 },
    });
    expect(findByPostalCode("25008", { locale: "el" })).toEqual({
      id: 48,
      name: "Νομός Αχαΐας",
      seat: "Πάτρα",
      regionAndUnit: {
        regionId: 7,
        regionIso31662: "GR-G",
        unitId: 33,
      },
    });
    expect(findByPostalCode("68014", { locale: "el", entity: "prefecture" })).toEqual({
      id: 22,
      name: "Νομός Έβρου",
      seat: "Αλεξανδρούπολη",
      regionAndUnit: {
        regionId: 1,
        regionIso31662: "GR-A",
        unitId: 2,
      },
    });
    expect(findByPostalCode("27066")).toEqual({
      id: 50,
      name: "Νομός Ηλείας",
      seat: "Πύργος",
      regionAndUnit: {
        regionId: 7,
        regionIso31662: "GR-G",
        unitId: 34,
      },
    });
    expect(findByPostalCode("54250", { locale: "en" })).toEqual({
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
    expect(findByPostalCode("17562", { entity: "region" })).toEqual({
      id: 9,
      iso31662: "GR-I",
      name: "Αττικής",
      seat: "Αθήνα",
    });
    expect(findByPostalCode("30005", { locale: "en", entity: "region" })).toEqual({
      id: 7,
      iso31662: "GR-G",
      name: "Western Greece",
      seat: "Patras",
    });
    expect(findByPostalCode("17122", { locale: "en", entity: "region" })).toEqual({
      id: 9,
      iso31662: "GR-I",
      name: "Attica",
      seat: "Athens",
    });
    expect(findByPostalCode("25008", { locale: "el", entity: "region" })).toEqual({
      id: 7,
      iso31662: "GR-G",
      name: "Δυτικής Ελλάδας",
      seat: "Πάτρα",
    });
    expect(findByPostalCode("68014", { locale: "el", entity: "region" })).toEqual({
      id: 1,
      iso31662: "GR-A",
      name: "Ανατολικής Μακεδονίας και Θράκης",
      seat: "Κομοτηνή",
    });
    expect(findByPostalCode("27066", { entity: "region" })).toEqual({
      id: 7,
      iso31662: "GR-G",
      name: "Δυτικής Ελλάδας",
      seat: "Πάτρα",
    });
    expect(findByPostalCode("54250", { locale: "en", entity: "region" })).toEqual({
      id: 2,
      iso31662: "GR-B",
      name: "Central Macedonia",
      seat: "Thessaloniki",
    });
  });

  it("correctly returns unit (en and el languages)", () => {
    expect(findByPostalCode("17562", { entity: "unit" })).toEqual({
      id: 42,
      name: "Κεντρικού Τομέα Αθηνών",
      seat: "Αθήνα",
      region: {
        id: 9,
        iso31662: "GR-I",
      },
      carPlatesPattern: [],
    });
    expect(findByPostalCode("30005", { locale: "en", entity: "unit" })).toEqual({
      id: 32,
      name: "Aetolia - Acarnania",
      seat: "Messolonghi",
      region: {
        id: 7,
        iso31662: "GR-G",
      },
      carPlatesPattern: ["AI*", "ME*"],
    });
    expect(findByPostalCode("17122", { locale: "en", entity: "unit" })).toEqual({
      id: 42,
      name: "Central Athens",
      seat: "Athens",
      region: {
        id: 9,
        iso31662: "GR-I",
      },
      carPlatesPattern: [],
    });
    expect(findByPostalCode("25008", { locale: "el", entity: "unit" })).toEqual({
      id: 33,
      name: "Αχαΐας",
      seat: "Πάτρα",
      region: {
        id: 7,
        iso31662: "GR-G",
      },
      carPlatesPattern: ["AX*", "AZ*"],
    });
    expect(findByPostalCode("68014", { locale: "el", entity: "unit" })).toEqual({
      id: 2,
      name: "Έβρου",
      seat: "Αλεξανδρούπολη",
      region: {
        id: 1,
        iso31662: "GR-A",
      },
      carPlatesPattern: ["EB*", "MX*", "OP*"],
    });
    expect(findByPostalCode("27066", { entity: "unit" })).toEqual({
      id: 34,
      name: "Ηλείας",
      seat: "Πύργος",
      region: {
        id: 7,
        iso31662: "GR-G",
      },
      carPlatesPattern: [],
    });
    expect(findByPostalCode("54250", { locale: "en", entity: "unit" })).toEqual({
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

describe("getAllTaxOffices", () => {
  it("return all tax offices data", () => {
    expect(getAllTaxOffices()).toEqual(taxOfficesEl);
    expect(getAllTaxOffices({ locale: "en" })).toEqual(taxOfficesEn);
  });
});

describe("Get tax office by id", () => {
  it("return tax office by tax office ID ", () => {
    expect(getTaxOfficeById({ id: 1 })).toEqual({
      id: 1,
      name: "Ξάνθης",
      officialName: "ΔΟΥ Ξάνθης",
      relations: {
        regionId: 1,
        regionIso: "GR-A",
        unitIds: [5],
        municipalityIds: [15, 16, 17, 18],
      },
      postalCodes: [67064, 67150, 67300, 67131, 67133, 67132, 67062, 66035, 66150, 69200, 67200],
    });
  });
});

describe("Search tax office  ", () => {
  it("return all tax offices in greek if no params are provided", () => {
    expect(searchTaxOffice()).toEqual(taxOfficesEl);
  });
  it("return all tax offices in english if no params are provided", () => {
    expect(searchTaxOffice({ locale: "en" })).toEqual(taxOfficesEn);
  });

  // it("throw error if there is a missmatch in searchterm and localization", () => { expect(searchTaxOffice({ searchTerm: "Σ", locale: "en" })).toThrow(); });

  it("return tax office that has ΑΘ in their names", () => {
    expect(searchTaxOffice({ searchTerm: "ΑΘ" })).toEqual([
      {
        id: 16,
        name: "Α' Αθηνών",
        officialName: "ΔΟΥ Α' Αθηνών",
        postalCodes: [
          10431, 10432, 10677, 11851, 10443, 10551, 10554, 11854, 11853, 11852, 11742, 10442, 11855, 10435, 10436,
          10437, 10444, 10556, 10560, 11741, 10447, 10438, 10555, 10553, 10440, 10558, 10552, 10441, 10559, 10564,
          10678, 10679, 10439, 17778,
        ],
        relations: { municipalityIds: [193, 199, 187], regionId: 9, regionIso: "GR-I", unitIds: [42, 43, 41] },
      },
      {
        id: 17,
        name: "Δ' Αθηνών",
        officialName: "ΔΟΥ Δ' Αθηνών",
        postalCodes: [
          10433, 10434, 10682, 11472, 11473, 11471, 10563, 10671, 10672, 10683, 10675, 10676, 10557, 10673, 10674,
          10680, 10681, 10562, 10561,
        ],
        relations: { municipalityIds: [193], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 18,
        name: "ΙΓ' Αθηνών",
        officialName: "ΔΟΥ ΙΓ' Αθηνών",
        postalCodes: [
          11251, 11257, 11476, 11142, 10446, 11252, 11474, 10445, 11255, 11256, 11361, 11364, 11141, 11144, 11253,
          11254, 11363, 11145, 11362, 11475, 11143, 11146, 11147,
        ],
        relations: { municipalityIds: [193, 192], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 19,
        name: "ΙΖ' Αθηνών",
        officialName: "ΔΟΥ ΙΖ' Αθηνών",
        postalCodes: [11631, 11632, 11744, 11635, 11633, 11636, 11743, 11634, 11745, 16121, 16233, 16231, 16232, 16122],
        relations: { municipalityIds: [193, 196, 197], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 21,
        name: "ΙΒ' Αθηνών",
        officialName: "ΔΟΥ ΙΒ' Αθηνών",
        postalCodes: [11527, 11526, 11528, 15772, 15773, 15771],
        relations: { municipalityIds: [193, 198], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      { id: 95, name: "ΦAE Αθηνών (Α1)", officialName: "ΔΟΥ ΦAE Αθηνών (Α1)", relations: {} },
    ]);
  });
  it("return tax office that has ATH in their names", () => {
    expect(searchTaxOffice({ searchTerm: "ATH", locale: "en" })).toEqual([
      {
        id: 16,
        name: "A' Athens",
        officialName: "TAX OFFICE A' Athens",
        postalCodes: [
          10431, 10432, 10677, 11851, 10443, 10551, 10554, 11854, 11853, 11852, 11742, 10442, 11855, 10435, 10436,
          10437, 10444, 10556, 10560, 11741, 10447, 10438, 10555, 10553, 10440, 10558, 10552, 10441, 10559, 10564,
          10678, 10679, 10439, 17778,
        ],
        relations: { municipalityIds: [193, 199, 187], regionId: 9, regionIso: "GR-I", unitIds: [42, 43, 41] },
      },
      {
        id: 17,
        name: "D' Athens",
        officialName: "TAX OFFICE D' Athens",
        postalCodes: [
          10433, 10434, 10682, 11472, 11473, 11471, 10563, 10671, 10672, 10683, 10675, 10676, 10557, 10673, 10674,
          10680, 10681, 10562, 10561,
        ],
        relations: { municipalityIds: [193], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 18,
        name: "ΙC' Athens",
        officialName: "TAX OFFICE IC' Athens",
        postalCodes: [
          11251, 11257, 11476, 11142, 10446, 11252, 11474, 10445, 11255, 11256, 11361, 11364, 11141, 11144, 11253,
          11254, 11363, 11145, 11362, 11475, 11143, 11146, 11147,
        ],
        relations: { municipalityIds: [193, 192], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 19,
        name: "IZ' Athens",
        officialName: "TAX OFFICE IZ' Athens",
        postalCodes: [11631, 11632, 11744, 11635, 11633, 11636, 11743, 11634, 11745, 16121, 16233, 16231, 16232, 16122],
        relations: { municipalityIds: [193, 196, 197], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 21,
        name: "IB' Athens",
        officialName: "TAX OFFICE IB' Athens",
        postalCodes: [11527, 11526, 11528, 15772, 15773, 15771],
        relations: { municipalityIds: [193, 198], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      { id: 95, name: "FAE Athens (A1)", officialName: "TAX OFFICE FAE Athens (A1)", relations: {} },
    ]);
  });
});
