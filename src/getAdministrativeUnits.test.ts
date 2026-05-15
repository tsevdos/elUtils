import { getAdministrativeRegions, MOUNT_ATHOS_REGION_ID } from "./getAdministrativeRegions";
import { getAdministrativeUnits } from "./getAdministrativeUnits";
import type { Region, Unit, UnitWithoutMunicipalities } from "./types";

const greekAdministrativeRegionsWithMountAthos = getAdministrativeRegions({ includeMountAthos: true });
const greekAdministrativeRegionsWithoutMountAthos = getAdministrativeRegions({ includeMountAthos: false });
const englishAdministrativeRegionsWithMountAthos = getAdministrativeRegions({ locale: "en", includeMountAthos: true });
const englishAdministrativeRegionsWithoutMountAthos = getAdministrativeRegions({
  locale: "en",
  includeMountAthos: false,
});

describe("getAdministrativeUnits", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = (greekAdministrativeRegionsWithoutMountAthos as Region[]).flatMap(({ units }) => [...units]);

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
    const expectedData = (greekAdministrativeRegionsWithMountAthos as Region[]).flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits({ includeMountAthos: true })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "el", includeMountAthos: true })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "el", includeMountAthos: true, level: "municipality" })).toStrictEqual(
      expectedData,
    );

    expect(getAdministrativeUnits({ includeMountAthos: true }).length).toBe(75);
  });

  it("correctly returns data depending the level (in greek language)", () => {
    const expectedUnitLevelData = (
      (greekAdministrativeRegionsWithoutMountAthos as Region[]).flatMap(({ units }) => [...units]) as Unit[]
    ).map(({ municipalities: _municipalities, ...unit }) => unit);
    const expectedMunicipalityLevelData = (greekAdministrativeRegionsWithoutMountAthos as Region[]).flatMap(
      ({ units }) => [...units],
    );

    expect(getAdministrativeUnits({ level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeUnits({ level: "municipality" })).toStrictEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = (englishAdministrativeRegionsWithoutMountAthos as Region[]).flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits({ locale: "en" })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "en", includeMountAthos: false })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "en", level: "municipality" })).toStrictEqual(expectedData);

    expect(getAdministrativeUnits().length).toBe(74);
  });

  it("correctly returns data including Mount Athos (in english language)", () => {
    const expectedData = (englishAdministrativeRegionsWithMountAthos as Region[]).flatMap(({ units }) => [...units]);

    expect(getAdministrativeUnits({ locale: "en", includeMountAthos: true })).toStrictEqual(expectedData);
    expect(getAdministrativeUnits({ locale: "en", includeMountAthos: true, level: "municipality" })).toStrictEqual(
      expectedData,
    );

    expect(getAdministrativeUnits({ locale: "en", includeMountAthos: true }).length).toBe(75);
  });

  it("correctly returns data depending the level (in english language)", () => {
    const expectedUnitLevelData = (
      (englishAdministrativeRegionsWithoutMountAthos as Region[]).flatMap(({ units }) => [...units]) as Unit[]
    ).map(({ municipalities: _municipalities, ...unit }) => unit);
    const expectedMunicipalityLevelData = (englishAdministrativeRegionsWithoutMountAthos as Region[]).flatMap(
      ({ units }) => [...units],
    );

    expect(getAdministrativeUnits({ locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeUnits({ locale: "en", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });

  describe("data structure validation", () => {
    it("returns units with all required properties at municipality level", () => {
      const units = getAdministrativeUnits() as Unit[];

      units.forEach((unit) => {
        expect(unit).toHaveProperty("id");
        expect(unit).toHaveProperty("name");
        expect(unit).toHaveProperty("seat");
        expect(unit).toHaveProperty("region");
        expect(unit).toHaveProperty("carPlatesPattern");
        expect(unit).toHaveProperty("municipalities");
        expect(typeof unit.id).toBe("number");
        expect(typeof unit.name).toBe("string");
        expect(typeof unit.seat).toBe("string");
        expect(Array.isArray(unit.carPlatesPattern)).toBe(true);
        expect(Array.isArray(unit.municipalities)).toBe(true);
      });
    });

    it("returns units without municipalities property at unit level", () => {
      const units = getAdministrativeUnits({ level: "unit" }) as UnitWithoutMunicipalities[];

      units.forEach((unit) => {
        expect(unit).toHaveProperty("id");
        expect(unit).toHaveProperty("name");
        expect(unit).toHaveProperty("seat");
        expect(unit).toHaveProperty("region");
        expect(unit).toHaveProperty("carPlatesPattern");
        expect(unit).not.toHaveProperty("municipalities");
      });
    });

    it("ensures all units have valid region references", () => {
      const units = getAdministrativeUnits() as Unit[];

      units.forEach((unit) => {
        expect(unit.region).toHaveProperty("id");
        expect(unit.region).toHaveProperty("iso31662");
        expect(typeof unit.region.id).toBe("number");
        expect(typeof unit.region.iso31662).toBe("string");
        expect(unit.region.iso31662).toMatch(/^GR-[A-Z]$/);
      });
    });

    it("ensures all units have valid car plates patterns array", () => {
      const units = getAdministrativeUnits() as Unit[];

      units.forEach((unit) => {
        expect(Array.isArray(unit.carPlatesPattern)).toBe(true);
        unit.carPlatesPattern.forEach((pattern) => {
          expect(typeof pattern).toBe("string");
          expect(pattern.length).toBeGreaterThan(0);
        });
      });
    });

    it("some units have car plates patterns", () => {
      const units = getAdministrativeUnits() as Unit[];
      const unitsWithPlates = units.filter((unit) => unit.carPlatesPattern.length > 0);

      expect(unitsWithPlates.length).toBeGreaterThan(0);
    });
  });

  describe("Mount Athos handling", () => {
    it("excludes Mount Athos unit by default", () => {
      const units = getAdministrativeUnits() as Unit[];
      const mountAthosUnits = units.filter((unit) => unit.region.id === MOUNT_ATHOS_REGION_ID);

      expect(mountAthosUnits.length).toBe(0);
    });

    it("includes Mount Athos unit when includeMountAthos is true", () => {
      const units = getAdministrativeUnits({ includeMountAthos: true }) as Unit[];
      const mountAthosUnits = units.filter((unit) => unit.region.id === MOUNT_ATHOS_REGION_ID);

      expect(mountAthosUnits.length).toBeGreaterThan(0);
    });

    it("correctly includes Mount Athos in both locales", () => {
      const greekUnits = getAdministrativeUnits({ locale: "el", includeMountAthos: true }) as Unit[];
      const englishUnits = getAdministrativeUnits({ locale: "en", includeMountAthos: true }) as Unit[];
      const greekMountAthos = greekUnits.filter((unit) => unit.region.id === MOUNT_ATHOS_REGION_ID);
      const englishMountAthos = englishUnits.filter((unit) => unit.region.id === MOUNT_ATHOS_REGION_ID);

      expect(greekMountAthos.length).toBe(englishMountAthos.length);
      expect(greekMountAthos.length).toBeGreaterThan(0);
    });

    it("Mount Athos unit has correct structure at municipality level", () => {
      const units = getAdministrativeUnits({ includeMountAthos: true }) as Unit[];
      const mountAthosUnits = units.filter((unit) => unit.region.id === MOUNT_ATHOS_REGION_ID);

      mountAthosUnits.forEach((unit) => {
        expect(unit).toHaveProperty("municipalities");
        expect(Array.isArray(unit.municipalities)).toBe(true);
      });
    });

    it("Mount Athos unit does not have municipalities property at unit level", () => {
      const units = getAdministrativeUnits({ includeMountAthos: true, level: "unit" }) as UnitWithoutMunicipalities[];
      const mountAthosUnits = units.filter((unit) => unit.region.id === MOUNT_ATHOS_REGION_ID);

      mountAthosUnits.forEach((unit) => {
        expect(unit).not.toHaveProperty("municipalities");
      });
    });
  });

  describe("data integrity", () => {
    it("ensures all unit IDs are unique", () => {
      const units = getAdministrativeUnits({ includeMountAthos: true }) as Unit[];
      const ids = units.map((unit) => unit.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it("ensures no duplicate units", () => {
      const units = getAdministrativeUnits({ includeMountAthos: true }) as Unit[];
      const serializedUnits = units.map((unit) => JSON.stringify(unit));
      const uniqueUnits = new Set(serializedUnits);

      expect(uniqueUnits.size).toBe(serializedUnits.length);
    });

    it("ensures unit IDs are positive numbers", () => {
      const units = getAdministrativeUnits({ includeMountAthos: true }) as Unit[];

      units.forEach((unit) => {
        expect(unit.id).toBeGreaterThan(0);
        expect(Number.isInteger(unit.id)).toBe(true);
      });
    });

    it("ensures all municipalities have valid regionAndUnit references", () => {
      const units = getAdministrativeUnits() as Unit[];

      units.forEach((unit) => {
        unit.municipalities.forEach((municipality) => {
          expect(municipality.regionAndUnit).toHaveProperty("regionId");
          expect(municipality.regionAndUnit).toHaveProperty("regionIso31662");
          expect(municipality.regionAndUnit).toHaveProperty("unitId");
          expect(municipality.regionAndUnit.regionId).toBe(unit.region.id);
          expect(municipality.regionAndUnit.regionIso31662).toBe(unit.region.iso31662);
        });
      });
    });
  });

  describe("specific units verification", () => {
    it("includes known units in Greek locale", () => {
      const units = getAdministrativeUnits({ locale: "el" }) as Unit[];
      const unitNames = units.map((unit) => unit.name);

      expect(unitNames).toContain("Κεντρικού Τομέα Αθηνών"); // Central Athens
      expect(unitNames).toContain("Θεσσαλονίκης"); // Thessaloniki
    });

    it("includes known units in English locale", () => {
      const units = getAdministrativeUnits({ locale: "en" }) as Unit[];
      const unitNames = units.map((unit) => unit.name);

      expect(unitNames).toContain("Central Athens");
      expect(unitNames).toContain("Thessaloniki");
    });

    it("verifies a specific unit has expected structure (Thessaloniki)", () => {
      const units = getAdministrativeUnits({ locale: "el" }) as Unit[];
      const thessaloniki = units.find((unit) => unit.name === "Θεσσαλονίκης");

      expect(thessaloniki).toBeDefined();
      if (thessaloniki) {
        expect(thessaloniki.id).toBeGreaterThan(0);
        expect(thessaloniki.seat).toBe("Θεσσαλονίκη");
        expect(thessaloniki.carPlatesPattern.length).toBeGreaterThan(0);
        expect(thessaloniki.municipalities.length).toBeGreaterThan(0);
      }
    });
  });

  describe("combined options", () => {
    it("correctly handles all options together (Greek, Mount Athos, municipality level)", () => {
      const result = getAdministrativeUnits({
        locale: "el",
        includeMountAthos: true,
        level: "municipality",
      });

      expect(result.length).toBe(75);
      expect(result.every((unit) => "municipalities" in unit)).toBe(true);
    });

    it("correctly handles all options together (English, no Mount Athos, unit level)", () => {
      const result = getAdministrativeUnits({
        locale: "en",
        includeMountAthos: false,
        level: "unit",
      });

      expect(result.length).toBe(74);
      expect(result.every((unit) => !("municipalities" in unit))).toBe(true);
    });

    it("correctly handles all options together (Greek, no Mount Athos, unit level)", () => {
      const result = getAdministrativeUnits({
        locale: "el",
        includeMountAthos: false,
        level: "unit",
      });

      expect(result.length).toBe(74);
      expect(result.every((unit) => !("municipalities" in unit))).toBe(true);
    });

    it("correctly handles all options together (English, Mount Athos, unit level)", () => {
      const result = getAdministrativeUnits({
        locale: "en",
        includeMountAthos: true,
        level: "unit",
      });

      expect(result.length).toBe(75);
      expect(result.every((unit) => !("municipalities" in unit))).toBe(true);
    });
  });
});
