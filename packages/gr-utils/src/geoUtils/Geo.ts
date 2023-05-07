import regionsEl from "../../data/administrative-regions-el.json";
import regionsEn from "../../data/administrative-regions-en.json";
import { Region, RegionWithoutUnits, Unit, UnitWithoutMunicipalities, Municipality } from "./types";

type AdministrativeRegionsOptions = {
  locale?: "el" | "en";
  includeMountAthos?: boolean;
  level?: "region" | "unit" | "municipality";
};
type AdministrativeRegionByIdOptions = { id: number } & AdministrativeRegionsOptions;
type AdministrativeRegionByIsoCodeOptions = { isocode: string } & AdministrativeRegionsOptions;
type AdministrativeUnitsOptions = {
  locale?: "el" | "en";
  includeMountAthos?: boolean;
  level?: "unit" | "municipality";
};
type AdministrativeUnitByIdOptions = { id: number } & AdministrativeUnitsOptions;
type MunicipalitiesOptions = { locale?: "el" | "en" };

class GeoUtils {
  MOUNT_ATHOS_REGION_ID = 14;
  private administrativeRegions = {
    el: regionsEl,
    en: regionsEn,
  };
  private administrativeRegionsWithoutMountAthos = {
    el: this.administrativeRegions.el.filter(({ id }) => id !== this.MOUNT_ATHOS_REGION_ID),
    en: this.administrativeRegions.en.filter(({ id }) => id !== this.MOUNT_ATHOS_REGION_ID),
  };

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

    return unitsData.find((region) => region.id === id);
  }

  getMunicipalities({ locale = "el" }: MunicipalitiesOptions = {}): Municipality[] {
    const municipalities = (this.getAdministrativeUnits({ locale }) as Unit[]).flatMap(({ municipalities }) => [
      ...municipalities,
    ]);

    return municipalities;
  }
}

export const Geo = new GeoUtils();
