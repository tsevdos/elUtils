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
    unitId: number;
  };
};
