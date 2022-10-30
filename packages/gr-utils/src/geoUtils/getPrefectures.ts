import { prefectures, prefecturesWithMountAthos, Language } from "../../data/geospatial";

export type GeoOptions = {
  locale?: Language;
  includeMountAthos?: boolean;
};

export const getPrefectures = ({ locale = "el", includeMountAthos = false }: GeoOptions = {}) => {
  return includeMountAthos ? prefecturesWithMountAthos[locale] : prefectures[locale];
};
