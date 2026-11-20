import { getCountry } from "./getCountry";

describe("getCountry", () => {
  it("correctly returns a country with specific id (in greek language)", () => {
    expect(getCountry({ locale: "el", type: "id", value: "300" })).toEqual({
      id: "300",
      name: "Ελλάδα",
      completeName: "Ελλάδα",
      officialName: "Η Ελληνική Δημοκρατία",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
    expect(getCountry({ locale: "el", type: "id", value: "840" })).toEqual({
      id: "840",
      name: "Ηνωμένες Πολιτείες της Αμερικής",
      completeName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
      officialName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "US", A3: "USA" },
      tld: ".us",
    });
    expect(getCountry({ locale: "el", type: "id", value: "826" })).toEqual({
      id: "826",
      name: "Ηνωμένο Βασίλειο",
      completeName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
      officialName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GB", A3: "GBR" },
      tld: ".gb",
    });
  });

  it("correctly returns a country with specific iso31661 A2 (in greek language)", () => {
    expect(getCountry({ locale: "el", type: "iso31661-a2", value: "GR" })).toEqual({
      id: "300",
      name: "Ελλάδα",
      completeName: "Ελλάδα",
      officialName: "Η Ελληνική Δημοκρατία",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
    expect(getCountry({ locale: "el", type: "iso31661-a2", value: "US" })).toEqual({
      id: "840",
      name: "Ηνωμένες Πολιτείες της Αμερικής",
      completeName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
      officialName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "US", A3: "USA" },
      tld: ".us",
    });
    expect(getCountry({ locale: "el", type: "iso31661-a2", value: "GB" })).toEqual({
      id: "826",
      name: "Ηνωμένο Βασίλειο",
      completeName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
      officialName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GB", A3: "GBR" },
      tld: ".gb",
    });
  });

  it("correctly returns a country with specific iso31661 A3 (in greek language)", () => {
    expect(getCountry({ locale: "el", type: "iso31661-a3", value: "GRC" })).toEqual({
      id: "300",
      name: "Ελλάδα",
      completeName: "Ελλάδα",
      officialName: "Η Ελληνική Δημοκρατία",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
    expect(getCountry({ locale: "el", type: "iso31661-a3", value: "USA" })).toEqual({
      id: "840",
      name: "Ηνωμένες Πολιτείες της Αμερικής",
      completeName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
      officialName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "US", A3: "USA" },
      tld: ".us",
    });
    expect(getCountry({ locale: "el", type: "iso31661-a3", value: "GBR" })).toEqual({
      id: "826",
      name: "Ηνωμένο Βασίλειο",
      completeName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
      officialName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GB", A3: "GBR" },
      tld: ".gb",
    });
  });

  it("correctly returns a country with top level domain (in greek language)", () => {
    expect(getCountry({ locale: "el", type: "tld", value: ".gr" })).toEqual({
      id: "300",
      name: "Ελλάδα",
      completeName: "Ελλάδα",
      officialName: "Η Ελληνική Δημοκρατία",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
    expect(getCountry({ locale: "el", type: "tld", value: ".us" })).toEqual({
      id: "840",
      name: "Ηνωμένες Πολιτείες της Αμερικής",
      completeName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
      officialName: "Οι Ηνωμένες Πολιτείες της Αμερικής",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "US", A3: "USA" },
      tld: ".us",
    });
    expect(getCountry({ locale: "el", type: "tld", value: ".gb" })).toEqual({
      id: "826",
      name: "Ηνωμένο Βασίλειο",
      completeName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
      officialName: "Το Ηνωμένο Βασίλειο της Μεγάλης Βρετανίας και Βόρειας Ιρλανδίας",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GB", A3: "GBR" },
      tld: ".gb",
    });
  });

  it("correctly returns a country with specific id (in english language)", () => {
    expect(getCountry({ locale: "en", type: "id", value: "300" })).toEqual({
      id: "300",
      name: "Greece",
      completeName: "Greece",
      officialName: "The Hellenic Republic",
      sovereignty: "UN member",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
    expect(getCountry({ locale: "en", type: "id", value: "840" })).toEqual({
      id: "840",
      name: "United States of America",
      completeName: "The United States of America",
      officialName: "The United States of America",
      sovereignty: "UN member",
      iso31661: { A2: "US", A3: "USA" },
      tld: ".us",
    });
    expect(getCountry({ locale: "en", type: "id", value: "826" })).toEqual({
      id: "826",
      name: "United Kingdom of Great Britain and Northern Ireland",
      completeName: "The United Kingdom of Great Britain and Northern Ireland",
      officialName: "The United Kingdom of Great Britain and Northern Ireland",
      sovereignty: "UN member",
      iso31661: { A2: "GB", A3: "GBR" },
      tld: ".gb",
    });
  });

  it("correctly returns a country with specific iso31661 A2 (in english language)", () => {
    expect(getCountry({ locale: "en", type: "iso31661-a2", value: "GR" })).toEqual({
      id: "300",
      name: "Greece",
      completeName: "Greece",
      officialName: "The Hellenic Republic",
      sovereignty: "UN member",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
    expect(getCountry({ locale: "en", type: "iso31661-a2", value: "US" })).toEqual({
      id: "840",
      name: "United States of America",
      completeName: "The United States of America",
      officialName: "The United States of America",
      sovereignty: "UN member",
      iso31661: { A2: "US", A3: "USA" },
      tld: ".us",
    });
    expect(getCountry({ locale: "en", type: "iso31661-a2", value: "GB" })).toEqual({
      id: "826",
      name: "United Kingdom of Great Britain and Northern Ireland",
      completeName: "The United Kingdom of Great Britain and Northern Ireland",
      officialName: "The United Kingdom of Great Britain and Northern Ireland",
      sovereignty: "UN member",
      iso31661: { A2: "GB", A3: "GBR" },
      tld: ".gb",
    });
  });

  it("correctly returns a country with specific iso31661 A3 (in english language)", () => {
    expect(getCountry({ locale: "en", type: "iso31661-a3", value: "GRC" })).toEqual({
      id: "300",
      name: "Greece",
      completeName: "Greece",
      officialName: "The Hellenic Republic",
      sovereignty: "UN member",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
    expect(getCountry({ locale: "en", type: "iso31661-a3", value: "USA" })).toEqual({
      id: "840",
      name: "United States of America",
      completeName: "The United States of America",
      officialName: "The United States of America",
      sovereignty: "UN member",
      iso31661: { A2: "US", A3: "USA" },
      tld: ".us",
    });
    expect(getCountry({ locale: "en", type: "iso31661-a3", value: "GBR" })).toEqual({
      id: "826",
      name: "United Kingdom of Great Britain and Northern Ireland",
      completeName: "The United Kingdom of Great Britain and Northern Ireland",
      officialName: "The United Kingdom of Great Britain and Northern Ireland",
      sovereignty: "UN member",
      iso31661: { A2: "GB", A3: "GBR" },
      tld: ".gb",
    });
  });

  it("correctly returns a country with top level domain (in english language)", () => {
    expect(getCountry({ locale: "en", type: "tld", value: ".gr" })).toEqual({
      id: "300",
      name: "Greece",
      completeName: "Greece",
      officialName: "The Hellenic Republic",
      sovereignty: "UN member",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
    expect(getCountry({ locale: "en", type: "tld", value: ".us" })).toEqual({
      id: "840",
      name: "United States of America",
      completeName: "The United States of America",
      officialName: "The United States of America",
      sovereignty: "UN member",
      iso31661: { A2: "US", A3: "USA" },
      tld: ".us",
    });
    expect(getCountry({ locale: "en", type: "tld", value: ".gb" })).toEqual({
      id: "826",
      name: "United Kingdom of Great Britain and Northern Ireland",
      completeName: "The United Kingdom of Great Britain and Northern Ireland",
      officialName: "The United Kingdom of Great Britain and Northern Ireland",
      sovereignty: "UN member",
      iso31661: { A2: "GB", A3: "GBR" },
      tld: ".gb",
    });
  });

  it("uses Greek as the default locale", () => {
    expect(getCountry({ type: "id", value: "300" })).toEqual({
      id: "300",
      name: "Ελλάδα",
      completeName: "Ελλάδα",
      officialName: "Η Ελληνική Δημοκρατία",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
  });

  it("returns null when no country matches the lookup value", () => {
    expect(getCountry({ type: "id", value: "999" })).toBeNull();
    expect(getCountry({ type: "iso31661-a2", value: "ZZ" })).toBeNull();
    expect(getCountry({ type: "iso31661-a3", value: "ZZZ" })).toBeNull();
    expect(getCountry({ type: "tld", value: ".invalid" })).toBeNull();
  });
});
