import { getPrefectures } from "./getPrefectures";
import { type Locale, type Prefecture } from "./types";

type PrefectureByIdOptions = { id: number; locale?: Locale; includeMountAthos?: boolean };

/**
 * Returns a prefecture by ID.
 *
 * @param {PrefectureByIdOptions} options - The ID and optional prefecture lookup settings.
 * @param {number} options.id - The prefecture ID.
 * @param {"el" | "en"} [options.locale="el"] - The locale of the prefecture name. Defaults to Greek.
 * @param {boolean} [options.includeMountAthos=false] - Whether to include Mount Athos in the lookup.
 *
 * @returns {Prefecture | undefined} The matching prefecture, or `undefined` if no prefecture has that ID.
 */
export function getPrefectureById(options: PrefectureByIdOptions): Prefecture | undefined {
  const { id, locale = "el", includeMountAthos = false } = options;
  const prefecturesData = getPrefectures({ locale, includeMountAthos });

  return prefecturesData.find((region) => region.id === id);
}
