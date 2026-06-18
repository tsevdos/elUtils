import prefecturesEl from "./data/prefectures-el.json";
import prefecturesEn from "./data/prefectures-en.json";
import { MOUNT_ATHOS_PREFECTURE_ID } from "./constants";
import { type Locale, type Prefecture } from "./types";

export const allPrefectures = { el: prefecturesEl, en: prefecturesEn } as const;
export const prefecturesWithoutMountAthos = {
  el: allPrefectures.el.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
  en: allPrefectures.en.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
};

type PrefecturesOptions = { locale?: Locale; includeMountAthos?: boolean };

/**
 * Returns the prefectures based on the provided options.
 *
 * @param {PrefecturesOptions} options - The options for locale and whether to include Mount Athos.
 *
 * @returns {Prefecture[]} The prefectures in the specified locale.
 */
export function getPrefectures({ locale = "el", includeMountAthos = false }: PrefecturesOptions = {}): Prefecture[] {
  const prefectures = includeMountAthos ? allPrefectures[locale] : prefecturesWithoutMountAthos[locale];

  return prefectures;
}
