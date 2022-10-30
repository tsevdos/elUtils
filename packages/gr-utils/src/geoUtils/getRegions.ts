import { regions, regionsWithMountAthos, Language } from "../../data/geospatial";

type RegionsOptions = {
  locale?: Language;
  includeMountAthos?: boolean;
};

export const getRegions = ({ locale = "el", includeMountAthos = false }: RegionsOptions = {}) => {
  return includeMountAthos ? regionsWithMountAthos[locale] : regions[locale];
};
