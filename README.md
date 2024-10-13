# elUtils

> elUtils is a library that contains convenient, easy-to-use, and lightweight utility functions that solve many problems we face daily when building applications for Greek businesses.

## Description

elUtils is a **zero-dependency** modern package, written in TypeScript, strongly-typed, that solves various geolocation, validation, and date-related issues by providing a broad collection of easy to use functions.

Check all the [available functions here](#api) (by module category).

## Installation

```shell
# npm
npm install @tsevdos/el-utils
# or yarn
yarn add @tsevdos/el-utils
# or pnpm
pnpm add @tsevdos/el-utils
```

## Usage

To use one of the available utility functions, you just need to import it (example below):

```js
// esm
import { getAdministrativeRegions, getDays, ... } from "@tsevdos/el-utils";
// cjs
const { getAdministrativeRegions, getDays, ... } = require("@tsevdos/el-utils");

console.log(getAdministrativeRegions());
```

## Demo

Check **all the available functions** on this [**code sandbox**](https://codesandbox.io/p/sandbox/elutils-demo-r8sphg).

## API<a id='api'></a>

The library is currently split into the following modules:

- [**`geoUtils`**](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md)

  - [getAdministrativeRegions()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getAdministrativeRegions)
  - [getAdministrativeRegionById()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getAdministrativeRegionById)
  - [getAdministrativeRegionByIsoCode()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getAdministrativeRegionByIsoCode)
  - [getAdministrativeUnits()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getAdministrativeUnits)
  - [getAdministrativeUnitById()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getAdministrativeUnitById)
  - [getMunicipalities()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getMunicipalities)
  - [getCities()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getCities)
  - [searchCityByName()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#searchCityByName)
  - [getCityById()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getCityById)
  - [getCityAdministrativeDivision()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getCityAdministrativeDivision)
  - [getGeographicRegions()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getGeographicRegions)
  - [getGeographicRegionById()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getGeographicRegionById)
  - [getPrefectures()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getPrefectures)
  - [getPrefectureById()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getPrefectureById)
  - [getAllPostalCodes()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getAllPostalCodes)
  - [findByPostalCode()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#findByPostalCode)
  - [getAllTaxOffices()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getAllTaxOffices)
  - [getTaxOfficeById()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getTaxOfficeById)
  - [getTaxOfficesByRegionId()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getTaxOfficesByRegionId)
  - [getTaxOfficesByUnitId()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getTaxOfficesByUnitId)
  - [getTaxOfficesByMunicipalityId()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getTaxOfficesByMunicipalityId)
  - [getTaxOfficesByPostalCode()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#getTaxOfficesByPostalCode)
  - [searchTaxOffice()](https://github.com/tsevdos/elUtils/blob/main/docs/geoUtils.md#searchTaxOffice)

- [**`validationUtils`**](https://github.com/tsevdos/elUtils/blob/main/docs/validationUtils.md)

  - [validatePostalCode()](https://github.com/tsevdos/elUtils/blob/main/docs/validationUtils.md#validatePostalCode)
  - [validateAMKA()](https://github.com/tsevdos/elUtils/blob/main/docs/validationUtils.md#validateAMKA)

- [**`dateUtils`**](https://github.com/tsevdos/elUtils/blob/main/docs/dateUtils.md)

  - [getDays()](https://github.com/tsevdos/elUtils/blob/main/docs/dateUtils.md#getDays)
  - [getMonths()](https://github.com/tsevdos/elUtils/blob/main/docs/dateUtils.md#getMonths)
  - [getQuarters()](https://github.com/tsevdos/elUtils/blob/main/docs/dateUtils.md#getQuarters)
  - [getEras()](https://github.com/tsevdos/elUtils/blob/main/docs/dateUtils.md#getEras)
  - [getHolidays()](https://github.com/tsevdos/elUtils/blob/main/docs/dateUtils.md#getHolidays)

- [**`formatUtils`**](https://github.com/tsevdos/elUtils/blob/main/docs/formatUtils.md)

  - [formatWeight()](https://github.com/tsevdos/elUtils/blob/main/docs/formatUtils.md#formatWeight)

## Contribute

See the [Contributing guide](https://github.com/tsevdos/elUtils/blob/main/CONTRIBUTING.md).

If you like the project but just don't have time to contribute, that's fine. There are other easy ways to support it and show your appreciation, which we would also be very happy about:

- Star the project
- Tweet about it
- Refer this project in your project's readme
- Mention the project at local meetups and tell your friends/colleagues

## License

MIT© [John Tsevdos](https://tsevdos.me)
