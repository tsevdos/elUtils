import countriesEl from "../../data/countries-el.json";
import countriesEn from "../../data/countries-en.json";
import { searchCountryByName, getCountry } from "../geoUtils";

const allCountries = { el: countriesEl, en: countriesEn } as const;

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
