import { getMunicipalities } from "./getMunicipalities";
import { getAdministrativeUnits } from "./getAdministrativeUnits";
import { MOUNT_ATHOS_REGION_ID } from "./getAdministrativeRegions";
import { type Unit } from "./types";

describe("getMunicipalities", () => {
  describe("default behavior", () => {
    it("correctly returns data with default values (in greek language)", () => {
      const expectedData = (getAdministrativeUnits() as Unit[]).flatMap(({ municipalities }) => [...municipalities]);

      expect(getMunicipalities()).toStrictEqual(expectedData);
      // all default options
      expect(getMunicipalities({ locale: "el" })).toStrictEqual(expectedData);
      expect(getMunicipalities().length).toBe(332);
    });

    it("handles empty options object explicitly", () => {
      const expectedData = (getAdministrativeUnits() as Unit[]).flatMap(({ municipalities }) => [...municipalities]);

      expect(getMunicipalities({})).toStrictEqual(expectedData);
    });
  });

  describe("locale handling", () => {
    it("correctly returns data (in english language)", () => {
      const expectedData = (getAdministrativeUnits({ locale: "en" }) as Unit[]).flatMap(({ municipalities }) => [
        ...municipalities,
      ]);

      expect(getMunicipalities({ locale: "en" })).toStrictEqual(expectedData);
      expect(getMunicipalities({ locale: "en" }).length).toBe(332);
    });

    it("returns same number of municipalities for both locales", () => {
      const greekMunicipalities = getMunicipalities({ locale: "el" });
      const englishMunicipalities = getMunicipalities({ locale: "en" });

      expect(greekMunicipalities.length).toBe(englishMunicipalities.length);
      expect(greekMunicipalities.length).toBe(332);
    });

    it("returns municipalities with translated names in different locales", () => {
      const greekMunicipalities = getMunicipalities({ locale: "el" });
      const englishMunicipalities = getMunicipalities({ locale: "en" });

      // Same IDs but different names
      expect(greekMunicipalities[0]?.id).toBe(englishMunicipalities[0]?.id);
      // Most municipalities should have different names (some might be the same)
      const differentNames = greekMunicipalities.filter((gm, index) => gm.name !== englishMunicipalities[index]?.name);
      expect(differentNames.length).toBeGreaterThan(0);
    });
  });

  describe("data structure validation", () => {
    it("returns municipalities with all required properties", () => {
      const municipalities = getMunicipalities();

      municipalities.forEach((municipality) => {
        expect(municipality).toHaveProperty("id");
        expect(municipality).toHaveProperty("name");
        expect(municipality).toHaveProperty("seat");
        expect(municipality).toHaveProperty("regionAndUnit");
        expect(typeof municipality.id).toBe("number");
        expect(typeof municipality.name).toBe("string");
        expect(typeof municipality.seat).toBe("string");
      });
    });

    it("ensures all municipalities have valid regionAndUnit references", () => {
      const municipalities = getMunicipalities();

      municipalities.forEach((municipality) => {
        expect(municipality.regionAndUnit).toHaveProperty("regionId");
        expect(municipality.regionAndUnit).toHaveProperty("regionIso31662");
        expect(municipality.regionAndUnit).toHaveProperty("unitId");
        expect(typeof municipality.regionAndUnit.regionId).toBe("number");
        expect(typeof municipality.regionAndUnit.regionIso31662).toBe("string");
        expect(municipality.regionAndUnit.regionIso31662).toMatch(/^GR-[A-Z0-9]+$/);
      });
    });

    it("ensures regionAndUnit.unitId is a number (except Mount Athos municipalities)", () => {
      const municipalities = getMunicipalities();
      const nonMountAthosMunicipalities = municipalities.filter(
        (m) => m.regionAndUnit.regionId !== MOUNT_ATHOS_REGION_ID,
      );

      nonMountAthosMunicipalities.forEach((municipality) => {
        expect(typeof municipality.regionAndUnit.unitId).toBe("number");
      });
    });

    it("ensures all properties are non-empty strings", () => {
      const municipalities = getMunicipalities();

      municipalities.forEach((municipality) => {
        expect(municipality.name.length).toBeGreaterThan(0);
        expect(municipality.seat.length).toBeGreaterThan(0);
        expect(municipality.regionAndUnit.regionIso31662.length).toBeGreaterThan(0);
      });
    });
  });

  describe("data integrity", () => {
    it("ensures all municipality IDs are unique", () => {
      const municipalities = getMunicipalities();
      const ids = municipalities.map((municipality) => municipality.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it("ensures municipality IDs are positive numbers", () => {
      const municipalities = getMunicipalities();

      municipalities.forEach((municipality) => {
        expect(municipality.id).toBeGreaterThan(0);
        expect(Number.isInteger(municipality.id)).toBe(true);
      });
    });

    it("ensures no duplicate municipalities", () => {
      const municipalities = getMunicipalities();
      const serializedMunicipalities = municipalities.map((municipality) => JSON.stringify(municipality));
      const uniqueMunicipalities = new Set(serializedMunicipalities);

      expect(uniqueMunicipalities.size).toBe(serializedMunicipalities.length);
    });

    it("ensures region IDs are within expected range (1-14)", () => {
      const municipalities = getMunicipalities();

      municipalities.forEach((municipality) => {
        expect(municipality.regionAndUnit.regionId).toBeGreaterThanOrEqual(1);
        expect(municipality.regionAndUnit.regionId).toBeLessThanOrEqual(14);
      });
    });

    it("ensures ISO codes follow the correct pattern", () => {
      const municipalities = getMunicipalities();
      const isoPattern = /^GR-[A-Z0-9]+$/;

      municipalities.forEach((municipality) => {
        expect(municipality.regionAndUnit.regionIso31662).toMatch(isoPattern);
      });
    });
  });

  describe("specific municipalities verification", () => {
    it("includes known municipalities in Greek locale", () => {
      const municipalities = getMunicipalities({ locale: "el" });
      const municipalityNames = municipalities.map((m) => m.name);

      expect(municipalityNames).toContain("Αθηναίων"); // Athens
      expect(municipalityNames).toContain("Θεσσαλονίκης"); // Thessaloniki
      expect(municipalityNames).toContain("Πατρέων"); // Patras
      expect(municipalityNames).toContain("Ηρακλείου"); // Heraklion
    });

    it("includes known municipalities in English locale", () => {
      const municipalities = getMunicipalities({ locale: "en" });
      const municipalityNames = municipalities.map((m) => m.name);

      expect(municipalityNames).toContain("Athens");
      expect(municipalityNames).toContain("Thessaloniki");
      expect(municipalityNames).toContain("Patras");
      expect(municipalityNames).toContain("Heraklion");
    });

    it("verifies a specific municipality has expected structure (Athens - Greek)", () => {
      const municipalities = getMunicipalities({ locale: "el" });
      const athens = municipalities.find((m) => m.name === "Αθηναίων");

      expect(athens).toBeDefined();
      if (athens) {
        expect(athens.id).toBeGreaterThan(0);
        expect(athens.seat).toBe("Αθήνα");
        expect(athens.regionAndUnit.regionId).toBeGreaterThan(0);
        expect(athens.regionAndUnit.unitId).toBeGreaterThan(0);
        expect(athens.regionAndUnit.regionIso31662).toMatch(/^GR-/);
      }
    });

    it("verifies a specific municipality has expected structure (Athens - English)", () => {
      const municipalities = getMunicipalities({ locale: "en" });
      const athens = municipalities.find((m) => m.name === "Athens");

      expect(athens).toBeDefined();
      if (athens) {
        expect(athens.id).toBeGreaterThan(0);
        expect(athens.seat).toBe("Athens");
        expect(athens.regionAndUnit.regionId).toBeGreaterThan(0);
        expect(athens.regionAndUnit.unitId).toBeGreaterThan(0);
        expect(athens.regionAndUnit.regionIso31662).toMatch(/^GR-/);
      }
    });

    it("verifies that same municipality has same ID across locales", () => {
      const greekMunicipalities = getMunicipalities({ locale: "el" });
      const englishMunicipalities = getMunicipalities({ locale: "en" });
      const athensGreek = greekMunicipalities.find((m) => m.name === "Αθηναίων");
      const athensEnglish = englishMunicipalities.find((m) => m.name === "Athens");

      expect(athensGreek).toBeDefined();
      expect(athensEnglish).toBeDefined();
      if (athensGreek && athensEnglish) {
        expect(athensGreek.id).toBe(athensEnglish.id);
        expect(athensGreek.regionAndUnit.regionId).toBe(athensEnglish.regionAndUnit.regionId);
        expect(athensGreek.regionAndUnit.unitId).toBe(athensEnglish.regionAndUnit.unitId);
      }
    });
  });

  describe("distribution and coverage", () => {
    it("has municipalities from all 13 regions (excluding Mount Athos)", () => {
      const municipalities = getMunicipalities();
      const regionIds = new Set(municipalities.map((m) => m.regionAndUnit.regionId));

      // Should have at least 13 different regions
      expect(regionIds.size).toBeGreaterThanOrEqual(13);
    });

    it("has municipalities with various unit IDs", () => {
      const municipalities = getMunicipalities();
      const unitIds = new Set(municipalities.map((m) => m.regionAndUnit.unitId).filter((id) => id !== null));

      // Should have many different units (74 total in Greece without Mount Athos)
      expect(unitIds.size).toBeGreaterThan(50);
    });

    it("some municipalities have different names than their seats", () => {
      const municipalities = getMunicipalities({ locale: "el" });
      const differentNameAndSeat = municipalities.filter((m) => m.name !== m.seat);

      expect(differentNameAndSeat.length).toBeGreaterThan(0);
    });

    it("some municipalities have same name as their seats", () => {
      const municipalities = getMunicipalities({ locale: "el" });
      const sameNameAndSeat = municipalities.filter((m) => m.name === m.seat);

      expect(sameNameAndSeat.length).toBeGreaterThan(0);
    });
  });

  describe("consistency checks", () => {
    it("returns data consistent with getAdministrativeUnits", () => {
      const municipalitiesFromGetMunicipalities = getMunicipalities({ locale: "el" });
      const municipalitiesFromUnits = (getAdministrativeUnits({ locale: "el" }) as Unit[]).flatMap(
        ({ municipalities }) => [...municipalities],
      );

      expect(municipalitiesFromGetMunicipalities).toStrictEqual(municipalitiesFromUnits);
    });

    it("maintains order consistency across multiple calls", () => {
      const first = getMunicipalities();
      const second = getMunicipalities();

      expect(first).toStrictEqual(second);
    });

    it("maintains order consistency across locales (same IDs in same positions)", () => {
      const greek = getMunicipalities({ locale: "el" });
      const english = getMunicipalities({ locale: "en" });

      greek.forEach((greekMunicipality, index) => {
        expect(greekMunicipality.id).toBe(english[index]?.id);
      });
    });
  });
});
