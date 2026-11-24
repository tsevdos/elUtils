import { getCountries } from "./getCountries";

describe("getCountries", () => {
  it("correctly returns data with default values (in greek language)", () => {
    const countries = getCountries();

    expect(countries).toEqual(getCountries({ locale: "el" }));
    expect(countries.length).toBe(249);
    expect(countries).toContainEqual({
      id: "300",
      name: "Ελλάδα",
      completeName: "Ελλάδα",
      officialName: "Η Ελληνική Δημοκρατία",
      sovereignty: "Μέλος του ΟΗΕ",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
  });

  it("correctly returns data (in english language)", () => {
    const countries = getCountries({ locale: "en" });

    expect(countries.length).toBe(249);
    expect(countries).toContainEqual({
      id: "300",
      name: "Greece",
      completeName: "Greece",
      officialName: "The Hellenic Republic",
      sovereignty: "UN member",
      iso31661: { A2: "GR", A3: "GRC" },
      tld: ".gr",
    });
  });
});
