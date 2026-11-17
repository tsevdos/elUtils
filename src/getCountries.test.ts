import { getCountries } from "./getCountries";
import countriesEl from "../data/countries-el.json";
import countriesEn from "../data/countries-en.json";

const allCountries = { el: countriesEl, en: countriesEn } as const;

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
