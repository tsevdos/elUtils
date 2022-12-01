import regionsEl from "../../data/geographic-regions-el.json";
import regionsEn from "../../data/geographic-regions-en.json";

type GeographicRegion = {
  id: number;
  name: string;
  seat: string;
  administrativeRegions: {
    id: number;
    iso31662: string;
  }[];
};

export const geographicRegions = {
  el: regionsEl,
  en: regionsEn,
};

type GeographicRegionOptions = { locale?: "el" | "en" };

export const getGeographicRegions = ({ locale = "el" }: GeographicRegionOptions = {}): GeographicRegion[] => {
  return geographicRegions[locale];
};

type GeographicRegionByIdOptions = { id: number } & GeographicRegionOptions;

export const getGeographicRegionById = (options: GeographicRegionByIdOptions): GeographicRegion | undefined => {
  const { id, locale = "el" } = options;

  return geographicRegions[locale].find((region) => region.id === id);
};
