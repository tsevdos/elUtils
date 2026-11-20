import { getAllTaxOffices } from "./getAllTaxOffices";

describe("getAllTaxOffices", () => {
  it("correctly returns all tax offices data (in greek)", () => {
    const taxOffices = getAllTaxOffices();

    expect(taxOffices[0]).toEqual({
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

  it("correctly returns all tax offices data (in english)", () => {
    const taxOffices = getAllTaxOffices({ locale: "en" });

    expect(taxOffices[0]).toEqual({
      id: 1,
      name: "Xanthi",
      officialName: "TAX OFFICE Xanthi",
      relations: {
        regionId: 1,
        regionIso: "GR-A",
        unitIds: [5],
        municipalityIds: [15, 16, 17, 18],
      },
      postalCodes: [67064, 67150, 67300, 67131, 67133, 67132, 67062, 66035, 66150, 69200, 67200],
    });
  });

  it("returns same data when explicitly passing locale 'el'", () => {
    expect(getAllTaxOffices({ locale: "el" })).toEqual(getAllTaxOffices());
  });

  it("returns an array", () => {
    expect(Array.isArray(getAllTaxOffices())).toBe(true);
  });

  it("returns a non-empty array", () => {
    expect(getAllTaxOffices().length).toBeGreaterThan(0);
  });

  it("returns tax offices with the expected structure", () => {
    const taxOffices = getAllTaxOffices();
    taxOffices.forEach((office) => {
      expect(office).toHaveProperty("id");
      expect(office).toHaveProperty("name");
      expect(office).toHaveProperty("officialName");
      expect(office).toHaveProperty("relations");
    });
  });

  it("has the same number of tax offices in both locales", () => {
    expect(getAllTaxOffices({ locale: "el" }).length).toBe(getAllTaxOffices({ locale: "en" }).length);
  });

  it("has matching IDs across both locales", () => {
    const greekIds = getAllTaxOffices({ locale: "el" }).map((o) => o.id);
    const englishIds = getAllTaxOffices({ locale: "en" }).map((o) => o.id);
    expect(greekIds).toEqual(englishIds);
  });
});
