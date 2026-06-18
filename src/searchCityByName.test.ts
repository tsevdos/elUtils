import { searchCityByName } from "./searchCityByName";
import { getCities } from "./getCities";

describe("searchCityByName", () => {
  describe("exact match searches", () => {
    it("should return 1 city that matches the search term 'Αθήνα' in Greek locale", () => {
      expect(searchCityByName({ searchTerm: "Αθήνα", locale: "el" })).toEqual([
        {
          id: 1,
          name: "Αθήνα",
          coordinates: [23.726247807017884, 37.97521056577561],
          relations: {
            regionId: 9,
            regionIso31662: "GR-I",
            unitId: 42,
            municipalityId: 193,
            prefectureId: 1,
          },
        },
      ]);
    });

    it("should return 1 city that matches the search term 'Athens' in English locale", () => {
      expect(searchCityByName({ searchTerm: "Athens", locale: "en" })).toEqual([
        {
          id: 1,
          name: "Athens",
          coordinates: [23.726247807017884, 37.97521056577561],
          relations: {
            regionId: 9,
            regionIso31662: "GR-I",
            unitId: 42,
            municipalityId: 193,
            prefectureId: 1,
          },
        },
      ]);
    });
  });

  describe("case insensitive searches", () => {
    it("should return 1 city that matches the search term 'athens' (lowercase) in English locale", () => {
      expect(searchCityByName({ searchTerm: "athens", locale: "en" })).toEqual([
        {
          id: 1,
          name: "Athens",
          coordinates: [23.726247807017884, 37.97521056577561],
          relations: {
            regionId: 9,
            regionIso31662: "GR-I",
            unitId: 42,
            municipalityId: 193,
            prefectureId: 1,
          },
        },
      ]);
    });

    it("should be case insensitive for English locale searches", () => {
      const lowercase = searchCityByName({ searchTerm: "athens", locale: "en" });
      const uppercase = searchCityByName({ searchTerm: "ATHENS", locale: "en" });
      const mixedCase = searchCityByName({ searchTerm: "AtHeNs", locale: "en" });

      expect(lowercase).toEqual(uppercase);
      expect(lowercase).toEqual(mixedCase);
      expect(lowercase?.length).toBe(1);
    });

    it("should handle Greek accents and normalize Greek text", () => {
      // Should find 'Αθήνα' even with different accent marks
      const withAccent = searchCityByName({ searchTerm: "Αθήνα", locale: "el" });
      const withoutAccent = searchCityByName({ searchTerm: "Αθηνα", locale: "el" });

      expect(withAccent).toEqual(withoutAccent);
      expect(withAccent?.length).toBe(1);
    });
  });

  describe("partial match searches", () => {
    it("should return all 10 matching cities when there are multiple matches for search term 'os'", () => {
      const expectedData = [
        {
          coordinates: [21.442708340507092, 37.672543519754875],
          id: 9,
          name: "Pyrgos",
          relations: {
            municipalityId: 143,
            prefectureId: 50,
            regionId: 7,
            regionIso31662: "GR-G",
            unitId: 34,
          },
        },
        {
          coordinates: [22.929678443624432, 37.93909792434953],
          id: 10,
          name: "Korinthos",
          relations: {
            municipalityId: 248,
            prefectureId: 39,
            regionId: 10,
            regionIso31662: "GR-J",
            unitId: 50,
          },
        },
        {
          coordinates: [20.89750593167611, 37.78816913748807],
          id: 13,
          name: "Zakynthos",
          relations: {
            municipalityId: 117,
            prefectureId: 33,
            regionId: 6,
            regionIso31662: "GR-F",
            unitId: 27,
          },
        },
        {
          coordinates: [20.4858289731687, 38.17813591215673],
          id: 15,
          name: "Argostoli",
          relations: {
            municipalityId: 122,
            prefectureId: 31,
            regionId: 6,
            regionIso31662: "GR-F",
            unitId: 29,
          },
        },
        {
          coordinates: [22.934181911197264, 39.36398741290451],
          id: 21,
          name: "Bolos",
          relations: {
            municipalityId: 107,
            prefectureId: 46,
            regionId: 5,
            regionIso31662: "GR-E",
            unitId: 24,
          },
        },
        {
          coordinates: [23.440219134217067, 40.37701865884807],
          id: 35,
          name: "Polygyros",
          relations: {
            municipalityId: 58,
            prefectureId: 10,
            regionId: 2,
            regionIso31662: "GR-B",
            unitId: 13,
          },
        },
        {
          coordinates: [28.227254271691837, 36.44321498471273],
          id: 39,
          name: "Rodos",
          relations: {
            municipalityId: 306,
            prefectureId: 43,
            regionId: 12,
            regionIso31662: "GR-L",
            unitId: 70,
          },
        },
        {
          coordinates: [26.97515562881134, 37.7590107428132],
          id: 42,
          name: "Samos",
          relations: {
            municipalityId: 270,
            prefectureId: 36,
            regionId: 11,
            regionIso31662: "GR-K",
            unitId: 56,
          },
        },
        {
          coordinates: [26.137369911811266, 38.36388010460335],
          id: 43,
          name: "Xios",
          relations: {
            municipalityId: 274,
            prefectureId: 34,
            regionId: 11,
            regionIso31662: "GR-K",
            unitId: 57,
          },
        },
        {
          coordinates: [25.716137398247188, 35.18997128171788],
          id: 45,
          name: "Agios Nikolaos",
          relations: {
            municipalityId: 319,
            prefectureId: 19,
            regionId: 13,
            regionIso31662: "GR-M",
            unitId: 72,
          },
        },
      ];

      expect(searchCityByName({ searchTerm: "os", locale: "en" })).toEqual(expectedData);
    });

    it("should return all 3 matching cities when there are multiple matches for search term 'πολη'", () => {
      const expectedData = [
        {
          coordinates: [22.373097659208483, 37.50979512133838],
          id: 7,
          name: "Τρίπολη",
          relations: {
            municipalityId: 244,
            prefectureId: 37,
            regionId: 10,
            regionIso31662: "GR-J",
            unitId: 49,
          },
        },
        {
          coordinates: [25.87239676796922, 40.84840593655441],
          id: 36,
          name: "Αλεξανδρούπολη",
          relations: {
            municipalityId: 6,
            prefectureId: 22,
            regionId: 1,
            regionIso31662: "GR-A",
            unitId: 2,
          },
        },
        {
          coordinates: [24.940125388382246, 37.442430072377526],
          id: 40,
          name: "Ερμούπολη",
          relations: {
            municipalityId: 290,
            prefectureId: 42,
            regionId: 12,
            regionIso31662: "GR-L",
            unitId: 64,
          },
        },
      ];

      expect(searchCityByName({ searchTerm: "πολη", locale: "el" })).toEqual(expectedData);
    });

    it("should find cities with partial matches at the beginning of the name", () => {
      const results = searchCityByName({ searchTerm: "Ath", locale: "en" });

      expect(results).not.toBeNull();
      expect(results?.length).toBeGreaterThan(0);
      expect(results?.some((city) => city.name === "Athens")).toBe(true);
    });

    it("should find cities with partial matches in the middle of the name", () => {
      const results = searchCityByName({ searchTerm: "then", locale: "en" });

      expect(results).not.toBeNull();
      expect(results?.length).toBeGreaterThan(0);
      expect(results?.some((city) => city.name === "Athens")).toBe(true);
    });

    it("should find cities with partial matches at the end of the name", () => {
      const results = searchCityByName({ searchTerm: "ens", locale: "en" });

      expect(results).not.toBeNull();
      expect(results?.length).toBeGreaterThan(0);
      expect(results?.some((city) => city.name === "Athens")).toBe(true);
    });
  });

  describe("no match scenarios", () => {
    it("should return null when no cities match the search term 'Spartacus'", () => {
      expect(searchCityByName({ searchTerm: "Spartacus", locale: "en" })).toBeNull();
    });

    it("should return null for non-existent city name in Greek locale", () => {
      expect(searchCityByName({ searchTerm: "ΧΧΧΧΧΧ", locale: "el" })).toBeNull();
    });

    it("should return null for empty search results", () => {
      expect(searchCityByName({ searchTerm: "xyz123", locale: "en" })).toBeNull();
      expect(searchCityByName({ searchTerm: "ψψψ", locale: "el" })).toBeNull();
    });

    it("should return null for gibberish search terms", () => {
      expect(searchCityByName({ searchTerm: "qwertyuiop", locale: "en" })).toBeNull();
      expect(searchCityByName({ searchTerm: "ξξξξξξ", locale: "el" })).toBeNull();
    });
  });

  describe("default behavior", () => {
    it("should use Greek locale by default when locale is not specified", () => {
      const withoutLocale = searchCityByName({ searchTerm: "Αθήνα" });
      const withGreekLocale = searchCityByName({ searchTerm: "Αθήνα", locale: "el" });

      expect(withoutLocale).toEqual(withGreekLocale);
      expect(withoutLocale?.length).toBe(1);
    });

    it("should not find Greek city names when using default locale and English search term", () => {
      // Using Greek locale (default) with English term should not match
      const result = searchCityByName({ searchTerm: "Athens" });

      expect(result).toBeNull();
    });
  });

  describe("edge cases", () => {
    it("should handle single character searches", () => {
      const resultsGreek = searchCityByName({ searchTerm: "Α", locale: "el" });
      const resultsEnglish = searchCityByName({ searchTerm: "A", locale: "en" });

      // Both should find cities starting with or containing the letter
      expect(resultsGreek).not.toBeNull();
      expect(resultsEnglish).not.toBeNull();
      expect(resultsGreek?.length).toBeGreaterThan(0);
      expect(resultsEnglish?.length).toBeGreaterThan(0);
    });

    it("should handle very long search terms that don't match", () => {
      const longTerm = "Thisisaverylongcitynamethatdoesnotexist";
      expect(searchCityByName({ searchTerm: longTerm, locale: "en" })).toBeNull();
    });

    it("should handle special characters gracefully", () => {
      expect(searchCityByName({ searchTerm: "@#$%", locale: "en" })).toBeNull();
    });

    it("should handle numbers in search terms", () => {
      expect(searchCityByName({ searchTerm: "123", locale: "en" })).toBeNull();
    });

    it("should handle whitespace in search terms", () => {
      const results = searchCityByName({ searchTerm: "Agios Nikolaos", locale: "en" });

      expect(results).not.toBeNull();
      expect(results?.length).toBe(1);
      expect(results?.[0]?.name).toBe("Agios Nikolaos");
    });
  });

  describe("data structure validation", () => {
    it("should return cities with all required properties", () => {
      const results = searchCityByName({ searchTerm: "Athens", locale: "en" });

      expect(results).not.toBeNull();
      results?.forEach((city) => {
        expect(city).toHaveProperty("id");
        expect(city).toHaveProperty("name");
        expect(city).toHaveProperty("coordinates");
        expect(city).toHaveProperty("relations");
        expect(typeof city.id).toBe("number");
        expect(typeof city.name).toBe("string");
        expect(Array.isArray(city.coordinates)).toBe(true);
        expect(typeof city.relations).toBe("object");
      });
    });

    it("should return cities with valid coordinates", () => {
      const results = searchCityByName({ searchTerm: "os", locale: "en" });

      expect(results).not.toBeNull();
      results?.forEach((city) => {
        expect(city.coordinates.length).toBe(2);
        expect(typeof city.coordinates[0]).toBe("number");
        expect(typeof city.coordinates[1]).toBe("number");
      });
    });

    it("should return cities with valid relations object", () => {
      const results = searchCityByName({ searchTerm: "Αθήνα", locale: "el" });

      expect(results).not.toBeNull();
      results?.forEach((city) => {
        expect(city.relations).toHaveProperty("regionId");
        expect(city.relations).toHaveProperty("regionIso31662");
        expect(city.relations).toHaveProperty("unitId");
        expect(city.relations).toHaveProperty("municipalityId");
        expect(city.relations).toHaveProperty("prefectureId");
      });
    });
  });

  describe("consistency checks", () => {
    it("should return consistent results for multiple calls with same search term", () => {
      const first = searchCityByName({ searchTerm: "Athens", locale: "en" });
      const second = searchCityByName({ searchTerm: "Athens", locale: "en" });

      expect(first).toStrictEqual(second);
    });

    it("should return results that are also present in getCities", () => {
      const searchResults = searchCityByName({ searchTerm: "Athens", locale: "en" });
      const allCities = getCities({ locale: "en" });

      expect(searchResults).not.toBeNull();
      searchResults?.forEach((city) => {
        const foundInAllCities = allCities.find((c) => c.id === city.id);
        expect(foundInAllCities).toBeDefined();
        expect(foundInAllCities).toStrictEqual(city);
      });
    });

    it("should never return duplicate cities in results", () => {
      const results = searchCityByName({ searchTerm: "os", locale: "en" });

      expect(results).not.toBeNull();
      if (results) {
        const ids = results.map((city) => city.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      }
    });
  });

  describe("locale-specific behavior", () => {
    it("should find different cities in different locales for similar search terms", () => {
      const greekResults = searchCityByName({ searchTerm: "Α", locale: "el" });
      const englishResults = searchCityByName({ searchTerm: "A", locale: "en" });

      // Both should return results but potentially different ones
      expect(greekResults).not.toBeNull();
      expect(englishResults).not.toBeNull();
    });

    it("should respect locale when searching", () => {
      // 'Athens' in English locale should find the city
      const englishSearch = searchCityByName({ searchTerm: "Athens", locale: "en" });
      expect(englishSearch).not.toBeNull();
      expect(englishSearch?.length).toBe(1);

      // 'Athens' in Greek locale should not find anything (city is named 'Αθήνα' in Greek)
      const greekSearch = searchCityByName({ searchTerm: "Athens", locale: "el" });
      expect(greekSearch).toBeNull();
    });
  });

  describe("return type validation", () => {
    it("should return an array when matches are found", () => {
      const result = searchCityByName({ searchTerm: "Athens", locale: "en" });

      expect(result).not.toBeNull();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should return null when no matches are found", () => {
      const result = searchCityByName({ searchTerm: "NonExistent", locale: "en" });

      expect(result).toBeNull();
      expect(Array.isArray(result)).toBe(false);
    });
  });
});
