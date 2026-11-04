import { getTaxOfficesByUnitId } from "./getTaxOfficesByUnitId";

describe("getTaxOfficesByUnitId", () => {
  it("get tax offices with unit id 1", () => {
    expect(getTaxOfficesByUnitId({ id: 1 })).toEqual([
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

  it("get tax offices with unit id 26", () => {
    expect(getTaxOfficesByUnitId({ id: 26 })).toEqual([
      {
        id: 80,
        name: "Τρικάλων",
        officialName: "ΔΟΥ Τρικάλων",
        relations: {
          regionId: 5,
          regionIso: "GR-E",
          unitIds: [26],
          municipalityIds: [114, 113, 115, 116],
        },
        postalCodes: [42200, 42032, 42150, 42132, 42131, 42031, 43200],
      },
    ]);
  });

  it("returns all tax offices associated with the unit id", () => {
    expect(getTaxOfficesByUnitId({ id: 35 }).map(({ id }) => id)).toEqual([28, 29]);
  });

  it("returns tax office names in English when requested", () => {
    expect(
      getTaxOfficesByUnitId({ id: 1, locale: "en" }).map(({ name, officialName }) => ({ name, officialName })),
    ).toEqual([{ name: "Drama", officialName: "TAX OFFICE Drama" }]);
  });

  it("returns empty array on invalid unit id", () => {
    expect(getTaxOfficesByUnitId({ id: 1000000000 })).toEqual([]);
  });
});
