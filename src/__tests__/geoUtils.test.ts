import countriesEl from "../../data/countries-el.json";
import countriesEn from "../../data/countries-en.json";
import {
  getTaxOfficesByMunicipalityId,
  getTaxOfficesByPostalCode,
  getTaxOfficesByUnitId,
  searchTaxOffice,
  getCountries,
  searchCountryByName,
  getCountry,
} from "../geoUtils";

const allCountries = { el: countriesEl, en: countriesEn } as const;

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

  it("returns empty array on invalid unit id", () => {
    expect(getTaxOfficesByUnitId({ id: 1000000000 })).toEqual([]);
  });
});

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

  it("returns empty array on invalid municipality id", () => {
    expect(getTaxOfficesByMunicipalityId({ id: 10000000 })).toEqual([]);
  });
});

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

  it("returns empty array on invalid postalcode", () => {
    expect(getTaxOfficesByPostalCode({ postalCode: 11111111111 })).toEqual([]);
  });
});

describe("searchTaxOffice", () => {
  it("returns empty array on empty searchTerm", () => {
    expect(searchTaxOffice({ searchTerm: "     " })).toEqual([]);
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

describe("getCountries", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const expectedData = allCountries.el;

    expect(getCountries()).toEqual(expectedData);
    expect(getCountries({ locale: "el" })).toEqual(expectedData);
    expect(getCountries().length).toEqual(249);
  });

  it("correctly returns data (in english language)", () => {
    const expectedData = allCountries.en;

    expect(getCountries({ locale: "en" })).toEqual(expectedData);
    expect(getCountries({ locale: "en" }).length).toEqual(249);
  });
});

describe("searchCountryByName", () => {
  it("given the search term 'Ελλάδα', returns Greece (in greek language)", () => {
    const greeceIndex = allCountries.el.findIndex(({ name }) => name === "Ελλάδα");

    expect(searchCountryByName({ searchTerm: "Ελλάδα" })).toEqual([allCountries.el[greeceIndex]]);
    expect(searchCountryByName({ searchTerm: "Ελλάδα" })?.length).toBe(1);
  });

  it("given the search term 'ελλα', returns Greece (in greek language)", () => {
    const greeceIndex = allCountries.el.findIndex(({ name }) => name === "Ελλάδα");

    expect(searchCountryByName({ searchTerm: "ελλα", locale: "el" })).toEqual([allCountries.el[greeceIndex]]);
    expect(searchCountryByName({ searchTerm: "ελλα", locale: "el" })?.length).toBe(1);
  });

  it("given the search term 'ηνωμε', returns all (7) the correct countries (in greek language)", () => {
    const expectedCountries = [
      {
        id: "484",
        name: "Μεξικό",
        completeName: "Μεξικό",
        officialName: "Οι Ηνωμένες Μεξικανικές Πολιτείες",
        sovereignty: "Μέλος του ΟΗΕ",
        iso31661: { A2: "MX", A3: "MEX" },
        tld: ".mx",
      },
      {
        id: "581",
        name: "Απομακρυσμένες Νησίδες των Ηνωμένων Πολιτειών",
        completeName: "Απομακρυσμένες Νησίδες των Ηνωμένων Πολιτειών",
        officialName:
          "Νήσος Μπέικερ, Νήσος Χάουλαντ, Νήσος Τζάρβις, Ατόλη Τζόνστον, Ύφαλος Κίνγκμαν, Ατόλη Μίντγουεϊ, Νήσος Ναβάσσα, Ατόλη Παλμίρα, και Νήσος Γουέικ",
        sovereignty: "Ηνωμένες Πολιτείες",
        iso31661: { A2: "UM", A3: "UMI" },
        tld: "[af]",
      },
      {
        id: "784",
        name: "Ηνωμένα Αραβικά Εμιράτα",
        completeName: "Τα Ηνωμένα Αραβικά Εμιράτα",
        officialName: "Τα Ηνωμένα Αραβικά Εμιράτα",
        sovereignty: "Μέλος του ΟΗΕ",
        iso31661: { A2: "AE", A3: "ARE" },
        tld: ".ae",
      },
      {
        id: "826",
        name: "Ηνωμένο Βασίλειο",
        completeName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
        officialName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
        sovereignty: "Μέλος του ΟΗΕ",
        iso31661: { A2: "GB", A3: "GBR" },
        tld: ".gb",
      },
      {
        id: "834",
        name: "Τανζανία",
        completeName: "Η Ηνωμένη Δημοκρατία της Τανζανίας",
        officialName: "Η Ηνωμένη Δημοκρατία της Τανζανίας",
        sovereignty: "Μέλος του ΟΗΕ",
        iso31661: { A2: "TZ", A3: "TZA" },
        tld: ".tz",
      },
      {
        id: "840",
        name: "Ηνωμένες Πολιτείες της Αμερικής",
        completeName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
        officialName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
        sovereignty: "Μέλος του ΟΗΕ",
        iso31661: { A2: "US", A3: "USA" },
        tld: ".us",
      },
      {
        id: "850",
        name: "Παρθένοι Νήσοι",
        completeName: "Παρθένοι Νήσοι (ΗΠΑ)",
        officialName: "Οι Παρθένοι Νήσοι των Ηνωμένων Πολιτειών",
        sovereignty: "Ηνωμένες Πολιτείες",
        iso31661: { A2: "VI", A3: "VIR" },
        tld: ".vi",
      },
    ];

    expect(searchCountryByName({ searchTerm: "ηνωμε" })).toEqual(expectedCountries);
    expect(searchCountryByName({ searchTerm: "ηνωμε" })?.length).toBe(7);
  });
});

describe("getCountry", () => {
  it("correctly returns a country with specific id (in greek language)", () => {
    expect(getCountry({ locale: "el", type: "id", value: "300" })).toEqual(allCountries.el[87]);
    expect(getCountry({ locale: "el", type: "id", value: "840" })).toEqual(allCountries.el[239]);
    expect(getCountry({ locale: "el", type: "id", value: "826" })).toEqual(allCountries.el[234]);
  });

  it("correctly returns a country with specific iso31661 A2 (in greek language)", () => {
    expect(getCountry({ locale: "el", type: "iso31661-a2", value: "GR" })).toEqual(allCountries.el[87]);
    expect(getCountry({ locale: "el", type: "iso31661-a2", value: "US" })).toEqual(allCountries.el[239]);
    expect(getCountry({ locale: "el", type: "iso31661-a2", value: "GB" })).toEqual(allCountries.el[234]);
  });

  it("correctly returns a country with specific iso31661 A2 (in greek language)", () => {
    expect(getCountry({ locale: "el", type: "iso31661-a3", value: "GRC" })).toEqual(allCountries.el[87]);
    expect(getCountry({ locale: "el", type: "iso31661-a3", value: "USA" })).toEqual(allCountries.el[239]);
    expect(getCountry({ locale: "el", type: "iso31661-a3", value: "GBR" })).toEqual(allCountries.el[234]);
  });

  it("correctly returns a country with top level domain (in greek language)", () => {
    expect(getCountry({ locale: "el", type: "tld", value: ".gr" })).toEqual(allCountries.el[87]);
    expect(getCountry({ locale: "el", type: "tld", value: ".us" })).toEqual(allCountries.el[239]);
    expect(getCountry({ locale: "el", type: "tld", value: ".gb" })).toEqual(allCountries.el[234]);
  });

  it("correctly returns a country with specific id (in english language)", () => {
    expect(getCountry({ locale: "en", type: "id", value: "300" })).toEqual(allCountries.en[87]);
    expect(getCountry({ locale: "en", type: "id", value: "840" })).toEqual(allCountries.en[239]);
    expect(getCountry({ locale: "en", type: "id", value: "826" })).toEqual(allCountries.en[234]);
  });

  it("correctly returns a country with specific iso31661 A2 (in english language)", () => {
    expect(getCountry({ locale: "en", type: "iso31661-a2", value: "GR" })).toEqual(allCountries.en[87]);
    expect(getCountry({ locale: "en", type: "iso31661-a2", value: "US" })).toEqual(allCountries.en[239]);
    expect(getCountry({ locale: "en", type: "iso31661-a2", value: "GB" })).toEqual(allCountries.en[234]);
  });

  it("correctly returns a country with specific iso31661 A3 (in english language)", () => {
    expect(getCountry({ locale: "en", type: "iso31661-a3", value: "GRC" })).toEqual(allCountries.en[87]);
    expect(getCountry({ locale: "en", type: "iso31661-a3", value: "USA" })).toEqual(allCountries.en[239]);
    expect(getCountry({ locale: "en", type: "iso31661-a3", value: "GBR" })).toEqual(allCountries.en[234]);
  });

  it("correctly returns a country with top level domain (in english language)", () => {
    expect(getCountry({ locale: "en", type: "tld", value: ".gr" })).toEqual(allCountries.en[87]);
    expect(getCountry({ locale: "en", type: "tld", value: ".us" })).toEqual(allCountries.en[239]);
    expect(getCountry({ locale: "en", type: "tld", value: ".gb" })).toEqual(allCountries.en[234]);
  });
});
