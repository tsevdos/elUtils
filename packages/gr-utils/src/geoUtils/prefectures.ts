import prefecturesEl from "../../data/prefectures-el.json";
import prefecturesEn from "../../data/prefectures-en.json";

type Prefecture = {
  id: number;
  name: string;
  seat: string;
  regionAndUnit: {
    regionId: number;
    regionIso31662: string;
    unitId: number;
  };
};

type PrefecturesOptions = {
  locale?: "el" | "en";
  includeMountAthos?: boolean;
};

const MOUNT_ATHOS_ID = 55;

export const prefectures = {
  el: prefecturesEl as Prefecture[],
  en: prefecturesEn as Prefecture[],
} as const;

export const prefecturesWithoutMountAthos = {
  el: prefectures.el.filter(({ id }) => id !== MOUNT_ATHOS_ID),
  en: prefectures.en.filter(({ id }) => id !== MOUNT_ATHOS_ID),
} as const;

export const getPrefectures = ({ locale = "el", includeMountAthos = false }: PrefecturesOptions = {}): Prefecture[] => {
  const prefecturesData = includeMountAthos ? prefectures[locale] : prefecturesWithoutMountAthos[locale];

  return prefecturesData;
};

type PrefectureByIdOptions = { id: number } & PrefecturesOptions;

export const getPrefectureById = (options: PrefectureByIdOptions): Prefecture | undefined => {
  const { id, locale = "el", includeMountAthos = false } = options;
  const regionsData = getPrefectures({ locale, includeMountAthos });

  return regionsData.find((region) => region.id === id);
};
