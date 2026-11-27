import {
  findByPostalCode,
  getAdministrativeRegionById,
  getAdministrativeRegionByIsoCode,
  getAdministrativeRegions,
  getAdministrativeUnitById,
  getAdministrativeUnits,
  getAllPostalCodes,
  getAllTaxOffices,
  getCities,
  getCityAdministrativeDivision,
  getCityById,
  getCountries,
  getCountry,
  getDays,
  getEras,
  getGeographicRegionById,
  getGeographicRegions,
  getHolidays,
  getMonths,
  getMunicipalities,
  getPrefectureById,
  getPrefectures,
  getQuarters,
  getTaxOfficeById,
  getTaxOfficesByMunicipalityId,
  getTaxOfficesByPostalCode,
  getTaxOfficesByRegionId,
  getTaxOfficesByUnitId,
  searchCityByName,
  searchCountryByName,
  searchTaxOffice,
} from "./index";
import type { Locale } from "./types";
import { immutableSnapshot } from "./helpers/immutable";

function expectDeeplyFrozen(value: unknown): void {
  if (value === null || typeof value !== "object") return;
  expect(Object.isFrozen(value)).toBe(true);
  for (const child of Object.values(value)) {
    expectDeeplyFrozen(child);
  }
}

function compileTimeReadonlyChecks(
  city: NonNullable<ReturnType<typeof getCityById>>,
  holiday: ReturnType<typeof getHolidays>[number],
) {
  // @ts-expect-error Result arrays are readonly.
  getCities().push(city);
  // @ts-expect-error Nested objects are readonly.
  city.relations.regionId = 0;
  // @ts-expect-error Nested arrays are readonly.
  city.coordinates.push(0);
  // @ts-expect-error Holiday objects are readonly.
  holiday.name = "changed";
  // @ts-expect-error Date arrays are readonly.
  getDays()[0] = "changed";
}

describe("immutable public results", () => {
  it("creates frozen snapshots without freezing or changing the source", () => {
    const source = { nested: [{ value: 1 }] };
    const snapshot = immutableSnapshot(source);
    expectDeeplyFrozen(snapshot);
    expect(Object.isFrozen(source)).toBe(false);
    expect(Object.isFrozen(source.nested)).toBe(false);
    source.nested[0] = { value: 2 };
    expect(snapshot.nested[0]?.value).toBe(1);
  });

  for (const locale of ["el", "en"] as const satisfies readonly Locale[]) {
    const cases: [string, () => unknown][] = [
      ["getAdministrativeRegions", () => getAdministrativeRegions({ locale })],
      ["getAdministrativeRegionById", () => getAdministrativeRegionById({ locale, id: 1 })],
      ["getAdministrativeRegionByIsoCode", () => getAdministrativeRegionByIsoCode({ locale, isocode: "GR-A" })],
      ["getAdministrativeUnits", () => getAdministrativeUnits({ locale })],
      ["getAdministrativeUnitById", () => getAdministrativeUnitById({ locale, id: 1 })],
      ["getMunicipalities", () => getMunicipalities({ locale })],
      ["getCities", () => getCities({ locale })],
      ["getCityById", () => getCityById({ locale, id: 1 })],
      ["searchCityByName", () => searchCityByName({ locale, searchTerm: "" })],
      ["getCityAdministrativeDivision", () => getCityAdministrativeDivision({ locale, cityId: 1, entity: "unit" })],
      ["getGeographicRegions", () => getGeographicRegions({ locale })],
      ["getGeographicRegionById", () => getGeographicRegionById({ locale, id: 1 })],
      ["getPrefectures", () => getPrefectures({ locale })],
      ["getPrefectureById", () => getPrefectureById({ locale, id: 1 })],
      ["findByPostalCode", () => findByPostalCode("17562", { locale })],
      ["getAllTaxOffices", () => getAllTaxOffices({ locale })],
      ["getTaxOfficeById", () => getTaxOfficeById({ locale, id: 1 })],
      ["getTaxOfficesByRegionId", () => getTaxOfficesByRegionId({ locale, id: 1 })],
      ["getTaxOfficesByUnitId", () => getTaxOfficesByUnitId({ locale, id: 5 })],
      ["getTaxOfficesByMunicipalityId", () => getTaxOfficesByMunicipalityId({ locale, id: 15 })],
      ["getTaxOfficesByPostalCode", () => getTaxOfficesByPostalCode({ locale, postalCode: 67064 })],
      [
        "searchTaxOffice",
        () =>
          searchTaxOffice({
            locale,
            searchTerm: locale === "el" ? "Ξάνθης" : "Xanthi",
          }),
      ],
      ["getCountries", () => getCountries({ locale })],
      ["getCountry", () => getCountry({ locale, type: "iso31661-a2", value: "GR" })],
      ["searchCountryByName", () => searchCountryByName({ locale, searchTerm: "" })],
      ["getDays", () => getDays({ locale })],
      ["getMonths", () => getMonths({ locale })],
      ["getQuarters", () => getQuarters({ locale })],
      ["getEras", () => getEras({ locale })],
      ["getHolidays", () => getHolidays("2026", { locale })],
    ];

    it.each(cases)(`%s returns deeply frozen data in ${locale}`, (_name, getResult) => {
      const result = getResult();
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
      if (Array.isArray(result)) expect(result.length).toBeGreaterThan(0);
      expectDeeplyFrozen(result);
    });

    it(`freezes all date formats in ${locale}`, () => {
      for (const format of ["full", "short", "min"] as const) {
        expectDeeplyFrozen(getDays({ locale, format }));
        expectDeeplyFrozen(getMonths({ locale, format }));
      }
      expectDeeplyFrozen(getMonths({ locale, format: "alternative" }));
      for (const format of ["full", "short"] as const) {
        expectDeeplyFrozen(getQuarters({ locale, format }));
        expectDeeplyFrozen(getEras({ locale, format }));
      }
    });

    for (const includeMountAthos of [false, true]) {
      for (const level of ["region", "unit", "municipality"] as const) {
        it(`freezes administrative ${level} data for ${locale}, Mount Athos ${includeMountAthos}`, () => {
          expectDeeplyFrozen(getAdministrativeRegions({ locale, includeMountAthos, level }));
          expectDeeplyFrozen(
            getAdministrativeRegionById({
              locale,
              includeMountAthos,
              level,
              id: 1,
            }),
          );
          expectDeeplyFrozen(
            getAdministrativeRegionByIsoCode({
              locale,
              includeMountAthos,
              level,
              isocode: "GR-A",
            }),
          );
        });
      }

      for (const level of ["unit", "municipality"] as const) {
        it(`freezes administrative units at ${level} level for ${locale}, Mount Athos ${includeMountAthos}`, () => {
          expectDeeplyFrozen(getAdministrativeUnits({ locale, includeMountAthos, level }));
          expectDeeplyFrozen(
            getAdministrativeUnitById({
              locale,
              includeMountAthos,
              level,
              id: 1,
            }),
          );
        });
      }

      it(`freezes prefectures for ${locale}, Mount Athos ${includeMountAthos}`, () => {
        expectDeeplyFrozen(getPrefectures({ locale, includeMountAthos }));
        const prefecture = getPrefectureById({ locale, includeMountAthos, id: includeMountAthos ? 55 : 1 });
        expect(prefecture).toBeDefined();
        expectDeeplyFrozen(prefecture);
      });
    }

    for (const entity of ["region", "unit", "prefecture"] as const) {
      it(`freezes ${entity} composite lookups in ${locale}`, () => {
        const postalResult = findByPostalCode("17562", { locale, entity });
        const cityResult = getCityAdministrativeDivision({
          locale,
          cityId: 1,
          entity,
        });
        expect(postalResult).toBeDefined();
        expect(cityResult).toBeDefined();
        expectDeeplyFrozen(postalResult);
        expectDeeplyFrozen(cityResult);
      });
    }
  }

  it("freezes postal code results", () => {
    const codes = getAllPostalCodes();
    expect(codes.length).toBeGreaterThan(0);
    expectDeeplyFrozen(codes);
  });

  it("freezes empty search and filter results and preserves missing lookups", () => {
    expectDeeplyFrozen(searchTaxOffice({ searchTerm: " " }));
    expectDeeplyFrozen(searchTaxOffice({ searchTerm: "no matching office" }));
    expectDeeplyFrozen(getTaxOfficesByRegionId({ id: -1 }));
    expectDeeplyFrozen(getTaxOfficesByUnitId({ id: -1 }));
    expectDeeplyFrozen(getTaxOfficesByMunicipalityId({ id: -1 }));
    expectDeeplyFrozen(getTaxOfficesByPostalCode({ postalCode: -1 }));
    expect(searchCityByName({ searchTerm: "no matching city" })).toBeNull();
    expect(searchCountryByName({ searchTerm: "no matching country" })).toBeNull();
    expect(getCityById({ id: -1 })).toBeUndefined();
    expect(getCountry({ type: "id", value: "not-a-country" })).toBeNull();
    expect(findByPostalCode("invalid")).toBeUndefined();
    expect(getCityAdministrativeDivision({ cityId: -1, entity: "unit" })).toBeUndefined();
  });

  it("prevents mutations from changing other APIs or later results", () => {
    const city = getCityById({ id: 1 });
    const office = getTaxOfficeById({ id: 1 });
    const unit = getAdministrativeUnitById({ id: 1 });
    expect(city).toBeDefined();
    expect(office).toBeDefined();
    expect(unit).toBeDefined();
    if (!city || !office || !unit) throw new Error("Missing immutability test fixtures");

    const citySnapshot = JSON.stringify(city);
    const officeSnapshot = JSON.stringify(office);
    const unitSnapshot = JSON.stringify(unit);
    expect(Reflect.set(city.relations, "regionId", -1)).toBe(false);
    expect(Reflect.set(city.coordinates, "0", -1)).toBe(false);
    expect(Reflect.set(office.relations, "regionId", -1)).toBe(false);
    expect(Reflect.set(unit.region, "id", -1)).toBe(false);
    expect(Reflect.set(unit.carPlatesPattern, "0", "changed")).toBe(false);
    expect(JSON.stringify(getCities().find(({ id }) => id === 1))).toBe(citySnapshot);
    expect(JSON.stringify(getAllTaxOffices().find(({ id }) => id === 1))).toBe(officeSnapshot);
    expect(JSON.stringify(getAdministrativeUnits().find(({ id }) => id === 1))).toBe(unitSnapshot);
    expect(JSON.stringify(searchTaxOffice({ searchTerm: office.name }).find(({ id }) => id === 1))).toBe(
      officeSnapshot,
    );
  });

  it("exposes readonly result types", () => {
    expect(compileTimeReadonlyChecks).toBeTypeOf("function");
  });
});
