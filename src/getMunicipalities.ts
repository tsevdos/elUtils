import { getAdministrativeUnits } from "./getAdministrativeUnits";
import { type Locale, type Unit, type Municipality } from "./types";

type MunicipalitiesOptions = { locale?: Locale };

/**
 * Returns the municipalities in the provided locale.
 *
 * @param {MunicipalitiesOptions} options - The options for locale.
 *
 * @returns {Municipality[]} The municipalities in the specified locale.
 */
export function getMunicipalities({ locale = "el" }: MunicipalitiesOptions = {}): Municipality[] {
  const municipalities = (getAdministrativeUnits({ locale }) as Unit[]).flatMap(({ municipalities }) => [
    ...municipalities,
  ]);

  return municipalities;
}
