import { getAllTaxOffices } from "./getAllTaxOffices";
import taxOfficesEl from "./data/taxOffices-el.json";
import taxOfficesEn from "./data/taxOffices-en.json";

// const allTaxOffices = { el: taxOfficesEl, en: taxOfficesEn } as const;

describe("getAllTaxOffices", () => {
  it("corectly returns all tax offices data (in greek)", () => {
    expect(getAllTaxOffices()).toEqual(taxOfficesEl);
  });

  it("corectly returns all tax offices data (in english)", () => {
    expect(getAllTaxOffices({ locale: "en" })).toEqual(taxOfficesEn);
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
