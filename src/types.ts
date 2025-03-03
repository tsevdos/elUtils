export type Region = {
  id: number;
  iso31662: string;
  name: string;
  seat: string;
  units: Unit[] | UnitWithoutMunicipalities[];
};

export type RegionWithoutUnits = Omit<Region, "units">;

export type Unit = {
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

export type UnitWithoutMunicipalities = Omit<Unit, "municipalities">;

export type Municipality = {
  id: number;
  name: string;
  seat: string;
  regionAndUnit: {
    regionId: number;
    regionIso31662: string;
    unitId: number | null; // Null is  only in Mount Athos
  };
};

export type GeographicRegion = {
  id: number;
  name: string;
  seat: string;
  administrativeRegions: {
    id: number;
    iso31662: string;
  }[];
};

export type Prefecture = {
  id: number;
  name: string;
  seat: string;
  regionAndUnit: {
    regionId: number;
    regionIso31662: string;
    unitId: number | null; // Null is  only in Mount Athos
  };
};

export type TaxOffice = {
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
};

export type City = {
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
};

export type Country = {
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
};
