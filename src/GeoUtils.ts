import administrativeRegionsEl from "../data/administrative-regions-el.json";
import administrativeRegionsEn from "../data/administrative-regions-en.json";
import geographicRegionsEl from "../data/geographic-regions-el.json";
import geographicRegionsEn from "../data/geographic-regions-en.json";
import prefecturesEl from "../data/prefectures-el.json";
import prefecturesEn from "../data/prefectures-en.json";
import postalCodesData from "../data/postal-codes.json";
import {
  Region,
  RegionWithoutUnits,
  Unit,
  UnitWithoutMunicipalities,
  Municipality,
  GeographicRegion,
  Prefecture,
} from "./types";

// GeoUtils method Options
type Locale = "el" | "en";
type AdministrativeRegionsOptions = {
  locale?: Locale;
  includeMountAthos?: boolean;
  level?: "region" | "unit" | "municipality";
};
type AdministrativeRegionByIdOptions = { id: number } & AdministrativeRegionsOptions;
type AdministrativeRegionByIsoCodeOptions = { isocode: string } & AdministrativeRegionsOptions;
type AdministrativeUnitsOptions = {
  locale?: Locale;
  includeMountAthos?: boolean;
  level?: "unit" | "municipality";
};
type AdministrativeUnitByIdOptions = { id: number } & AdministrativeUnitsOptions;
type MunicipalitiesOptions = { locale?: Locale };
type GeographicRegionOptions = { locale?: Locale };
type GeographicRegionByIdOptions = { id: number } & GeographicRegionOptions;
type PrefecturesOptions = { locale?: Locale; includeMountAthos?: boolean };
type PrefectureByIdOptions = { id: number } & PrefecturesOptions;
type FindByPostalCodeOptions = {
  locale: Locale;
  entity: "prefecture" | "region" | "unit";
};

class GeoUtilities {
  MOUNT_ATHOS_REGION_ID = 14;
  MOUNT_ATHOS_PREFECTURE_ID = 55;
  private administrativeRegions = {
    el: administrativeRegionsEl,
    en: administrativeRegionsEn,
  } as const;
  private administrativeRegionsWithoutMountAthos = {
    el: this.administrativeRegions.el.filter(({ id }) => id !== this.MOUNT_ATHOS_REGION_ID),
    en: this.administrativeRegions.en.filter(({ id }) => id !== this.MOUNT_ATHOS_REGION_ID),
  };
  private geographicRegions = {
    el: geographicRegionsEl,
    en: geographicRegionsEn,
  } as const;
  private prefectures = { el: prefecturesEl, en: prefecturesEn } as const;
  private prefecturesWithoutMountAthos = {
    el: this.prefectures.el.filter(({ id }) => id !== this.MOUNT_ATHOS_PREFECTURE_ID),
    en: this.prefectures.en.filter(({ id }) => id !== this.MOUNT_ATHOS_PREFECTURE_ID),
  };
  private postalCodes = postalCodesData;

  getAdministrativeRegions({
    locale = "el",
    includeMountAthos = false,
    level = "municipality",
  }: AdministrativeRegionsOptions = {}): Region[] | RegionWithoutUnits[] {
    const regionsData = includeMountAthos
      ? this.administrativeRegions[locale]
      : this.administrativeRegionsWithoutMountAthos[locale];

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

  getAdministrativeRegionById(options: AdministrativeRegionByIdOptions): Region | RegionWithoutUnits | undefined {
    const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
    const regionsData = this.getAdministrativeRegions({ locale, includeMountAthos, level });

    return regionsData.find((region) => region.id === id);
  }

  getAdministrativeRegionByIsoCode(
    options: AdministrativeRegionByIsoCodeOptions,
  ): Region | RegionWithoutUnits | undefined {
    const { isocode, locale = "el", includeMountAthos = false, level = "municipality" } = options;
    const regionsData = this.getAdministrativeRegions({ locale, includeMountAthos, level });

    return regionsData.find((region) => region.iso31662 === isocode);
  }

  getAdministrativeUnits({
    locale = "el",
    includeMountAthos = false,
    level = "municipality",
  }: AdministrativeUnitsOptions = {}): Unit[] | UnitWithoutMunicipalities[] {
    const administrativeUnits = (this.getAdministrativeRegions({ locale, includeMountAthos }) as Region[]).flatMap(
      ({ units }) => [...units],
    ) as Unit[];

    if (level === "unit") {
      return administrativeUnits.map(({ municipalities: _municipalities, ...unit }) => unit);
    }

    return administrativeUnits;
  }

  getAdministrativeUnitById(options: AdministrativeUnitByIdOptions): Unit | UnitWithoutMunicipalities | undefined {
    const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
    const unitsData = this.getAdministrativeUnits({ locale, includeMountAthos, level });

    return unitsData.find((unit) => unit.id === id);
  }

  getMunicipalities({ locale = "el" }: MunicipalitiesOptions = {}): Municipality[] {
    const municipalities = (this.getAdministrativeUnits({ locale }) as Unit[]).flatMap(({ municipalities }) => [
      ...municipalities,
    ]);

    return municipalities;
  }

  getGeographicRegions({ locale = "el" }: GeographicRegionOptions = {}): GeographicRegion[] {
    return this.geographicRegions[locale];
  }

  getGeographicRegionById = (options: GeographicRegionByIdOptions): GeographicRegion | undefined => {
    const { id, locale = "el" } = options;

    return this.geographicRegions[locale].find((region) => region.id === id);
  };

  getPrefectures({ locale = "el", includeMountAthos = false }: PrefecturesOptions = {}): Prefecture[] {
    const prefectures = includeMountAthos ? this.prefectures[locale] : this.prefecturesWithoutMountAthos[locale];

    return prefectures;
  }

  getPrefectureById(options: PrefectureByIdOptions): Prefecture | undefined {
    const { id, locale = "el", includeMountAthos = false } = options;
    const prefecturesData = this.getPrefectures({ locale, includeMountAthos });

    return prefecturesData.find((region) => region.id === id);
  }

  validatePostalCode(postalCode: string): boolean {
    const validPostalCodes = this.postalCodes.flatMap(({ postalCodes }) => [...postalCodes]);

    return validPostalCodes.includes(postalCode);
  }

  findByPostalCode(
    postalCode: string,
    options?: Partial<FindByPostalCodeOptions>,
  ): Prefecture | Region | Unit | undefined {
    const { locale, entity } = { locale: "el", entity: "prefecture", ...options } as FindByPostalCodeOptions;
    const includeMountAthos = false; // never include Mount Athos. No postal codes there.
    const postalCodeData = this.postalCodes.find((entry) => entry.postalCodes.includes(postalCode));

    if (!postalCodeData) {
      return undefined;
    }

    if (entity === "prefecture") {
      const id = postalCodeData.prefectureId;
      return this.getPrefectureById({ id, locale, includeMountAthos });
    }

    if (entity === "region") {
      const id = postalCodeData.regionAndUnit.regionId;
      return this.getAdministrativeRegionById({ id, locale, level: "region", includeMountAthos }) as Region;
    }

    if (entity === "unit") {
      const id = postalCodeData.regionAndUnit.unitId;
      return this.getAdministrativeUnitById({ id, locale, level: "unit", includeMountAthos }) as Unit;
    }

    return undefined;
  }
}

export const GeoUtils = new GeoUtilities();
