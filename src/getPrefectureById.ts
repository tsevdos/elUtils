import { getPrefectures } from "./getPrefectures";
import { type Locale, type Prefecture } from "./types";

type PrefectureByIdOptions = { id: number; locale?: Locale; includeMountAthos?: boolean };

/**
 * Returns the prefecture with the provided ID.
 *
 * @param {PrefectureByIdOptions} options - The options for ID, locale, and whether to include Mount Athos.
 *
 * @returns {Prefecture | undefined} The prefecture with the specified ID, or `undefined` if no such prefecture exists.
 */
export function getPrefectureById(options: PrefectureByIdOptions): Prefecture | undefined {
  const { id, locale = "el", includeMountAthos = false } = options;
  const prefecturesData = getPrefectures({ locale, includeMountAthos });

  return prefecturesData.find((region) => region.id === id);
}
