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
- [**getCountries()**](#getCountries)
- [**searchCountryByName()**](#searchCountryByName)
- [**getCountry()**](#getCountry)

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

**Example:**

```javascript
// Get all regions in Greek (default)
const regions = getAdministrativeRegions();

// Get all regions in English with Mount Athos
const regionsEN = getAdministrativeRegions({
  locale: "en",
  includeMountAthos: true,
  level: "region",
});
```

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

**Example:**

```javascript
// Get region with id 2 in Greek
const region = getAdministrativeRegionById({ id: 2 });

// Get region with id 2 in English with municipalities
const regionEN = getAdministrativeRegionById({
  id: 2,
  locale: "en",
  level: "municipality",
});
```

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

**Example:**

```javascript
// Get region by ISO code in Greek (default)
const region = getAdministrativeRegionByIsoCode({ isocode: "GR-A" });
// Returns: { id: 1, name: "Ανατολική Μακεδονία και Θράκη", ... }

// Get region by ISO code in English with municipalities
const regionEN = getAdministrativeRegionByIsoCode({
  isocode: "GR-A",
  locale: "en",
  level: "municipality",
});
// Returns: { id: 1, name: "East Macedonia and Thrace", ... }
```

---

### getAdministrativeUnits()<a id='getAdministrativeUnits'></a>

**Description**: Retrieves regional units data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the administrative units data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("unit" or "municipality").

**`Return Type`**: Array of `Unit` objects.

**Example:**

```javascript
// Get all units in Greek (default)
const units = getAdministrativeUnits();
// Returns: [{ id: 1, name: "Δράμα", ... }]

// Get units in English without Mount Athos
const unitsEN = getAdministrativeUnits({
  locale: "en",
  includeMountAthos: false,
  level: "unit",
});
// Returns: [{ id: 1, name: "Drama", ... }]
```

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

**Example:**

```javascript
// Get unit by id in Greek (default)
const unit = getAdministrativeUnitById({ id: 13 });
// Returns: { id: 13, name: "Χαλκιδική", ... }

// Get unit in English with municipalities
const unitEN = getAdministrativeUnitById({
  id: 13,
  locale: "en",
  level: "municipality",
});
// Returns: { id: 13, name: "Chalkidiki", ... }
```

---

### getMunicipalities()<a id='getMunicipalities'></a>

**Description**: Retrieves municipality data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the municipality data ("el" for Greek, "en" for English).

**Return Type**: Array of `Municipality` objects.

**Example:**

```javascript
// Get all municipalities in Greek (default)
const municipalities = getMunicipalities();
// Returns: [{ id: 1, name: "Αβδήρων", ... }]

// Get municipalities in English
const municipalitiesEN = getMunicipalities({ locale: "en" });
// Returns: [{ id: 1, name: "Avdira", ... }]
```

---

### getCities()<a id='getCities'></a>

**Description**: Retrieves cities data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the city data ("el" for Greek, "en" for English).

**Return Type**: Array of `City` objects.

**Example:**

```javascript
// Get all cities in Greek (default)
const cities = getCities();
// Returns: [{ id: 1, name: "Αθήνα", ... }]

// Get cities in English
const citiesEN = getCities({ locale: "en" });
// Returns: [{ id: 1, name: "Athens", ... }]
```

---

### searchCityByName()<a id='searchCityByName'></a>

**Description**: Searches for cities by searchTerm in a specified locale.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`searchTerm`**: The searchTerm with which we search through cities data.
- **`locale`** (optional, default: "el"): The locale for the city data ("el" for Greek, "en" for English).

**Return Type**: Array of `City` objects or null if nothing matches.

**Example:**

```javascript
// Search cities in Greek (default)
const cities = searchCityByName({ searchTerm: "Αθήνα" });
// Returns: [{ id: 1, name: "Αθήνα", coordinates: [23.72, 37.97], ... }]

// Search cities in English
const citiesEN = searchCityByName({ searchTerm: "Athens", locale: "en" });
// Returns: [{ id: 1, name: "Athens", coordinates: [23.72, 37.97], ... }]
```

---

### getCityById()<a id='getCityById'></a>

**Description**: Retrieves city by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the city.
- **`locale`** (optional, default: "el"): The locale for the city data ("el" for Greek, "en" for English).

**Return Type**: A `City` object.

**Example:**

```javascript
// Get city by id in Greek (default)
const city = getCityById({ id: 1 });
// Returns: { id: 1, name: "Αθήνα", coordinates: [23.72, 37.97], ... }

// Get city in English
const cityEN = getCityById({ id: 1, locale: "en" });
// Returns: { id: 1, name: "Athens", coordinates: [23.72, 37.97], ... }
```

---

### getCityAdministrativeDivision()<a id='getCityAdministrativeDivision'></a>

**Description**: Retrieves city relations by its ID and entity.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the city.
- **`locale`** (optional, default: "el"): The locale for the city data ("el" for Greek, "en" for English).
- **`entity`**: The entity for the city relations data ("region" or "unit" or "municipality" or "prefecture").

**Return Type**: A `Region | Unit | Municipality | Prefecture` object.

**Example:**

```javascript
// Get city's region data in Greek (default)
const cityRegion = getCityAdministrativeDivision({ id: 1, entity: "region" });
// Returns: { id: 9, name: "Αττική", ... }

// Get city's municipality data in English
const cityMunicipalityEN = getCityAdministrativeDivision({
  id: 1,
  locale: "en",
  entity: "municipality",
});
// Returns: { id: 193, name: "Athens", ... }
```

---

### getGeographicRegions()<a id='getGeographicRegions'></a>

**Description**: Retrieves geographic regions data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the geographic regions data ("el" for Greek, "en" for English).

**Return Type**: Array of `GeographicRegion` objects.

**Example:**

```javascript
// Get all geographic regions in Greek (default)
const regions = getGeographicRegions();
// Returns: [{ id: 1, name: "Ήπειρος", ... }]

// Get geographic regions in English
const regionsEN = getGeographicRegions({ locale: "en" });
// Returns: [{ id: 1, name: "Epirus", ... }]
```

---

### getGeographicRegionById()<a id='getGeographicRegionById'></a>

**Description**: Retrieves a geographic region by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the geographic region.
- **`locale`** (optional, default: "el"): The locale for the geographic region data ("el" for Greek, "en" for English).

**Return Type**: A `GeographicRegion` object.

**Example:**

```javascript
// Get geographic region by id in Greek (default)
const region = getGeographicRegionById({ id: 1 });
// Returns: { id: 1, name: "Ήπειρος", seat: "Ιωάννινα", ... }

// Get geographic region in English
const regionEN = getGeographicRegionById({ id: 1, locale: "en" });
// Returns: { id: 1, name: "Epirus", seat: "Ioannina", ... }
```

---

### getPrefectures()<a id='getPrefectures'></a>

**Description**: Retrieves prefectures data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the prefectures data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos prefecture.

**Return Type**: Array of `Prefecture` objects.

**Example:**

```javascript
// Get all prefectures in Greek (default)
const prefectures = getPrefectures();
// Returns: [{ id: 1, name: "Αθηνών", ... }]

// Get prefectures in English including Mount Athos
const prefecturesEN = getPrefectures({
  locale: "en",
  includeMountAthos: true,
});
// Returns: [{ id: 1, name: "Athens", ... }]
```

---

### getPrefectureById()<a id='getPrefectureById'></a>

**Description**: Retrieves a prefecture by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the prefecture.
- **`locale`** (optional, default: "el"): The locale for the prefecture data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos prefecture.

**Return Type**: A `Prefecture` object.

**Example:**

```javascript
// Get prefecture by id in Greek (default)
const prefecture = getPrefectureById({ id: 1 });
// Returns: { id: 1, name: "Αθηνών", ... }

// Get prefecture in English
const prefectureEN = getPrefectureById({ id: 1, locale: "en" });
// Returns: { id: 1, name: "Athens", ... }
```

---

### getAllPostalCodes()<a id='getAllPostalCodes'></a>

**Description**: Retrieves all valid postal codes.

**Parameters:**

none

**Return Type**: An array of strings.

**Example:**

```javascript
// Get all postal codes
const postalCodes = getAllPostalCodes();
// Returns: ["10431", "10432", "10433", ...]
```

---

### findByPostalCode()<a id='findByPostalCode'></a>

**Description**: Finds geographic entities (prefecture, region, or unit) by postal code.

**Parameters:**

**`postalCode`**: The postal code to search for.

**`options`** (optional): An object specifying additional options for retrieval.

- **`locale`** (default: "el"): The locale for the retrieved entity.
- **`entity`** (default: "prefecture"): The type of entity to retrieve ("prefecture", "region", or "unit").

**Return Type**: The corresponding geographic entity (`Prefecture`, `Region`, or `Unit`) or undefined if not found.

**Example:**

```javascript
// Find prefecture by postal code in Greek (default)
const result = findByPostalCode("10432");
// Returns: { id: 1, name: "Αθηνών", ... }

// Find region by postal code in English
const resultEN = findByPostalCode("10432", { locale: "en", entity: "region" });
// Returns: { id: 9, name: "Attica", ... }
```

---

### getAllTaxOffices()<a id='getAllTaxOffices'></a>

**Description**: Retrieves all tax offices.

**Parameters:**

**`options`** (optional): An object specifying additional options for retrieval.

- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects.

**Example:**

```javascript
// Get all tax offices in Greek (default)
const taxOffices = getAllTaxOffices();
// Returns: [{ id: "1101", name: "Δ.Ο.Υ. Α' Αθηνών", ... }]

// Get all tax offices in English
const taxOfficesEN = getAllTaxOffices({ locale: "en" });
// Returns: [{ id: "1101", name: "Athens A' Tax Office", ... }]
```

---

### getTaxOfficeById()<a id='getTaxOfficeById'></a>

**Description**: Retrieves a tax office by its ID.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`id`** (required): The ID of the tax office to retrieve.
- **`locale`** (default: "el"): The locale for the retrieved tax office.

**Return Type**: The `TaxOffice` object corresponding to the given ID, or undefined if not found.

**Example:**

```javascript
// Get tax office by id in Greek (default)
const taxOffice = getTaxOfficeById({ id: "1101" });
// Returns: { id: "1101", name: "Δ.Ο.Υ. Α' Αθηνών", ... }

// Get tax office in English
const taxOfficeEN = getTaxOfficeById({ id: "1101", locale: "en" });
// Returns: { id: "1101", name: "Athens A' Tax Office", ... }
```

---

### getTaxOfficesByRegionId()<a id='getTaxOfficesByRegionId'></a>

**Description**: Retrieves tax offices by their region ID.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`regionId`** (required): The region ID to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given region ID.

**Example:**

```javascript
// Get tax offices by region id in Greek (default)
const taxOffices = getTaxOfficesByRegionId({ regionId: 9 });
// Returns: [{ id: "1101", name: "Δ.Ο.Υ. Α' Αθηνών", ... }, ...]

// Get tax offices in English
const taxOfficesEN = getTaxOfficesByRegionId({ regionId: 9, locale: "en" });
// Returns: [{ id: "1101", name: "Athens A' Tax Office", ... }, ...]
```

---

### getTaxOfficesByUnitId()<a id='getTaxOfficesByUnitId'></a>

**Description**: Retrieves tax offices by their unit ID.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`unitId`** (required): The unit ID to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given unit ID.

**Example:**

```javascript
// Get tax offices by unit id in Greek (default)
const taxOffices = getTaxOfficesByUnitId({ unitId: 42 });
// Returns: [{ id: "1101", name: "Δ.Ο.Υ. Α' Αθηνών", ... }, ...]

// Get tax offices in English
const taxOfficesEN = getTaxOfficesByUnitId({ unitId: 42, locale: "en" });
// Returns: [{ id: "1101", name: "Athens A' Tax Office", ... }, ...]
```

---

### getTaxOfficesByMunicipalityId()<a id='getTaxOfficesByMunicipalityId'></a>

**Description**: Retrieves tax offices by their municipality ID.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`municipalityId`** (required): The municipality ID to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given municipality ID.

**Example:**

```javascript
// Get tax offices by municipality id in Greek (default)
const taxOffices = getTaxOfficesByMunicipalityId({ municipalityId: 193 });
// Returns: [{ id: "1101", name: "Δ.Ο.Υ. Α' Αθηνών", ... }, ...]

// Get tax offices in English
const taxOfficesEN = getTaxOfficesByMunicipalityId({
  municipalityId: 193,
  locale: "en",
});
// Returns: [{ id: "1101", name: "Athens A' Tax Office", ... }, ...]
```

---

### getTaxOfficesByPostalCode()<a id='getTaxOfficesByPostalCode'></a>

**Description**: Retrieves tax offices that match the given postal code.

**Parameters:**

**`options`** (required): An object specifying options for retrieval.

- **`postalCode`** (required): The postal code to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given postal code.

**Example:**

```javascript
// Get tax offices for postal code in Greek (default)
const taxOffices = getTaxOfficesByPostalCode({ postalCode: "10432" });
// Returns: [{ id: "1101", name: "Δ.Ο.Υ. Α' Αθηνών", ... }]

// Get tax offices in English
const taxOfficesEN = getTaxOfficesByPostalCode({
  postalCode: "10432",
  locale: "en",
});
// Returns: [{ id: "1101", name: "Athens A' Tax Office", ... }]
```

---

### searchTaxOffice()<a id='searchTaxOffice'></a>

**Description**: Retrieves tax offices that match the given search term.

**Parameters:**

**`options`** (optional): An object specifying options for retrieval.

- **`searchTerm`** (optional): The search term to match.
- **`locale`** (default: "el"): The locale for the retrieved tax offices.

**Return Type**: An array of `TaxOffice` objects that match the given search term, or an empty array if nothing matches.

**Example:**

```javascript
// Search tax offices in Greek (default)
const results = searchTaxOffice({ searchTerm: "Αθηνών" });
// Returns: [{ id: "1101", name: "Δ.Ο.Υ. Α' Αθηνών", ... }]

// Search in English
const resultsEN = searchTaxOffice({
  searchTerm: "Athens",
  locale: "en",
});
// Returns: [{ id: "1101", name: "Athens A' Tax Office", ... }]
```

---

### getCountries()<a id='getCountries'></a>

**Description**: Returns all the countries based on the provided options.

**Parameters:**

**`options`** (optional): An object containing the following properties:

- **`locale`** (default: "el"): The locale of the countries to return. Possible values: "el" | "en"

**Return Type**: An array of country objects containing details like name, ISO codes, etc.

**Example:**

```javascript
// Get all countries in Greek (default)
const countries = getCountries();

// Get all countries in English
const countriesEN = getCountries({ locale: "en" });
```

---

### searchCountryByName()<a id='searchCountryByName'></a>

**Description**: Searches for countries by name based on the provided search term. The search is performed on name, completeName, and officialName fields.

**Parameters:**

**`options`** (required): An object containing:

- **`searchTerm`** (required): The term to search for in country names.
- **`locale`** (optional, default: "el"): The locale for the country data ("el" for Greek, "en" for English).

**Return Type**: Array of `Country` objects that match the search term, or null if no matches are found.

**Example:**

```javascript
// Search countries in Greek (default)
const countries = searchCountryByName({ searchTerm: "Ελλάδα" });
// Returns: [{ id: "GR", name: "Ελλάδα", completeName: "Ελληνική Δημοκρατία", ... }]

// Search countries in English
const countriesEN = searchCountryByName({ searchTerm: "Greece", locale: "en" });
// Returns: [{ id: "GR", name: "Greece", completeName: "Hellenic Republic", ... }]
```

---

### getCountry()<a id='getCountry'></a>

**Description**: Retrieves a country by various identifiers (ID, ISO codes, or TLD).

**Parameters:**

**`options`** (required): An object containing:

- **`type`** (required): The type of identifier to use. One of:
  - "id": Country ID
  - "iso31661-a2": ISO 3166-1 alpha-2 code
  - "iso31661-a3": ISO 3166-1 alpha-3 code
  - "tld": Top Level Domain
- **`value`** (required): The value to search for (e.g., "GR" for Greece)
- **`locale`** (optional, default: "el"): The locale for the country data ("el" for Greek, "en" for English)

**Return Type**: A `Country` object or null if not found.

**Example:**

```javascript
// Get country by ISO alpha-2 code in Greek (default)
const country = getCountry({ type: "iso31661-a2", value: "GR" });
// Returns: { id: "GR", name: "Ελλάδα", ... }

// Get country by ISO alpha-3 code in English
const countryEN = getCountry({
  type: "iso31661-a3",
  value: "GRC",
  locale: "en",
});
// Returns: { id: "GR", name: "Greece", ... }

// Get country by TLD
const countryByTLD = getCountry({ type: "tld", value: ".gr" });
// Returns: { id: "GR", name: "Ελλάδα", ... }
```
