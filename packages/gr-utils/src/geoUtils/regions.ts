import {
  regionsWithPrefectures,
  regionsWithPrefecturesAndMountAthos,
  regions,
  regionsWithMountAthos,
  Language,
} from "../../data/geospatial";

type RegionsOptions = {
  locale?: Language;
  includeMountAthos?: boolean;
};

export const getRegionsWithPrefectures = ({ locale = "el", includeMountAthos = false }: RegionsOptions = {}) => {
  return includeMountAthos ? regionsWithPrefecturesAndMountAthos[locale] : regionsWithPrefectures[locale];
};

export const getRegions = ({ locale = "el", includeMountAthos = false }: RegionsOptions = {}) => {
  return includeMountAthos ? regionsWithMountAthos[locale] : regions[locale];
};

type SelectRegionOptions = {
  id?: number;
  isoCode?: string;
  locale?: Language;
  includeMountAthos?: boolean;
};

export const getRegionWithPrefecturesById = ({
  id = 1,
  locale = "el",
  includeMountAthos = false,
}: SelectRegionOptions = {}) => {
  const regionsData = includeMountAthos ? regionsWithPrefecturesAndMountAthos[locale] : regionsWithPrefectures[locale];

  return regionsData.find((region) => region.id === id);
};

export const getRegionWithPrefecturesByIsoCode = ({
  isoCode = "GR-I",
  locale = "el",
  includeMountAthos = false,
}: SelectRegionOptions = {}) => {
  const regionsData = includeMountAthos ? regionsWithPrefecturesAndMountAthos[locale] : regionsWithPrefectures[locale];

  return regionsData.find((region) => region.iso31662 === isoCode);
};

export const getRegionById = ({ id = 1, locale = "el", includeMountAthos = false }: SelectRegionOptions = {}) => {
  const regionsData = includeMountAthos ? regionsWithMountAthos[locale] : regions[locale];

  return regionsData.find((region) => region.id === id);
};

export const getRegionByIsoCode = ({
  isoCode = "GR-I",
  locale = "el",
  includeMountAthos = false,
}: SelectRegionOptions = {}) => {
  const regionsData = includeMountAthos ? regionsWithMountAthos[locale] : regions[locale];

  return regionsData.find((region) => region.iso31662 === isoCode);
};
