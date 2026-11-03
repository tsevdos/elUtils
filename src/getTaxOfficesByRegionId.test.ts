import { getTaxOfficesByRegionId } from "./getTaxOfficesByRegionId";

describe("getTaxOfficesByRegionId", () => {
  it("get tax offices with region id 1", () => {
    expect(getTaxOfficesByRegionId({ id: 1 })).toEqual([
      {
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
      },
      {
        id: 27,
        name: "Αλεξανδρούπολης ",
        officialName: "ΔΟΥ Αλεξανδρούπολης ",
        relations: {
          regionId: 1,
          regionIso: "GR-A",
          unitIds: [2],
          municipalityIds: [6, 9, 10],
        },
        postalCodes: [68132, 68131, 68133, 68150, 68500, 69300, 68002, 68004, 68400, 68003],
      },
      {
        id: 50,
        name: "Κομοτηνής",
        officialName: "ΔΟΥ Κομοτηνής",
        relations: {
          regionId: 1,
          regionIso: "GR-A",
          unitIds: [6],
          municipalityIds: [19, 20, 21, 22],
        },
        postalCodes: [69300, 69150, 69200, 69132, 69131, 69133, 69400],
      },
      {
        id: 63,
        name: "Ορεστιάδας",
        officialName: "ΔΟΥ Ορεστιάδας",
        relations: {
          regionId: 1,
          regionIso: "GR-A",
          unitIds: [2],
          municipalityIds: [7, 8, 10],
        },
        postalCodes: [68010, 68300, 68200, 68006, 68007, 68400, 68004],
      },
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
      {
        id: 75,
        name: "Καβάλας",
        officialName: "ΔΟΥ Καβάλας",
        relations: {
          regionId: 1,
          regionIso: "GR-A",
          unitIds: [4, 3],
          municipalityIds: [14, 11, 12, 13],
        },
        postalCodes: [
          64010, 64004, 64002, 64005, 65404, 65302, 65403, 65201, 65500, 64006, 64003, 64200, 64009, 64007, 64100,
          64008,
        ],
      },
    ]);
  });

  it("get tax offices with region id 8", () => {
    expect(getTaxOfficesByRegionId({ id: 8 })).toEqual([
      {
        id: 13,
        name: "Καρπενησίου (Α-Β)",
        officialName: "ΔΟΥ Καρπενησίου (Α-Β)",
        relations: {
          regionId: 8,
          regionIso: "GR-H",
          unitIds: [37],
          municipalityIds: [162, 161],
        },
        postalCodes: [36071, 36072, 36073, 36100, 43150, 36076, 36074, 36080],
      },
      {
        id: 28,
        name: "Λειβαδιάς (Α)",
        officialName: "ΔΟΥ Λειβαδιάς (Α)",
        relations: {
          regionId: 8,
          regionIso: "GR-H",
          unitIds: [35],
          municipalityIds: [149, 152, 151, 150],
        },
        postalCodes: [32001, 32003, 32004, 32005, 32131, 32150, 32006, 32300],
      },
      {
        id: 29,
        name: "Θηβών (Α-Β)",
        officialName: "ΔΟΥ Θηβών (Α-Β)",
        relations: {
          regionId: 8,
          regionIso: "GR-H",
          unitIds: [35, 36],
          municipalityIds: [149, 148, 150, 147],
        },
        postalCodes: [32001, 32200, 32010, 32300, 34150, 32009],
      },
      {
        id: 37,
        name: "Λαμίας (Α)",
        officialName: "ΔΟΥ Λαμίας (Α)",
        relations: {
          regionId: 8,
          regionIso: "GR-H",
          unitIds: [38],
          municipalityIds: [164, 169, 165, 166, 163, 168],
        },
        postalCodes: [
          35015, 35002, 33057, 35200, 35010, 35009, 35006, 35008, 35132, 35133, 35150, 35131, 35003, 35011, 35001,
          35005, 35017, 35300,
        ],
      },
      {
        id: 62,
        name: "Άμφισσας (Α-Β)",
        officialName: "ΔΟΥ Άμφισσας (Α-Β)",
        relations: {
          regionId: 8,
          regionIso: "GR-H",
          unitIds: [39],
          municipalityIds: [170, 171],
        },
        postalCodes: [33100, 33058, 33200, 33053, 33057, 33054, 32004, 33056],
      },
      {
        id: 66,
        name: "Χαλκίδας (Α)",
        officialName: "ΔΟΥ Χαλκίδας (Α)",
        relations: {
          regionId: 8,
          regionIso: "GR-H",
          unitIds: [36],
          municipalityIds: [156, 158, 154, 159, 155, 157],
        },
        postalCodes: [
          34600, 34400, 34008, 34006, 34200, 34300, 34005, 34004, 34132, 34133, 34150, 34131, 34002, 32009, 32200,
        ],
      },
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

  it("returns tax offices in English when locale is en", () => {
    const taxOffices = getTaxOfficesByRegionId({ id: 1, locale: "en" });

    expect(taxOffices).toHaveLength(6);
    expect(taxOffices[0]).toMatchObject({
      id: 1,
      name: "Xanthi",
      officialName: "TAX OFFICE Xanthi",
    });
  });

  it("returns empty array on invalid region id", () => {
    expect(getTaxOfficesByRegionId({ id: 1000000000 })).toEqual([]);
  });
});
