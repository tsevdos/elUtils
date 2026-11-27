export type Locale = "el" | "en";

export type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;

export type Format = "full" | "short" | "min";

export type BaseDateTimeOptions = {
  locale?: Locale;
  format?: Format;
};

export type DateTimeOptionsWithoutMin = Omit<BaseDateTimeOptions, "format"> & {
  format?: Exclude<Format, "min">;
};

export type PostalCode = {
  id: number;
  regionAndUnit: {
    regionId: number;
    regionIso31662: string;
    unitId: number;
  };
  prefectureId: number;
  postalCodes: string[];
};

// Geo types
export type AdministrativeRegionsOptions = {
  locale?: Locale;
  includeMountAthos?: boolean;
  level?: "region" | "unit" | "municipality";
};

export type AdministrativeUnitsOptions = {
  locale?: Locale;
  includeMountAthos?: boolean;
  level?: "unit" | "municipality";
};

export type Region = DeepReadonly<{
  id: number;
  iso31662: string;
  name: string;
  seat: string;
  units: Unit[] | UnitWithoutMunicipalities[];
}>;

export type RegionWithoutUnits = Omit<Region, "units">;

export type Unit = DeepReadonly<{
  id: number;
  name: string;
  seat: string;
  region: {
    id: number;
    iso31662: string;
  };
  carPlatesPattern: string[];
  municipalities: Municipality[];
}>;

export type UnitWithoutMunicipalities = Omit<Unit, "municipalities">;

export type Municipality = DeepReadonly<{
  id: number;
  name: string;
  seat: string;
  regionAndUnit: {
    regionId: number;
    regionIso31662: string;
    unitId: number | null; // Null is  only in Mount Athos
  };
}>;

export type GeographicRegion = DeepReadonly<{
  id: number;
  name: string;
  seat: string;
  administrativeRegions: {
    id: number;
    iso31662: string;
  }[];
}>;

export type Prefecture = DeepReadonly<{
  id: number;
  name: string;
  seat: string;
  regionAndUnit: {
    regionId: number;
    regionIso31662: string;
    unitId: number | null; // Null is  only in Mount Athos
  };
}>;

export type TaxOffice = DeepReadonly<{
  id: number;
  name: string;
  officialName: string;
  relations: {
    regionId?: number;
    regionIso?: string;
    unitIds?: number[];
    municipalityIds?: number[];
  };
  postalCodes?: number[];
}>;

export type City = DeepReadonly<{
  id: number;
  name: string;
  coordinates: number[];
  relations: {
    regionId: number;
    regionIso31662: string;
    unitId: number;
    municipalityId: number;
    prefectureId: number;
  };
}>;

export type Country = DeepReadonly<{
  id: string;
  name: string;
  completeName: string;
  officialName: string;
  sovereignty: string;
  iso31661: {
    A2: string;
    A3: string;
  };
  tld: string;
}>;
