import { regionsWithPrefectures, regionsWithPrefecturesAndMountAthos, Language } from "../../data/geospatial";

type RegionsWithPrefecturesOptions = {
  locale?: Language;
  includeMountAthos?: boolean;
};

export const getRegionsWithPrefectures = ({
  locale = "el",
  includeMountAthos = false,
}: RegionsWithPrefecturesOptions = {}) => {
  return includeMountAthos ? regionsWithPrefecturesAndMountAthos[locale] : regionsWithPrefectures[locale];
};
