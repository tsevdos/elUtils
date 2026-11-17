import { searchCountryByName } from "./searchCountryByName";

describe("searchCountryByName", () => {
  it("given the search term 'Ελλάδα', returns Greece (in greek language)", () => {
    expect(searchCountryByName({ searchTerm: "Ελλάδα" })).toEqual([
      {
        id: "300",
        name: "Ελλάδα",
        completeName: "Ελλάδα",
        officialName: "Η Ελληνική Δημοκρατία",
        sovereignty: "Μέλος του ΟΗΕ",
        iso31661: { A2: "GR", A3: "GRC" },
        tld: ".gr",
      },
    ]);
    expect(searchCountryByName({ searchTerm: "Ελλάδα" })?.length).toBe(1);
  });

  it("given the search term 'ελλα', returns Greece (in greek language)", () => {
    expect(searchCountryByName({ searchTerm: "ελλα", locale: "el" })).toEqual([
      {
        id: "300",
        name: "Ελλάδα",
        completeName: "Ελλάδα",
        officialName: "Η Ελληνική Δημοκρατία",
        sovereignty: "Μέλος του ΟΗΕ",
        iso31661: { A2: "GR", A3: "GRC" },
        tld: ".gr",
      },
    ]);
    expect(searchCountryByName({ searchTerm: "ελλα", locale: "el" })?.length).toBe(1);
  });

  it("matches English country names regardless of case", () => {
    expect(searchCountryByName({ searchTerm: "gReEcE", locale: "en" })).toEqual([
      {
        id: "300",
        name: "Greece",
        completeName: "Greece",
        officialName: "The Hellenic Republic",
        sovereignty: "UN member",
        iso31661: { A2: "GR", A3: "GRC" },
        tld: ".gr",
      },
    ]);
  });

  it("returns null when no country matches the search term", () => {
    expect(searchCountryByName({ searchTerm: "no matching country" })).toBeNull();
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
