import regionsEl from "../../data/administrative-regions-el.json";
import regionsEn from "../../data/administrative-regions-en.json";

type Region = {
  id: number;
  iso31662: string;
  name: string;
  seat: string;
  units: Unit[] | UnitWithoutMunicipalities[];
};

type RegionWithoutUnits = Omit<Region, "units">;

type Unit = {
  id: number;
  name: string;
  seat: string;
  region: {
    id: number;
    iso31662: string;
  };
  postalCodePattern: string[];
  carPlatesPattern: string[];
  municipalities: Municipality[];
};

type UnitWithoutMunicipalities = Omit<Unit, "municipalities">;

type Municipality = {
  id: number;
  name: string;
  seat: string;
  regionAndUnit: {
    regionId: number;
    regionIso31662: string;
    unitId: number;
  };
};

const MOUNT_ATHOS_REGION_ID = 14;

export const administrativeRegions = {
  el: regionsEl,
  en: regionsEn,
};

export const administrativeRegionsWithoutMountAthos = {
  el: administrativeRegions.el.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
  en: administrativeRegions.en.filter(({ id }) => id !== MOUNT_ATHOS_REGION_ID),
};

type AdministrativeRegionsOptions = {
  locale?: "el" | "en";
  includeMountAthos?: boolean;
  level?: "region" | "unit" | "municipality";
};

export const getAdministrativeRegions = ({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeRegionsOptions = {}): Region[] | RegionWithoutUnits[] => {
  const regionsData = includeMountAthos
    ? administrativeRegions[locale]
    : administrativeRegionsWithoutMountAthos[locale];

  if (level === "region") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return regionsData.flatMap(({ units, ...region }) => region);
  }

  if (level === "unit") {
    return regionsData.flatMap((region) => ({
      ...region,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      units: region.units.map(({ municipalities, ...unit }) => unit),
    }));
  }

  return regionsData;
};

type AdministrativeRegionByIdOptions = { id: number } & AdministrativeRegionsOptions;

export const getAdministrativeRegionById = (
  options: AdministrativeRegionByIdOptions,
): Region | RegionWithoutUnits | undefined => {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.id === id);
};

type AdministrativeRegionByIsoCodeOptions = { isocode: string } & AdministrativeRegionsOptions;

export const getAdministrativeRegionByIsoCode = (
  options: AdministrativeRegionByIsoCodeOptions,
): Region | RegionWithoutUnits | undefined => {
  const { isocode, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const regionsData = getAdministrativeRegions({ locale, includeMountAthos, level });

  return regionsData.find((region) => region.iso31662 === isocode);
};

type AdministrativeUnitsOptions = {
  locale?: "el" | "en";
  includeMountAthos?: boolean;
  level?: "unit" | "municipality";
};

export const getAdministrativeUnits = ({
  locale = "el",
  includeMountAthos = false,
  level = "municipality",
}: AdministrativeUnitsOptions = {}): Unit[] | UnitWithoutMunicipalities[] => {
  const administrativeUnits = (getAdministrativeRegions({ locale, includeMountAthos }) as Region[]).flatMap(
    ({ units }) => [...units],
  ) as Unit[];

  if (level === "unit") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return administrativeUnits.map(({ municipalities, ...unit }) => unit);
  }

  return administrativeUnits;
};

type AdministrativeUnitByIdOptions = { id: number } & AdministrativeUnitsOptions;

export const getAdministrativeUnitById = (
  options: AdministrativeUnitByIdOptions,
): Unit | UnitWithoutMunicipalities | undefined => {
  const { id, locale = "el", includeMountAthos = false, level = "municipality" } = options;
  const unitsData = getAdministrativeUnits({ locale, includeMountAthos, level });

  return unitsData.find((region) => region.id === id);
};

type MunicipalitiesOptions = {
  locale?: "el" | "en";
};

export const getMunicipalities = ({ locale = "el" }: MunicipalitiesOptions = {}): Municipality[] => {
  const municipalities = (getAdministrativeUnits({ locale }) as Unit[]).flatMap(({ municipalities }) => [
    ...municipalities,
  ]);

  return municipalities;
};
