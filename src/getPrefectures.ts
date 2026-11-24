import prefecturesEl from "./data/prefectures-el.json";
import prefecturesEn from "./data/prefectures-en.json";
import { MOUNT_ATHOS_PREFECTURE_ID } from "./constants";
import { type Locale, type Prefecture } from "./types";

// TODO: don't export this
export const allPrefectures = { el: prefecturesEl, en: prefecturesEn } as const;
export const prefecturesWithoutMountAthos = {
  el: allPrefectures.el.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
  en: allPrefectures.en.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
};

type PrefecturesOptions = { locale?: Locale; includeMountAthos?: boolean };

/**
 * Returns the prefectures in the selected locale, optionally including Mount Athos.
 *
 * **Note**: The returned array and its objects are shared data and should be treated as read-only.
 * Mutating them may affect future calls and other consumers of this library.
 *
 * @param {PrefecturesOptions} [options={}] - Options for selecting the locale and Mount Athos inclusion.
 * @param {"el" | "en"} [options.locale="el"] - The locale of prefecture names. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos.
 *
 * @returns {Prefecture[]} The prefectures in the specified locale.
 */
export function getPrefectures({ locale = "el", includeMountAthos = false }: PrefecturesOptions = {}): Prefecture[] {
  const prefectures = includeMountAthos ? allPrefectures[locale] : prefecturesWithoutMountAthos[locale];

  return prefectures;
}
