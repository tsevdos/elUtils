import { searchTaxOffice } from "./searchTaxOffice";

describe("searchTaxOffice", () => {
  it("returns empty array on empty searchTerm", () => {
    expect(searchTaxOffice({ searchTerm: "     " })).toEqual([]);
  });

  it("returns empty array when no tax office matches the searchTerm", () => {
    expect(searchTaxOffice({ searchTerm: "no matching tax office" })).toEqual([]);
  });

  it("matches Greek names regardless of accents, case, and spacing", () => {
    expect(searchTaxOffice({ searchTerm: "νικαιας α β" }).map(({ id, name }) => ({ id, name }))).toEqual([
      { id: 4, name: "Νίκαιας (Α-Β)" },
    ]);
  });

  it("returns tax office that has 'ΑΘ' in their names", () => {
    expect(searchTaxOffice({ searchTerm: "ΑΘ" })).toEqual([
      {
        id: 16,
        name: "Α' Αθηνών",
        officialName: "ΔΟΥ Α' Αθηνών",
        postalCodes: [
          10431, 10432, 10677, 11851, 10443, 10551, 10554, 11854, 11853, 11852, 11742, 10442, 11855, 10435, 10436,
          10437, 10444, 10556, 10560, 11741, 10447, 10438, 10555, 10553, 10440, 10558, 10552, 10441, 10559, 10564,
          10678, 10679, 10439, 17778,
        ],
        relations: {
          municipalityIds: [193, 199, 187],
          regionId: 9,
          regionIso: "GR-I",
          unitIds: [42, 43, 41],
        },
      },
      {
        id: 17,
        name: "Δ' Αθηνών",
        officialName: "ΔΟΥ Δ' Αθηνών",
        postalCodes: [
          10433, 10434, 10682, 11472, 11473, 11471, 10563, 10671, 10672, 10683, 10675, 10676, 10557, 10673, 10674,
          10680, 10681, 10562, 10561,
        ],
        relations: { municipalityIds: [193], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 18,
        name: "ΙΓ' Αθηνών",
        officialName: "ΔΟΥ ΙΓ' Αθηνών",
        postalCodes: [
          11251, 11257, 11476, 11142, 10446, 11252, 11474, 10445, 11255, 11256, 11361, 11364, 11141, 11144, 11253,
          11254, 11363, 11145, 11362, 11475, 11143, 11146, 11147,
        ],
        relations: { municipalityIds: [193, 192], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 19,
        name: "ΙΖ' Αθηνών",
        officialName: "ΔΟΥ ΙΖ' Αθηνών",
        postalCodes: [11631, 11632, 11744, 11635, 11633, 11636, 11743, 11634, 11745, 16121, 16233, 16231, 16232, 16122],
        relations: {
          municipalityIds: [193, 196, 197],
          regionId: 9,
          regionIso: "GR-I",
          unitIds: [42],
        },
      },
      {
        id: 21,
        name: "ΙΒ' Αθηνών",
        officialName: "ΔΟΥ ΙΒ' Αθηνών",
        postalCodes: [11527, 11526, 11528, 15772, 15773, 15771],
        relations: { municipalityIds: [193, 198], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      { id: 95, name: "ΦAE Αθηνών (Α1)", officialName: "ΔΟΥ ΦAE Αθηνών (Α1)", relations: {} },
    ]);
  });

  it("returns tax office that has 'ATH' in their names", () => {
    expect(searchTaxOffice({ searchTerm: "ATH", locale: "en" })).toEqual([
      {
        id: 16,
        name: "A' Athens",
        officialName: "TAX OFFICE A' Athens",
        postalCodes: [
          10431, 10432, 10677, 11851, 10443, 10551, 10554, 11854, 11853, 11852, 11742, 10442, 11855, 10435, 10436,
          10437, 10444, 10556, 10560, 11741, 10447, 10438, 10555, 10553, 10440, 10558, 10552, 10441, 10559, 10564,
          10678, 10679, 10439, 17778,
        ],
        relations: {
          municipalityIds: [193, 199, 187],
          regionId: 9,
          regionIso: "GR-I",
          unitIds: [42, 43, 41],
        },
      },
      {
        id: 17,
        name: "D' Athens",
        officialName: "TAX OFFICE D' Athens",
        postalCodes: [
          10433, 10434, 10682, 11472, 11473, 11471, 10563, 10671, 10672, 10683, 10675, 10676, 10557, 10673, 10674,
          10680, 10681, 10562, 10561,
        ],
        relations: { municipalityIds: [193], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 18,
        name: "ΙC' Athens",
        officialName: "TAX OFFICE IC' Athens",
        postalCodes: [
          11251, 11257, 11476, 11142, 10446, 11252, 11474, 10445, 11255, 11256, 11361, 11364, 11141, 11144, 11253,
          11254, 11363, 11145, 11362, 11475, 11143, 11146, 11147,
        ],
        relations: { municipalityIds: [193, 192], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 19,
        name: "IZ' Athens",
        officialName: "TAX OFFICE IZ' Athens",
        postalCodes: [11631, 11632, 11744, 11635, 11633, 11636, 11743, 11634, 11745, 16121, 16233, 16231, 16232, 16122],
        relations: {
          municipalityIds: [193, 196, 197],
          regionId: 9,
          regionIso: "GR-I",
          unitIds: [42],
        },
      },
      {
        id: 21,
        name: "IB' Athens",
        officialName: "TAX OFFICE IB' Athens",
        postalCodes: [11527, 11526, 11528, 15772, 15773, 15771],
        relations: { municipalityIds: [193, 198], regionId: 9, regionIso: "GR-I", unitIds: [42] },
      },
      {
        id: 95,
        name: "FAE Athens (A1)",
        officialName: "TAX OFFICE FAE Athens (A1)",
        relations: {},
      },
    ]);
  });
});
