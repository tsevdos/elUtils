import { regions, regionsWithMountAthos } from "../data/regions";

interface RegionsOptions {
  locale?: "el" | "en";
  includeMountAthos?: boolean;
}

export const getRegions = (options: RegionsOptions = {}) => {
  const { locale, includeMountAthos } = { locale: "el", includeMountAthos: false, ...options };

  return includeMountAthos ? regionsWithMountAthos[locale] : regions[locale];
};
