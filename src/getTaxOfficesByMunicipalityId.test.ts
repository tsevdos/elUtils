import { getTaxOfficesByMunicipalityId } from "./getTaxOfficesByMunicipalityId";

describe("getTaxOfficesByMunicipalityId", () => {
  it("get tax offices with municipality id 1", () => {
    expect(getTaxOfficesByMunicipalityId({ id: 1 })).toEqual([
      {
        id: 67,
        name: "Δράμας",
        officialName: "ΔΟΥ Δράμας",
        relations: {
          regionId: 1,
          regionIso: "GR-A",
          unitIds: [1],
          municipalityIds: [1, 2, 3, 4, 5],
        },
        postalCodes: [66031, 66300, 66131, 66132, 66133, 66150, 66033, 66035, 66200, 62042],
      },
    ]);
  });

  it("get tax offices with municipality id 160", () => {
    expect(getTaxOfficesByMunicipalityId({ id: 160 })).toEqual([
      {
        id: 83,
        name: "Κύμης (Β)",
        officialName: "ΔΟΥ Κύμης (Β)",
        relations: {
          regionId: 8,
          regionIso: "GR-H",
          unitIds: [36],
          municipalityIds: [160, 159, 153],
        },
        postalCodes: [34001, 34013, 34015, 34009, 34003, 34500, 34007],
      },
    ]);
  });

  it("returns all tax offices associated with the municipality id", () => {
    expect(getTaxOfficesByMunicipalityId({ id: 150 }).map(({ id }) => id)).toEqual([28, 29]);
  });

  it("returns tax office names in English when requested", () => {
    expect(
      getTaxOfficesByMunicipalityId({ id: 1, locale: "en" }).map(({ name, officialName }) => ({ name, officialName })),
    ).toEqual([{ name: "Drama", officialName: "TAX OFFICE Drama" }]);
  });

  it("returns empty array on invalid municipality id", () => {
    expect(getTaxOfficesByMunicipalityId({ id: 10000000 })).toEqual([]);
  });
});
