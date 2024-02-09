# GeoUtils

> The **`GeoUtils`** singleton object provides a set of methods for accessing geographic and administrative data. All these data are available **both in greek and english languages**.

GeoUtils object is the most data-rich object of the package. It can provide various geo located data, so please first take a quick look on the type of data it provides. The 3 major categories you can get geographic data from are the below:

1. [**Administrative regions (περιφέρειες) of Greece**](#administrative-regions). Use these methods if you want to work with the current administrative regions and their sub-divisions.
2. [**Geographic regions of Greece**](#geographic-regions). Use these methods to get the geographic regions.
3. [**Prefectures (νομοί ή νομαρχίες) of Greece**](#prefectures). Use these methods to access Greece old administrative division.
4. [**Postal codes**](#postal-codes)

Below you can learn more details regarding geo data and which methods is about each section.

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

The methods dealing with the administrative regions (περιφέρειες) are listed below:

- [**GeoUtils.getAdministrativeRegions()**](#getAdministrativeRegions)
- [**GeoUtils.getAdministrativeRegionById()**](#getAdministrativeRegionById)
- [**GeoUtils.getAdministrativeRegionByIsoCode()**](#getAdministrativeRegionByIsoCode)
- [**GeoUtils.getAdministrativeUnits()**](#getAdministrativeUnits)
- [**GeoUtils.getAdministrativeUnitById()**](#getAdministrativeUnitById)
- [**GeoUtils.getMunicipalities()**](#getMunicipalities)

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

The methods dealing with the geographic regions are listed below:

- [**GeoUtils.getGeographicRegions()**](#getGeographicRegions)
- [**GeoUtils.getGeographicRegionById()**](#getGeographicRegionById)

## [Prefectures (νομοί ή νομαρχίες) of Greece](https://en.wikipedia.org/wiki/Prefectures_of_Greece)<a id='prefectures'></a>

Before [**Kallikratis reform**](https://en.wikipedia.org/wiki/Kallikratis_Programme), which entered into force on 1 January 2011, prefectures were the main administrative division. Prefectures were dividing Greece in 54 units (55 including Mount Athos). Keep in mind that "Attica" was a huge / big "prefecture" (υπερ-νομαρχία) that consistent from 4 completely indident prefectures ("Athens Prefecture" / "Νομός Αθηνών", "East Attica" / "Νομός Ανατολικής Αττικής", "West Attica" / "Νομός Δυτικής Αττικής" and "Piraeus" / "Νομός Πειραιά").

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

The methods dealing with the prefectures are listed below:

- [**GeoUtils.getPrefectures()**](#getPrefectures)
- [**GeoUtils.getPrefectureById()**](#getPrefectureById)

## [Postal codes](https://en.wikipedia.org/wiki/Postal_codes_in_Greece)<a id='postal-codes'></a>

Finally you can fetch data about any administrative region, regional unit and prefecture, by providing a valid postal code. Keep in mind that postal codes better matched with `prefectures` entities, mostly because there are more official data available, but I have tried to include data for the administrative regions and regional units as well (after [Kallikratis reform](https://en.wikipedia.org/wiki/Kallikratis_Programme)), so if you find any mistakes feel free to contribute either with a PR and / or with an issue.

For `schema` information please find information above.

The method dealing with the Postal codes is listed below:

- [**GeoUtils.findByPostalCode()**](#findByPostalCode)

## API

### GeoUtils.getAdministrativeRegions()<a id='getAdministrativeRegions'></a>

**Description**: Retrieves administrative regions data.

**Parameters:**

**options**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the administrative regions data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("region", "unit", or "municipality").

**`Return Type`**: Array of `Region` objects.

---

### GeoUtils.getAdministrativeRegionById()<a id='getAdministrativeRegionById'></a>

**Description**: Retrieves a single administrative region's data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the administrative region.
- **`locale`** (optional, default: "el"): The locale for the administrative region data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("region", "unit", or "municipality").

**`Return Type`**: A `Region` object.

---

### GeoUtils.getAdministrativeRegionByIsoCode()<a id='getAdministrativeRegionByIsoCode'></a>

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

### GeoUtils.getAdministrativeUnits()<a id='getAdministrativeUnits'></a>

**Description**: Retrieves regional units data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the administrative units data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("unit" or "municipality").

**`Return Type`**: Array of `Unit` objects.

---

### GeoUtils.getAdministrativeUnitById()<a id='getAdministrativeUnitById'></a>

**Description**: Retrieves a regional unit (`Unit`) by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the administrative unit.
- **`locale`** (optional, default: "el"): The locale for the administrative unit data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos region.
- **`level`** (optional, default: "municipality"): The level of detail to retrieve ("unit" or "municipality").

**Return Type**: A `Unit` object.

---

### GeoUtils.getMunicipalities()<a id='getMunicipalities'></a>

**Description**: Retrieves municipality data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the municipality data ("el" for Greek, "en" for English).

**Return Type**: Array of `Municipality` objects.

---

### GeoUtils.getGeographicRegions()<a id='getGeographicRegions'></a>

**Description**: Retrieves geographic regions data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the geographic regions data ("el" for Greek, "en" for English).

**Return Type**: Array of `GeographicRegion` objects.

---

### GeoUtils.getGeographicRegionById()<a id='getGeographicRegionById'></a>

**Description**: Retrieves a geographic region by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the geographic region.
- **`locale`** (optional, default: "el"): The locale for the geographic region data ("el" for Greek, "en" for English).

**Return Type**: A `GeographicRegion` object.

---

### GeoUtils.getPrefectures()<a id='getPrefectures'></a>

**Description**: Retrieves prefectures data.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the prefectures data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos prefecture.

**Return Type**: Array of `Prefecture` objects.

---

### GeoUtils.getPrefectureById()<a id='getPrefectureById'></a>

**Description**: Retrieves a prefecture by its ID.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`id`**: The ID of the prefecture.
- **`locale`** (optional, default: "el"): The locale for the prefecture data ("el" for Greek, "en" for English).
- **`includeMountAthos`** (optional, default: false): Whether to include Mount Athos prefecture.

**Return Type**: A `Prefecture` object.

---

### GeoUtils.findByPostalCode()<a id='findByPostalCode'></a>

**Description**: Finds geographic entities (prefecture, region, or unit) by postal code.

**Parameters:**

**`postalCode`**: The postal code to search for.

**`options`** (optional): An object specifying additional options for retrieval.

- **`locale`** (default: "el"): The locale for the retrieved entity.
- **`entity`** (default: "prefecture"): The type of entity to retrieve ("prefecture", "region", or "unit").

**Return Type**: The corresponding geographic entity (`Prefecture`, `Region`, or `Unit`) or undefined if not found.
