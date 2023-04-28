/* eslint-disable @typescript-eslint/no-unused-vars */
import regionsEl from "../../data/administrative-regions-el.json";
import regionsEn from "../../data/administrative-regions-en.json";
import {
  Region,
  RegionWithoutUnits,
  //   Unit,
  //   UnitWithoutMunicipalities,
  //   Municipality,
  AdministrativeRegionsOptions,
} from "./types";

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
      return regionsData.flatMap(({ units, ...region }) => region);
    }

    if (level === "unit") {
      return regionsData.flatMap((region) => ({
        ...region,
        units: region.units.map(({ municipalities, ...unit }) => unit),
      }));
    }

    return regionsData;
  }
}

export const Geo = new GeoUtils();
