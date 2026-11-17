import countriesEl from "../../data/countries-el.json";
import countriesEn from "../../data/countries-en.json";
import { getCountry } from "../geoUtils";

const allCountries = { el: countriesEl, en: countriesEn } as const;

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
