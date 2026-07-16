import { getTaxOfficeById } from "./getTaxOfficeById";

describe("getTaxOfficeById", () => {
  it("returns undefined if tax office ID is invalid", () => {
    expect(getTaxOfficeById({ id: 1120 })).toBeUndefined();
  });

  it("returns undefined for id 0", () => {
    expect(getTaxOfficeById({ id: 0 })).toBeUndefined();
  });

  it("returns undefined for negative id", () => {
    expect(getTaxOfficeById({ id: -1 })).toBeUndefined();
  });

  it("returns tax office data if tax office ID is valid", () => {
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

  it("returns tax office data in English when locale is 'en'", () => {
    const result = getTaxOfficeById({ id: 1, locale: "en" });
    expect(result).toBeDefined();
    expect(result?.name).toBe("Xanthi");
  });

  it("returns different names for the same id in different locales", () => {
    const greek = getTaxOfficeById({ id: 1, locale: "el" });
    const english = getTaxOfficeById({ id: 1, locale: "en" });
    expect(greek?.name).toBe("Ξάνθης");
    expect(english?.name).toBe("Xanthi");
  });

  it("returns tax office with expected structure", () => {
    const result = getTaxOfficeById({ id: 1 });
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("officialName");
    expect(result).toHaveProperty("relations");
    expect(result).toHaveProperty("postalCodes");
  });

  it("returns correct data for another valid id", () => {
    const result = getTaxOfficeById({ id: 2 });
    expect(result?.id).toBe(2);
    expect(result?.name).toBe("Κω");
  });
});
