import { getAdministrativeUnits } from "./getAdministrativeUnits";
import { type Locale, type Unit, type Municipality } from "./types";
import { deepFreeze } from "./helpers/immutable";

type MunicipalitiesOptions = { locale?: Locale };

/**
 * Returns the municipalities in the provided locale.
 *
 * @param {MunicipalitiesOptions} [options={}] - Options for selecting the locale.
 * @param {"el" | "en"} [options.locale="el"] - The locale of municipality names. Defaults to Greek.
 *
 * @returns {readonly Municipality[]} The deeply immutable municipalities in the specified locale.
 */
export function getMunicipalities({ locale = "el" }: MunicipalitiesOptions = {}): readonly Municipality[] {
  const municipalities = (
    getAdministrativeUnits({
      locale,
    }) as readonly Unit[]
  ).flatMap(({ municipalities }) => [...municipalities]);

  return deepFreeze(municipalities);
}
