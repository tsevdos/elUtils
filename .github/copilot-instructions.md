# GitHub Copilot Instructions for elUtils

## Project Overview

elUtils (`@tsevdos/el-utils`) is a zero-dependency TypeScript utility library providing convenient functions for Greek-specific business operations. The library focuses on geolocation, validation, date handling, formatting, and language utilities for Greek applications.

## Core Principles

1. **Zero Dependencies**: Do not suggest or add any external dependencies
2. **Type Safety**: All code must be strongly-typed using TypeScript
3. **Pure Functions**: Functions should be pure, with no side effects
4. **Immutability**: Never mutate input parameters or data structures
5. **Bilingual Support**: Support both Greek (`el`) and English (`en`) locales where applicable
6. **Comprehensive Testing**: Every function must have corresponding Vitest tests

## Project Structure

```
src/
├── dateUtils.ts         # Date-related utilities (days, months, holidays, etc.)
├── formatUtils.ts       # Formatting utilities (weights, etc.)
├── geoUtils.ts          # Geographic/geolocation utilities (cities, regions, postal codes)
├── languageUtils.ts     # Greek language utilities (text comparison, normalization)
├── validationUtils.ts   # Validation utilities (VAT, AMKA, postal codes, phones)
├── types.ts             # TypeScript type definitions
└── __tests__/           # Jest test files
```

## Coding Standards

### Function Structure

1. **JSDoc Comments**: Every exported function must have JSDoc documentation with:
   - Clear description
   - `@param` tags for all parameters with types and descriptions
   - `@returns` tag describing the return value
   - `@example` tags when helpful
   - Links to external references when applicable (e.g., validation algorithms)

Example:

```typescript
/**
 * Validates the given postal code.
 *
 * @param {string} postalCode - The postal code to validate.
 *
 * @returns {boolean} `true` if the postal code is valid, `false` otherwise.
 */
export function validatePostalCode(postalCode: string): boolean {
  // implementation
}
```

2. **Options Pattern**: For functions with multiple parameters, use an options object with defaults:

```typescript
type FunctionOptions = {
  locale?: "el" | "en";
  format?: "full" | "short";
};

export function myFunction({ locale = "el", format = "full" }: FunctionOptions = {}) {
  // implementation
}
```

3. **Type Definitions**: Define types in `types.ts` and import them. Use descriptive type names.

4. **Data Imports**: Import JSON data from the `data/` directory at the top of files:

```typescript
import dataEl from "../data/data-el.json";
import dataEn from "../data/data-en.json";
```

### Naming Conventions

- **Functions**: Use camelCase with descriptive verbs (e.g., `validatePostalCode`, `getAdministrativeRegions`)
- **Types**: Use PascalCase (e.g., `Region`, `TaxOffice`, `City`)
- **Constants**: Use UPPER_SNAKE_CASE for constants (e.g., `MOUNT_ATHOS_REGION_ID`)
- **Locale Objects**: Use pattern `{ el: dataEl, en: dataEn } as const`

### Testing Standards

1. **Test File Location**: Place tests in `src/__tests__/` with pattern `[module].test.ts`
2. **Test Framework**: Use Vitest for all tests
3. **Test Structure**: Use `describe` blocks for each function and `it` blocks for specific cases
4. **Test Coverage**: Cover:
   - Valid inputs (multiple cases)
   - Invalid inputs (multiple edge cases)
   - Boundary conditions
   - Different locales when applicable
   - Different formats/options when applicable

Example:

```typescript
describe("validatePostalCode", () => {
  it("returns true on existing postal codes", () => {
    expect(validatePostalCode("17562")).toBe(true);
    expect(validatePostalCode("30005")).toBe(true);
  });

  it("returns false on not existing postal codes", () => {
    expect(validatePostalCode("12345")).toBe(false);
    expect(validatePostalCode("11111")).toBe(false);
  });
});
```

## Module-Specific Guidelines

### dateUtils.ts

- Return arrays of strings in the specified locale and format
- Support formats: `full`, `short`, `min` (and `alternative` for months)
- Default locale is `el`, default format is `full`
- Use the JSON data from `data/dates.json`
- Exported functions: `getDays`, `getMonths`, `getQuarters`, `getEras`, `getHolidays`

### formatUtils.ts

- Provide bilingual formatting for various units
- Support `full`, `full_single`, `short` formats
- Include international symbols when requested
- Use data from `data/weights.json`
- Exported functions: `formatWeight`

### geoUtils.ts

- Handle Greek administrative divisions: regions, units, municipalities, prefectures
- Special handling for Mount Athos (region ID 14, prefecture ID 55)
- Provide search functionality with Greek text normalization
- Support postal codes, cities, tax offices, and countries
- Always use the `convertsGreekTextToComparableUpperCase` helper for Greek text comparisons
- Exported functions: `getAdministrativeRegions`, `getAdministrativeRegionById`, `getAdministrativeRegionByIsoCode`, `getAdministrativeUnits`, `getAdministrativeUnitById`, `getMunicipalities`, `getCities`, `searchCityByName`, `getCityById`, `getCityAdministrativeDivision`, `getGeographicRegions`, `getGeographicRegionById`, `getPrefectures`, `getPrefectureById`, `getAllPostalCodes`, `findByPostalCode`, `getAllTaxOffices`, `getTaxOfficeById`, `getTaxOfficesByRegionId`, `getTaxOfficesByUnitId`, `getTaxOfficesByMunicipalityId`, `getTaxOfficesByPostalCode`, `searchTaxOffice`, `getCountries`, `searchCountryByName`, `getCountry`

### languageUtils.ts

- Handle Greek text normalization (accent removal, case conversion)
- Use the `GREEK_ACCENTED_CHARACTERS_REPLACEMENTS` map for accent removal
- Remove spaces and special characters for comparison
- Exported functions: `convertsGreekTextToComparableUpperCase`, `compareGreekStrings`

### validationUtils.ts

- Validate Greek-specific identifiers: VAT numbers, AMKA (social security), postal codes
- Validate phone numbers (mobile, landline, or both)
- Return boolean values
- Accept both string and number inputs where logical
- Include algorithm references in JSDoc when applicable
- Exported functions: `validatePostalCode`, `validateAMKA`, `validateVATNumber`, `isValidMobilePhone`, `isValidLandlinePhone`, `isValidPhone`

## Data Files

All data files are in JSON format in the `data/` directory:

- `administrative-regions-el.json` / `administrative-regions-en.json` - Administrative regions data
- `cities-el.json` / `cities-en.json` - Cities data
- `countries-el.json` / `countries-en.json` - Countries data
- `geographic-regions-el.json` / `geographic-regions-en.json` - Geographic regions data
- `prefectures-el.json` / `prefectures-en.json` - Prefectures data
- `taxOffices-el.json` / `taxOffices-en.json` - Tax offices data
- `dates.json` - Date-related data (days, months, quarters, eras, holidays)
- `weights.json` - Weight formatting data
- `postal-codes.json` - Postal codes data
- `area-codes.json` - Phone area codes data

**Guidelines:**

- Bilingual files use `-el.json` and `-en.json` suffixes
- Import as constants at module level
- Never modify data files directly in utility functions

## Exports

All public functions are re-exported from `src/index.ts`. When adding new functions:

1. Implement in the appropriate module file
2. Add to the module's exports
3. Add to `src/index.ts` exports
4. Update documentation in `docs/[module].md`

## Build & Quality Commands

- `npm run build` - Build the library with tsdown
- `npm run check` - Run all quality checks (TypeScript, oxlint, oxfmt, tests)
- `npm test` - Run Vitest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage reporting
- `npm run lint` - Run oxlint
- `npm run lint:fix` - Run oxlint with auto-fix
- `npm run format` - Check formatting with oxfmt
- `npm run format:fix` - Fix formatting with oxfmt
- `npm run tsc` - Check TypeScript types

## Contribution Workflow

1. Use Conventional Commits for commit messages
2. Add Vitest tests for all new functionality
3. Update relevant documentation in `docs/` directory
4. Run `npm run check` before submitting (runs TypeScript checks, oxlint, oxfmt, and tests)
5. Ensure zero dependencies are added
6. Use `npm run changeset` for version management
7. Build is done with tsdown (generates ESM and CJS formats)

## Common Patterns to Follow

### Locale Handling

```typescript
const data = {
  el: dataEl,
  en: dataEn,
} as const;

type Locale = "el" | "en";

function getData({ locale = "el" }: { locale?: Locale } = {}) {
  return data[locale];
}
```

### Array Filtering with Options

```typescript
function getItems({ includeSpecialCase = false }: Options = {}) {
  const baseData = includeSpecialCase ? allData : filteredData;
  return baseData;
}
```

### Search Functions

```typescript
export function searchByName(searchTerm: string, options: Options = {}): ResultType[] {
  const { locale = "el" } = options;
  const normalizedSearch = convertsGreekTextToComparableUpperCase(searchTerm);

  return data[locale].filter((item) =>
    convertsGreekTextToComparableUpperCase(item.name).includes(normalizedSearch)
  );
}
```

## What NOT to Do

- ❌ Do not add npm dependencies (this is a zero-dependency library)
- ❌ Do not mutate input parameters
- ❌ Do not use classes (use functional approach)
- ❌ Do not skip JSDoc comments
- ❌ Do not skip tests
- ❌ Do not use `any` type
- ❌ Do not modify JSON data files in functions
- ❌ Do not use external libraries for date/string manipulation
- ❌ Do not use Jest syntax (use Vitest instead)
- ❌ Do not use ESLint or Prettier (use oxlint and oxfmt instead)

## Questions to Ask Before Implementation

1. Does this function need to support both Greek and English locales?
2. Should it accept an options object with defaults?
3. What are all the edge cases that need testing?
4. Is there existing data in the `data/` directory to support this?
5. Does this follow the existing naming conventions?
6. Is the return type properly defined in `types.ts`?
