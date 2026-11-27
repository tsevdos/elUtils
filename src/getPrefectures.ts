import prefecturesEl from "./data/prefectures-el.json";
import prefecturesEn from "./data/prefectures-en.json";
import { MOUNT_ATHOS_PREFECTURE_ID } from "./constants";
import { type Locale, type Prefecture } from "./types";
import { deepFreeze, immutableSnapshot } from "./helpers/immutable";

export const allPrefectures = immutableSnapshot({
  el: prefecturesEl,
  en: prefecturesEn,
});
export const prefecturesWithoutMountAthos = deepFreeze({
  el: allPrefectures.el.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
  en: allPrefectures.en.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
});

type PrefecturesOptions = { locale?: Locale; includeMountAthos?: boolean };

/**
 * Returns the prefectures in the selected locale, optionally including Mount Athos.
 *
 * The returned data is deeply immutable.
 *
 * @param {PrefecturesOptions} [options={}] - Options for selecting the locale and Mount Athos inclusion.
 * @param {"el" | "en"} [options.locale="el"] - The locale of prefecture names. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos.
 *
 * @returns {readonly Prefecture[]} The deeply immutable prefectures in the specified locale.
 */
export function getPrefectures({
  locale = "el",
  includeMountAthos = false,
}: PrefecturesOptions = {}): readonly Prefecture[] {
  const prefectures = includeMountAthos ? allPrefectures[locale] : prefecturesWithoutMountAthos[locale];

  return prefectures;
}
