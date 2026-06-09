import { getAdministrativeUnits } from "./getAdministrativeUnits";
import { getAdministrativeUnitById } from "./getAdministrativeUnitById";

describe("getAdministrativeUnitById", () => {
  it("correctly returns region with default values (in greek language)", () => {
    const expectedData = getAdministrativeUnits()[0];

    expect(getAdministrativeUnitById({ id: 1 })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 1, locale: "el" })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 1, includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 1, level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(
      getAdministrativeUnitById({
        id: 1,
        locale: "el",
        includeMountAthos: false,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns Mount Athos region (in greek language)", () => {
    const expectedData = getAdministrativeUnits({ includeMountAthos: true })[74];

    expect(getAdministrativeUnitById({ id: 75, includeMountAthos: true })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 75, locale: "el", includeMountAthos: true })).toEqual(expectedData);
    expect(
      getAdministrativeUnitById({
        id: 75,
        locale: "el",
        includeMountAthos: true,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns region data with correct level (in greek language)", () => {
    const expectedUnitLevelData = getAdministrativeUnits({ level: "unit" })[15];
    const expectedMunicipalityLevelData = getAdministrativeUnits({ level: "municipality" })[15];

    expect(getAdministrativeUnitById({ id: 16, level: "unit" })).toEqual(expectedUnitLevelData);
    expect(getAdministrativeUnitById({ id: 16, level: "municipality" })).toEqual(expectedMunicipalityLevelData);
  });

  it("correctly returns region (in english language)", () => {
    const expectedData = getAdministrativeUnits({ locale: "en" })[3];

    expect(getAdministrativeUnitById({ id: 4, locale: "en" })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 4, locale: "en", includeMountAthos: false })).toEqual(expectedData);
    expect(getAdministrativeUnitById({ id: 4, locale: "en", level: "municipality" })).toEqual(expectedData);
    // all default options
    expect(
      getAdministrativeUnitById({
        id: 4,
        locale: "en",
        includeMountAthos: false,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns Mount Athos region (in english language)", () => {
    const expectedData = getAdministrativeUnits({ locale: "en", includeMountAthos: true })[74];

    expect(getAdministrativeUnitById({ id: 75, locale: "en", includeMountAthos: true })).toEqual(expectedData);
    expect(
      getAdministrativeUnitById({
        id: 75,
        locale: "en",
        includeMountAthos: true,
        level: "municipality",
      }),
    ).toEqual(expectedData);
  });

  it("correctly returns region data with correct level (in english language)", () => {
    const expectedUnitLevelData = getAdministrativeUnits({ locale: "en", level: "unit" })[25];
    const expectedMunicipalityLevelData = getAdministrativeUnits({ locale: "en", level: "municipality" })[25];

    expect(getAdministrativeUnitById({ id: 26, locale: "en", level: "unit" })).toStrictEqual(expectedUnitLevelData);
    expect(getAdministrativeUnitById({ id: 26, locale: "en", level: "municipality" })).toStrictEqual(
      expectedMunicipalityLevelData,
    );
  });

  it("returns undefined for non-existent IDs", () => {
    expect(getAdministrativeUnitById({ id: 999 })).toBeUndefined();
    expect(getAdministrativeUnitById({ id: 0 })).toBeUndefined();
    expect(getAdministrativeUnitById({ id: -1 })).toBeUndefined();
    expect(getAdministrativeUnitById({ id: 100, locale: "en" })).toBeUndefined();
  });

  it("returns undefined for Mount Athos ID when includeMountAthos is false", () => {
    expect(getAdministrativeUnitById({ id: 75 })).toBeUndefined();
    expect(getAdministrativeUnitById({ id: 75, includeMountAthos: false })).toBeUndefined();
    expect(getAdministrativeUnitById({ id: 75, locale: "en" })).toBeUndefined();
    expect(getAdministrativeUnitById({ id: 75, locale: "en", includeMountAthos: false })).toBeUndefined();
  });

  it("returns data for first and last valid IDs", () => {
    const firstUnit = getAdministrativeUnitById({ id: 1 });
    expect(firstUnit).toBeDefined();
    expect(firstUnit?.id).toBe(1);

    // Test last ID in the dataset without Mount Athos
    const lastUnit = getAdministrativeUnitById({ id: 74 });
    expect(lastUnit).toBeDefined();
    expect(lastUnit?.id).toBe(74);

    // Test Mount Athos as last ID when included
    const mountAthos = getAdministrativeUnitById({ id: 75, includeMountAthos: true });
    expect(mountAthos).toBeDefined();
    expect(mountAthos?.id).toBe(75);
  });

  it("returns correct data structure for municipality level", () => {
    const unit = getAdministrativeUnitById({ id: 10, level: "municipality" });

    expect(unit).toBeDefined();
    expect(unit).toHaveProperty("id");
    expect(unit).toHaveProperty("name");
    expect(unit).toHaveProperty("seat");
    expect(unit).toHaveProperty("region");
    expect(unit).toHaveProperty("carPlatesPattern");
    expect(unit).toHaveProperty("municipalities");

    if (unit && "municipalities" in unit) {
      expect(Array.isArray(unit.municipalities)).toBe(true);
    }
  });

  it("returns correct data structure for unit level (without municipalities)", () => {
    const unit = getAdministrativeUnitById({ id: 10, level: "unit" });

    expect(unit).toBeDefined();
    expect(unit).toHaveProperty("id");
    expect(unit).toHaveProperty("name");
    expect(unit).toHaveProperty("seat");
    expect(unit).toHaveProperty("region");
    expect(unit).toHaveProperty("carPlatesPattern");
    expect(unit).not.toHaveProperty("municipalities");
  });

  it("correctly retrieves various units from different regions", () => {
    // Test a few different IDs to ensure consistency across the dataset
    const ids = [1, 10, 25, 40, 60];

    ids.forEach((id) => {
      const unit = getAdministrativeUnitById({ id });
      expect(unit).toBeDefined();
      expect(unit?.id).toBe(id);
    });
  });

  it("returns data with matching locale for both Greek and English", () => {
    const unitEl = getAdministrativeUnitById({ id: 5, locale: "el" });
    const unitEn = getAdministrativeUnitById({ id: 5, locale: "en" });

    expect(unitEl).toBeDefined();
    expect(unitEn).toBeDefined();

    if (unitEl && unitEn) {
      // Same ID, different locales should have same structure but different names
      expect(unitEl.id).toBe(unitEn.id);
      expect(unitEl.name).not.toBe(unitEn.name); // Different language
      expect(unitEl.region.id).toBe(unitEn.region.id);
      expect(unitEl.region.iso31662).toBe(unitEn.region.iso31662);
    }
  });
});
