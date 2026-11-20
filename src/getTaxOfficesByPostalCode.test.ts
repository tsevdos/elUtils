import { getTaxOfficesByPostalCode } from "./getTaxOfficesByPostalCode";

describe("getTaxOfficesByPostalCode", () => {
  it("get tax offices with postal code 11526", () => {
    expect(getTaxOfficesByPostalCode({ postalCode: 11526 })).toEqual([
      {
        id: 21,
        name: "ΙΒ' Αθηνών",
        officialName: "ΔΟΥ ΙΒ' Αθηνών",
        relations: {
          regionId: 9,
          regionIso: "GR-I",
          unitIds: [42],
          municipalityIds: [193, 198],
        },
        postalCodes: [11527, 11526, 11528, 15772, 15773, 15771],
      },
    ]);
  });

  it("get tax offices with postal code 67064", () => {
    expect(getTaxOfficesByPostalCode({ postalCode: 67064 })).toEqual([
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
    ]);
  });

  it("returns all tax offices associated with the postal code", () => {
    expect(getTaxOfficesByPostalCode({ postalCode: 66150 }).map(({ id }) => id)).toEqual([1, 67]);
  });

  it("returns tax office names in English when requested", () => {
    expect(
      getTaxOfficesByPostalCode({ postalCode: 67064, locale: "en" }).map(({ name, officialName }) => ({
        name,
        officialName,
      })),
    ).toEqual([{ name: "Xanthi", officialName: "TAX OFFICE Xanthi" }]);
  });

  it("returns empty array on invalid postalcode", () => {
    expect(getTaxOfficesByPostalCode({ postalCode: 11111111111 })).toEqual([]);
  });

  it("returns empty array when no tax office matches a valid-format postal code", () => {
    expect(getTaxOfficesByPostalCode({ postalCode: 12345 })).toEqual([]);
  });
});
