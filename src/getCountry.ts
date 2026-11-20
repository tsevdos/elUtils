import { getCountries } from "./getCountries";
import type { Country, Locale } from "./types";

type GetCountryOptions = {
  locale?: Locale;
  type: "id" | "iso31661-a2" | "iso31661-a3" | "tld";
  value: string;
};

export function getCountry({ locale = "el", type = "id", value = "" }: GetCountryOptions): Country | null {
  const countries = getCountries({ locale });

  switch (type) {
    case "id":
      return countries.find((country) => country.id === value) ?? null;
    case "iso31661-a2":
      return countries.find((country) => country.iso31661.A2 === value) ?? null;
    case "iso31661-a3":
      return countries.find((country) => country.iso31661.A3 === value) ?? null;
    case "tld":
      return countries.find((country) => country.tld === value) ?? null;
    default:
      return null;
  }
}
