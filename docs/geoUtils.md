# GeoUtils

> The **`geoUtils`** module provides functions for accessing geographic and administrative data. All these data are available **both in greek and english languages**.

## Table of Contents

- [**getAdministrativeRegions()**](#getAdministrativeRegions)
- [**getAdministrativeRegionById()**](#getAdministrativeRegionById)
- [**getAdministrativeRegionByIsoCode()**](#getAdministrativeRegionByIsoCode)
- [**getAdministrativeUnits()**](#getAdministrativeUnits)
- [**getAdministrativeUnitById()**](#getAdministrativeUnitById)
- [**getMunicipalities()**](#getMunicipalities)
- [**getCities()**](#getCities)
- [**searchCityByName()**](#searchCityByName)
- [**getCityById()**](#getCityById)
- [**getCityAdministrativeDivision()**](#getCityAdministrativeDivision)
- [**getGeographicRegions()**](#getGeographicRegions)
- [**getGeographicRegionById()**](#getGeographicRegionById)
- [**getPrefectures()**](#getPrefectures)
- [**getPrefectureById()**](#getPrefectureById)
- [**getAllPostalCodes()**](#getAllPostalCodes)
- [**findByPostalCode()**](#findByPostalCode)
- [**getAllTaxOffices()**](#getAllTaxOffices)
- [**getTaxOfficeById()**](#getTaxOfficeById)
- [**getTaxOfficesByRegionId()**](#getTaxOfficesByRegionId)
- [**getTaxOfficesByUnitId()**](#getTaxOfficesByUnitId)
- [**getTaxOfficesByMunicipalityId()**](#getTaxOfficesByMunicipalityId)
- [**getTaxOfficesByPostalCode()**](#getTaxOfficesByPostalCode)
- [**searchTaxOffice()**](#searchTaxOffice)

## Regions explanation

The geoUtils functions are the most data-rich functions of the package. They can provide various geo located data, so please first take a quick look on the available type of data. The 3 major categories you can get geographic data from are the below:

1. [**Administrative regions (περιφέρειες) of Greece**](#administrative-regions). Use these functions if you want to work with the current administrative regions and their sub-divisions.
2. [**Geographic regions of Greece**](#geographic-regions). Use these functions to get the geographic regions.
3. [**Prefectures (νομοί ή νομαρχίες) of Greece**](#prefectures). Use these functions to access Greece old administrative division system.
4. [**Postal codes**](#postal-codes).

Below you can learn more details regarding all these available geo data.

## [Administrative regions (περιφέρειες) of Greece](https://en.wikipedia.org/wiki/Regions_of_Greece)<a id='administrative-regions'></a>

The [**Kallikratis Programme**](https://en.wikipedia.org/wiki/Kallikratis_Programme) is seperating Greece in 13 regions (14 including Mount Athos). Each region (περιφέρεια) is further divided into regional units (περιφερειακές ενότητες), and each regional unit is further divided into municipalities (δήμους).

In a nutshel you can find the below data (available both greek and english languages):

- 13 regions of Greece (14 including Mount Athos)
- 74 regional units of Greece (75 including the Mount Athos)
- 332 municipalities

Each region, regional unit and municipality will have the below `schema`. Keep in mind that you can select the data to the level you need (regions, regional units, and municipalities).

```js
 {
    // region
    "id": 2,
    "iso31662": "GR-B",
    "name": "Central Macedonia",
    "seat": "Thessaloniki",
    "units": [
      // regional unit
      {
        "id": 13,
        "name": "Chalkidiki",
        "seat": "Polygyros",
        "region": {
          "id": 2,
          "iso31662": "GR-B"
        },
        "carPlatesPattern": ["XK*", "MA*"],
        "municipalities": [
          // municipality
          {
            "id": 59,
            "name": "Kassandra",
            "seat": "Kassandreia",
            "regionAndUnit": {
              "regionId": 2,
              "regionIso31662": "GR-B",
              "unitId": 13
            }
          },
          ...
        ],
        ...
      }
    ]
  },
```

The functions dealing with the administrative regions (περιφέρειες) are listed below:

- [**getAdministrativeRegions()**](#getAdministrativeRegions)
- [**getAdministrativeRegionById()**](#getAdministrativeRegionById)
- [**getAdministrativeRegionByIsoCode()**](#getAdministrativeRegionByIsoCode)
- [**getAdministrativeUnits()**](#getAdministrativeUnits)
- [**getAdministrativeUnitById()**](#getAdministrativeUnitById)
- [**getMunicipalities()**](#getMunicipalities)

## [Cities of Greece](https://en.wikipedia.org/wiki/Geographic_regions_of_Greece)<a id='cities'></a>

Currently we have included 51 cities in total. The `relations` property links the old prefectures system and the current [**Kallikratis Programme**](https://en.wikipedia.org/wiki/Kallikratis_Programme).

Each city has the below `schema`.

```js
 {
    "id": 1,
    "name": "Athens",
    "coordinates": [23.726247807017884, 37.97521056577561],
    "relations": {
      "regionId": 9,
      "regionIso31662": "GR-I",
      "unitId": 42,
      "municipalityId": 193,
      "prefectureId": 1
    }
  }
```

The functions dealing with the cities are listed below:

- [**getCities()**](#getCities)
- [**searchCityByName()**](#searchCityByName)
- [**getCityById()**](#getCityById)
- [**getCityAdministrativeDivision()**](#getCityAdministrativeDivision)

## [Geographic regions of Greece](https://en.wikipedia.org/wiki/Geographic_regions_of_Greece)<a id='geographic-regions'></a>

The geographic regions, separates Greece in 9 regions.

Each region has the below `schema`.

```js
 {
    "id": 1,
    "name": "Epirus",
    "seat": "Ioannina",
    "administrativeRegions": [
      {
        "id": 4,
        "iso31662": "GR-D"
      }
    ]
  }
```

The functions dealing with the geographic regions are listed below:

- [**getGeographicRegions()**](#getGeographicRegions)
- [**getGeographicRegionById()**](#getGeographicRegionById)

## [Prefectures (νομοί ή νομαρχίες) of Greece](https://en.wikipedia.org/wiki/Prefectures_of_Greece)<a id='prefectures'></a>

Before [**Kallikratis reform**](https://en.wikipedia.org/wiki/Kallikratis_Programme), which entered into force on 1 January 2011, prefectures were the main administrative division. Prefectures were dividing Greece in 54 units (55 including Mount Athos). Keep in mind that "Attica" was a huge / big "prefecture" (υπερ-νομαρχία) that consistent from 4 independent prefectures ("Athens Prefecture" / "Νομός Αθηνών", "East Attica" / "Νομός Ανατολικής Αττικής", "West Attica" / "Νομός Δυτικής Αττικής" and "Piraeus" / "Νομός Πειραιά").

Each prefecture has the below `schema`.

```js
{
  "id": 49,
  "name": "Aetolia-Acarnania",
  "seat": "Messolonghi",
  "regionAndUnit": {
    "regionId": 7,
    "regionIso31662": "GR-G",
    "unitId": 32
  }
},
```

The functions dealing with the prefectures are listed below:

- [**getPrefectures()**](#getPrefectures)
- [**getPrefectureById()**](#getPrefectureById)

## [Postal codes](https://en.wikipedia.org/wiki/Postal_codes_in_Greece)<a id='postal-codes'></a>

Finally you can fetch data about any administrative region, regional unit and prefecture, by providing a valid postal code. Keep in mind that postal codes better matched with `prefectures` entities, because there were available before Kallikratis reform. This package is trying to include data both for the administrative regions and regional units as well, so if you find any mistakes feel free to contribute either with a PR and / or with an issue.

For `schema` information please find information above.

The functions dealing with postal codes is listed below:

- [**getAllPostalCodes()**](#getAllPostalCodes)
- [**findByPostalCode()**](#findByPostalCode)

## API

### getAdministrativeRegions()<a id='getAdministrativeRegions'></a>

**Description**: Retrieves administrative regions data.

**Parameters:**

**options**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the administrative regions data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("region", "unit", or "municipality").

**`Return Type`**: Array of `Region` objects.

---

### getAdministrativeRegionById()<a id='getAdministrativeRegionById'></a>

**Description**: Retrieves a single administrative region's data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the administrative region.
- **`locale`** (optional, default: "el"): The locale for the administrative region data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("region", "unit", or "municipality").

**`Return Type`**: A `Region` object.

---

### getAdministrativeRegionByIsoCode()<a id='getAdministrativeRegionByIsoCode'></a>

**Description**: Retrieves an administrative region by its ISO code.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`isocode`**: The ISO code (ISO_3166-2) of the administrative region.
- **`locale`** (optional, default: "el"): The locale for the administrative region data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("region", "unit", or "municipality").

**`Return Type`**: A `Region` object.

> On this [**table**](https://en.wikipedia.org/wiki/ISO_316-2:GR) you can find **ALL** the available `ISO_3166-2` region codes.

---

### getAdministrativeUnits()<a id='getAdministrativeUnits'></a>

**Description**: Retrieves regional units data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the administrative units data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("unit" or "municipality").

**`Return Type`**: Array of `Unit` objects.

---

### getAdministrativeUnitById()<a id='getAdministrativeUnitById'></a>

**Description**: Retrieves a regional unit (`Unit`) by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the administrative unit.
- **`locale`** (optional, default: "el"): The locale for the administrative unit data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("unit" or "municipality").

**Return Type**: A `Unit` object.

---

### getMunicipalities()<a id='getMunicipalities'></a>

**Description**: Retrieves municipality data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the municipality data ("el" for Greek, "en" for English).

**Return Type**: Array of `Municipality` objects.

---

### getCities()<a id='getCities'></a>

**Description**: Retrieves cities data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the city data ("el" for Greek, "en" for English).

**Return Type**: Array of `City` objects.

---

### searchCityByName()<a id='searchCityByName'></a>

**Description**: Searches for cities by searchTerm in a specified locale.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`searchTerm`**: The searchTerm with which we search through cities data.
- **`locale`** (optional, default: "el"): The locale for the city data ("el" for Greek, "en" for English).

**Return Type**: Array of `City` objects or null if nothing matches.

---

### getCityById()<a id='getCityById'></a>

**Description**: Retrieves city by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the city.
- **`locale`** (optional, default: "el"): The locale for the city data ("el" for Greek, "en" for English).

**Return Type**: A `City` object.

---

### getCityAdministrativeDivision()<a id='getCityAdministrativeDivision'></a>

**Description**: Retrieves city relations by its ID and entity.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the city.
- **`locale`** (optional, default: "el"): The locale for the city data ("el" for Greek, "en" for English).
- **`entity`**: The entity for the city relations data ("region" or "unit" or "municipality" or "prefecture").

**Return Type**: A `Region | Unit | Municipality | Prefecture` object.

---

### getGeographicRegions()<a id='getGeographicRegions'></a>

**Description**: Retrieves geographic regions data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the geographic regions data ("el" for Greek, "en" for English).

**Return Type**: Array of `GeographicRegion` objects.

---

### getGeographicRegionById()<a id='getGeographicRegionById'></a>

**Description**: Retrieves a geographic region by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the geographic region.
- **`locale`** (optional, default: "el"): The locale for the geographic region data ("el" for Greek, "en" for English).

**Return Type**: A `GeographicRegion` object.

---

### getPrefectures()<a id='getPrefectures'></a>

**Description**: Retrieves prefectures data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the prefectures data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos prefecture.

**Return Type**: Array of `Prefecture` objects.

---

### getPrefectureById()<a id='getPrefectureById'></a>

**Description**: Retrieves a prefecture by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the prefecture.
- **`locale`** (optional, default: "el"): The locale for the prefecture data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos prefecture.

**Return Type**: A `Prefecture` object.

---

### getAllPostalCodes()<a id='getAllPostalCodes'></a>

**Description**: Retrieves all valid postal codes.

**Parameters:**

none

**Return Type**: An array of strings.

---

### findByPostalCode()<a id='findByPostalCode'></a>

**Description**: Finds geographic entities (prefecture, region, or unit) by postal code.

**Parameters:**

**`postalCode`**: The postal code to search for.

**`options`** (optional): An object specifying additional options for retrieval.

- **`locale`** (default: "el"): The locale for the retrieved entity.
- **`entity`** (default: "prefecture"): The type of entity to retrieve ("prefecture", "region", or "unit").

**Return Type**: The corresponding geographic entity (`Prefecture`, `Region`, or `Unit`) or undefined if not found.

---

### getAllTaxOffices()<a id='getAllTaxOffices'></a>

**Description**: Retrieves all tax offices.

**Parameters:**

**`options`** (optional): An object specifying additional options for retrieval.

- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects.

---

### getTaxOfficeById()<a id='getTaxOfficeById'></a>

**Description**: Retrieves a tax office by its ID.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`id`** (required): The ID of the tax office to retrieve.
- **`locale`** (default: "el"): The locale for the retrieved tax office.

**Return Type**: The `TaxOffice` object corresponding to the given ID, or undefined if not found.

---

### getTaxOfficesByRegionId()<a id='getTaxOfficesByRegionId'></a>

**Description**: Retrieves tax offices by their region ID.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`regionId`** (required): The region ID to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given region ID.

---

### getTaxOfficesByUnitId()<a id='getTaxOfficesByUnitId'></a>

**Description**: Retrieves tax offices by their unit ID.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`unitId`** (required): The unit ID to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given unit ID.

---

### getTaxOfficesByMunicipalityId()<a id='getTaxOfficesByMunicipalityId'></a>

**Description**: Retrieves tax offices by their municipality ID.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`municipalityId`** (required): The municipality ID to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given municipality ID.

---

### getTaxOfficesByPostalCode()<a id='getTaxOfficesByPostalCode'></a>

**Description**: Retrieves tax offices that match the given postal code.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`postalCode`** (required): The postal code to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given postal code.

---

### searchTaxOffice()<a id='searchTaxOffice'></a>

**Description**: Retrieves tax offices that match the given search term.

**Parameters:**

**`options`** (optional): An object specifying options for retrieval.

- **`searchTerm`** (optional): The search term to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given search term, or an empty array if nothing matches.
