import { prefectures, prefecturesWithMountAthos, Language } from "../../data/geospatial";

export type GeoOptions = {
  locale?: Language;
  includeMountAthos?: boolean;
};

export const getPrefectures = ({ locale = "el", includeMountAthos = false }: GeoOptions = {}) => {
  return includeMountAthos ? prefecturesWithMountAthos[locale] : prefectures[locale];
};

type SelectPrefectureOptions = {
  id?: number;
  isoCode?: string;
  locale?: Language;
  includeMountAthos?: boolean;
};

export const getPrefectureById = ({
  id = 1,
  locale = "el",
  includeMountAthos = false,
}: SelectPrefectureOptions = {}) => {
  const prefecturesData = includeMountAthos ? prefecturesWithMountAthos[locale] : prefectures[locale];

  return prefecturesData.find((region) => region.id === id);
};

export const getPrefectureByIsoCode = ({
  isoCode = "GR-A1",
  locale = "el",
  includeMountAthos = false,
}: SelectPrefectureOptions = {}) => {
  const prefecturesData = includeMountAthos ? prefecturesWithMountAthos[locale] : prefectures[locale];

  return prefecturesData.find((region) => region.iso31662 === isoCode);
};
