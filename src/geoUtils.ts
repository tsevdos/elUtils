import administrativeRegionsEl from "../data/administrative-regions-el.json";
import administrativeRegionsEn from "../data/administrative-regions-en.json";
import geographicRegionsEl from "../data/geographic-regions-el.json";
import geographicRegionsEn from "../data/geographic-regions-en.json";
import prefecturesEl from "../data/prefectures-el.json";
import prefecturesEn from "../data/prefectures-en.json";
import postalCodes from "../data/postal-codes.json";
import {
  Region,
  RegionWithoutUnits,
  Unit,
  UnitWithoutMunicipalities,
  Municipality,
  GeographicRegion,
  Prefecture,
} from "./types";

export const MOUNT_ATHOS_REGION_ID = 14;
export const MOUNT_ATHOS_PREFECTURE_ID = 55;

const administrativeRegions = {
  el: administrativeRegionsEl,
  en: administrativeRegionsEn,
} as const;

const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
};

const geographicRegions = {
  el: geographicRegionsEl,
  en: geographicRegionsEn,
} as const;

const allPrefectures = { el: prefecturesEl, en: prefecturesEn } as const;

const prefecturesWithoutMountAthos = {
  el: allPrefectures.el.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
  en: allPrefectures.en.filter(({ id }) => id !== MOUNT_ATHOS_PREFECTURE_ID),
};

type Locale = "el" | "en";

type AdministrativeRegionsOptions = {
  locale?: Locale;
  includeMountAthos?: boolean;
  level?: "region" | "unit" | "municipality";
};

export function getAdministrativeRegions({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeRegionsOptions = {}): Region[] | RegionWithoutUnits[] {
  const regionsData = includeMountAthos
    ? administrativeRegions[locale]
    : administrativeRegionsWithoutMountAthos[locale];

  if (level === "region") {
    return regionsData.flatMap(({ units: _unit, ...region }) => region);
  }

  if (level === "unit") {
    return regionsData.flatMap((region) => ({
      ...region,
      units: region.units.map(({ municipalities: _municipalities, ...unit }) => unit),
    }));
  }

  return regionsData;
}

type AdministrativeRegionByIdOptions = { id: number } & AdministrativeRegionsOptions;

export function getAdministrativeRegionById(
  options: AdministrativeRegionByIdOptions,
): Region | RegionWithoutUnits | undefined {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.id === id);
}

type AdministrativeRegionByIsoCodeOptions = { isocode: string } & AdministrativeRegionsOptions;

export function getAdministrativeRegionByIsoCode(
  options: AdministrativeRegionByIsoCodeOptions,
): Region | RegionWithoutUnits | undefined {
  const { isocode, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.iso31662 === isocode);
}

type AdministrativeUnitsOptions = {
  locale?: Locale;
  includeMountAthos?: boolean;
  level?: "unit" | "municipality";
};

export function getAdministrativeUnits({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeUnitsOptions = {}): Unit[] | UnitWithoutMunicipalities[] {
  const administrativeUnits = (getAdministrativeRegions({ locale, includeMountAthos }) as Region[]).flatMap(
    ({ units }) => [...units],
  ) as Unit[];

  if (level === "unit") {
    return administrativeUnits.map(({ municipalities: _municipalities, ...unit }) => unit);
  }

  return administrativeUnits;
}

type AdministrativeUnitByIdOptions = { id: number } & AdministrativeUnitsOptions;

export function getAdministrativeUnitById(
  options: AdministrativeUnitByIdOptions,
): Unit | UnitWithoutMunicipalities | undefined {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const unitsData = getAdministrativeUnits({ locale, includeMountAthos, level });

  return unitsData.find((unit) => unit.id === id);
}

type MunicipalitiesOptions = { locale?: Locale };

export function getMunicipalities({ locale = "el" }: MunicipalitiesOptions = {}): Municipality[] {
  const municipalities = (getAdministrativeUnits({ locale }) as Unit[]).flatMap(({ municipalities }) => [
    ...municipalities,
  ]);

  return municipalities;
}

type GeographicRegionOptions = { locale?: Locale };

export function getGeographicRegions({ locale = "el" }: GeographicRegionOptions = {}): GeographicRegion[] {
  return geographicRegions[locale];
}

type GeographicRegionByIdOptions = { id: number } & GeographicRegionOptions;

export function getGeographicRegionById(options: GeographicRegionByIdOptions): GeographicRegion | undefined {
  const { id, locale = "el" } = options;

  return geographicRegions[locale].find((region) => region.id === id);
}

type PrefecturesOptions = { locale?: Locale; includeMountAthos?: boolean };

export function getPrefectures({ locale = "el", includeMountAthos = false }: PrefecturesOptions = {}): Prefecture[] {
  const prefectures = includeMountAthos ? allPrefectures[locale] : prefecturesWithoutMountAthos[locale];

  return prefectures;
}

type PrefectureByIdOptions = { id: number } & PrefecturesOptions;

export function getPrefectureById(options: PrefectureByIdOptions): Prefecture | undefined {
  const { id, locale = "el", includeMountAthos = false } = options;
  const prefecturesData = getPrefectures({ locale, includeMountAthos });

  return prefecturesData.find((region) => region.id === id);
}

type FindByPostalCodeOptions = {
  locale: Locale;
  entity: "prefecture" | "region" | "unit";
};

export function findByPostalCode(
  postalCode: string,
  options?: Partial<FindByPostalCodeOptions>,
): Prefecture | Region | Unit | undefined {
  const { locale, entity } = { locale: "el", entity: "prefecture", ...options } as FindByPostalCodeOptions;
  const includeMountAthos = false; // never include Mount Athos. No postal codes there.
  const postalCodeData = postalCodes.find((entry) => entry.postalCodes.includes(postalCode));

  if (!postalCodeData) {
    return undefined;
  }

  if (entity === "prefecture") {
    const id = postalCodeData.prefectureId;
    return getPrefectureById({ id, locale, includeMountAthos });
  }

  if (entity === "region") {
    const id = postalCodeData.regionAndUnit.regionId;
    return getAdministrativeRegionById({ id, locale, level: "region", includeMountAthos }) as Region;
  }

  if (entity === "unit") {
    const id = postalCodeData.regionAndUnit.unitId;
    return getAdministrativeUnitById({ id, locale, level: "unit", includeMountAthos }) as Unit;
  }

  return undefined;
}
