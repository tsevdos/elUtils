import regionsEl from "../../data/administrative-regions-el.json";
import regionsEn from "../../data/administrative-regions-en.json";

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
}: AdministrativeRegionsOptions = {}) => {
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
