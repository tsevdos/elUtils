import { getGeographicRegions } from "./getGeographicRegions";

describe("getGeographicRegions:", () => {
  it("correctly returns all geographic regions in greek language", () => {
    const regions = getGeographicRegions();

    expect(regions).toEqual(getGeographicRegions({ locale: "el" }));
    expect(regions.length).toBe(9);
    expect(regions[0]).toEqual({
      id: 1,
      name: "Ήπειρος",
      seat: "Ιωάννινα",
      administrativeRegions: [{ id: 4, iso31662: "GR-D" }],
    });
  });

  it("correctly returns all geographic regions in english language", () => {
    const regions = getGeographicRegions({ locale: "en" });

    expect(regions.length).toBe(9);
    expect(regions[0]).toEqual({
      id: 1,
      name: "Epirus",
      seat: "Ioannina",
      administrativeRegions: [{ id: 4, iso31662: "GR-D" }],
    });
  });

  it("returns regions with correct data structure", () => {
    const regions = getGeographicRegions();

    regions.forEach((region) => {
      expect(region).toHaveProperty("id");
      expect(region).toHaveProperty("name");
      expect(region).toHaveProperty("seat");
      expect(region).toHaveProperty("administrativeRegions");
      expect(Array.isArray(region.administrativeRegions)).toBe(true);
    });
  });

  it("includes well-known geographic regions (Greek)", () => {
    const regions = getGeographicRegions({ locale: "el" });
    const regionNames = regions.map((r) => r.name);

    expect(regionNames).toContain("Κρήτη");
    expect(regionNames).toContain("Μακεδονία");
    expect(regionNames).toContain("Θεσσαλία");
  });

  it("includes well-known geographic regions (English)", () => {
    const regions = getGeographicRegions({ locale: "en" });
    const regionNames = regions.map((r) => r.name);

    expect(regionNames).toContain("Crete");
    expect(regionNames).toContain("Macedonia");
    expect(regionNames).toContain("Thessaly");
  });

  it("has consistent data between locales (same IDs)", () => {
    const elRegions = getGeographicRegions({ locale: "el" });
    const enRegions = getGeographicRegions({ locale: "en" });
    const elIds = elRegions.map((r) => r.id).sort((a, b) => a - b);
    const enIds = enRegions.map((r) => r.id).sort((a, b) => a - b);

    expect(elIds).toEqual(enIds);
  });
});
