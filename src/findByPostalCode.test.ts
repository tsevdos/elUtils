import { findByPostalCode } from "./findByPostalCode";

describe("findByPostalCode", () => {
  it("correctly returns undefined in case of invalid postal code", () => {
    expect(findByPostalCode("12345")).toBe(undefined);
    expect(findByPostalCode("11111", { locale: "en" })).toBe(undefined);
    expect(findByPostalCode("22222", { locale: "en", entity: "prefecture" })).toBe(undefined);
    expect(findByPostalCode("99999", { locale: "el" })).toBe(undefined);
    expect(findByPostalCode("98765")).toBe(undefined);
    expect(findByPostalCode("56789", { locale: "el", entity: "prefecture" })).toBe(undefined);
  });

  it("correctly returns prefecture (en and el languages)", () => {
    expect(findByPostalCode("17562")).toEqual({
      id: 1,
      name: "Νομός Αθηνών",
      seat: "Αθήνα",
      regionAndUnit: { regionId: 9, regionIso31662: "GR-I", unitId: 42 },
    });
    expect(findByPostalCode("30005", { locale: "en" })).toEqual({
      id: 49,
      name: "Aetolia-Acarnania",
      seat: "Messolonghi",
      regionAndUnit: { regionId: 7, regionIso31662: "GR-G", unitId: 32 },
    });
    expect(findByPostalCode("17122", { locale: "en", entity: "prefecture" })).toEqual({
      id: 1,
      name: "Athens Prefecture",
      seat: "Athens",
      regionAndUnit: { regionId: 9, regionIso31662: "GR-I", unitId: 42 },
    });
    expect(findByPostalCode("25008", { locale: "el" })).toEqual({
      id: 48,
      name: "Νομός Αχαΐας",
      seat: "Πάτρα",
      regionAndUnit: {
        regionId: 7,
        regionIso31662: "GR-G",
        unitId: 33,
      },
    });
    expect(findByPostalCode("68014", { locale: "el", entity: "prefecture" })).toEqual({
      id: 22,
      name: "Νομός Έβρου",
      seat: "Αλεξανδρούπολη",
      regionAndUnit: {
        regionId: 1,
        regionIso31662: "GR-A",
        unitId: 2,
      },
    });
    expect(findByPostalCode("27066")).toEqual({
      id: 50,
      name: "Νομός Ηλείας",
      seat: "Πύργος",
      regionAndUnit: {
        regionId: 7,
        regionIso31662: "GR-G",
        unitId: 34,
      },
    });
    expect(findByPostalCode("54250", { locale: "en" })).toEqual({
      id: 16,
      name: "Thessaloniki",
      seat: "Thessaloniki",
      regionAndUnit: {
        regionId: 2,
        regionIso31662: "GR-B",
        unitId: 8,
      },
    });
  });

  it("correctly returns region (en and el languages)", () => {
    expect(findByPostalCode("17562", { entity: "region" })).toEqual({
      id: 9,
      iso31662: "GR-I",
      name: "Αττικής",
      seat: "Αθήνα",
    });
    expect(findByPostalCode("30005", { locale: "en", entity: "region" })).toEqual({
      id: 7,
      iso31662: "GR-G",
      name: "Western Greece",
      seat: "Patras",
    });
    expect(findByPostalCode("17122", { locale: "en", entity: "region" })).toEqual({
      id: 9,
      iso31662: "GR-I",
      name: "Attica",
      seat: "Athens",
    });
    expect(findByPostalCode("25008", { locale: "el", entity: "region" })).toEqual({
      id: 7,
      iso31662: "GR-G",
      name: "Δυτικής Ελλάδας",
      seat: "Πάτρα",
    });
    expect(findByPostalCode("68014", { locale: "el", entity: "region" })).toEqual({
      id: 1,
      iso31662: "GR-A",
      name: "Ανατολικής Μακεδονίας και Θράκης",
      seat: "Κομοτηνή",
    });
    expect(findByPostalCode("27066", { entity: "region" })).toEqual({
      id: 7,
      iso31662: "GR-G",
      name: "Δυτικής Ελλάδας",
      seat: "Πάτρα",
    });
    expect(findByPostalCode("54250", { locale: "en", entity: "region" })).toEqual({
      id: 2,
      iso31662: "GR-B",
      name: "Central Macedonia",
      seat: "Thessaloniki",
    });
  });

  it("correctly returns unit (en and el languages)", () => {
    expect(findByPostalCode("17562", { entity: "unit" })).toEqual({
      id: 42,
      name: "Κεντρικού Τομέα Αθηνών",
      seat: "Αθήνα",
      region: {
        id: 9,
        iso31662: "GR-I",
      },
      carPlatesPattern: [],
    });
    expect(findByPostalCode("30005", { locale: "en", entity: "unit" })).toEqual({
      id: 32,
      name: "Aetolia - Acarnania",
      seat: "Messolonghi",
      region: {
        id: 7,
        iso31662: "GR-G",
      },
      carPlatesPattern: ["AI*", "ME*"],
    });
    expect(findByPostalCode("17122", { locale: "en", entity: "unit" })).toEqual({
      id: 42,
      name: "Central Athens",
      seat: "Athens",
      region: {
        id: 9,
        iso31662: "GR-I",
      },
      carPlatesPattern: [],
    });
    expect(findByPostalCode("25008", { locale: "el", entity: "unit" })).toEqual({
      id: 33,
      name: "Αχαΐας",
      seat: "Πάτρα",
      region: {
        id: 7,
        iso31662: "GR-G",
      },
      carPlatesPattern: ["AX*", "AZ*"],
    });
    expect(findByPostalCode("68014", { locale: "el", entity: "unit" })).toEqual({
      id: 2,
      name: "Έβρου",
      seat: "Αλεξανδρούπολη",
      region: {
        id: 1,
        iso31662: "GR-A",
      },
      carPlatesPattern: ["EB*", "MX*", "OP*"],
    });
    expect(findByPostalCode("27066", { entity: "unit" })).toEqual({
      id: 34,
      name: "Ηλείας",
      seat: "Πύργος",
      region: {
        id: 7,
        iso31662: "GR-G",
      },
      carPlatesPattern: [],
    });
    expect(findByPostalCode("54250", { locale: "en", entity: "unit" })).toEqual({
      id: 8,
      name: "Thessaloniki",
      seat: "Thessaloniki",
      region: {
        id: 2,
        iso31662: "GR-B",
      },
      carPlatesPattern: ["N*"],
    });
  });

  it("returns undefined for edge case inputs", () => {
    expect(findByPostalCode("")).toBe(undefined);
    expect(findByPostalCode(" 17562")).toBe(undefined);
    expect(findByPostalCode("17562 ")).toBe(undefined);
    expect(findByPostalCode("1234")).toBe(undefined);
    expect(findByPostalCode("123456")).toBe(undefined);
    expect(findByPostalCode("ABCDE")).toBe(undefined);
    expect(findByPostalCode("175A2")).toBe(undefined);
  });

  it("defaults to 'el' locale and 'prefecture' entity when options are not provided", () => {
    const withDefaults = findByPostalCode("17562");
    const explicit = findByPostalCode("17562", { locale: "el", entity: "prefecture" });
    expect(withDefaults).toEqual(explicit);
  });

  it("returns the same IDs across different locales for the same postal code", () => {
    const elResult = findByPostalCode("17562", { locale: "el", entity: "prefecture" }) as Region;
    const enResult = findByPostalCode("17562", { locale: "en", entity: "prefecture" }) as Region;
    expect(elResult?.id).toBe(enResult?.id);
    expect(elResult?.regionAndUnit).toEqual(enResult?.regionAndUnit);
  });
});
