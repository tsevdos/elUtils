# DateUtils

> The **`dateUtils`** module provides functions for retrieving date-related data such as days, months, quarters, and eras.

## Table of Contents

- [**getDays()**](#getDays)
- [**getMonths()**](#getMonths)
- [**getQuarters()**](#getQuarters)
- [**getEras()**](#getEras)
- [**getHolidays()**](#getHolidays)

---

### getDays()<a id='getDays'></a>

**Description**: Retrieves an array of localized day names.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the day names ("el" for Greek, "en" for English).
- **`format`** (optional, default: "full"): The format of the day names ("full", "short", or "min").

## **Return Type**: Array of day names based on the specified format.

---

### getMonths()<a id='getMonths'></a>

**Description**: Retrieves an array of localized month names.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the month names ("el" for Greek, "en" for English).
- **`format`** (optional, default: "full"): The format of the month names ("full", "short", "min", or "alternative").

**Return Type**: Array of month names based on the specified format.

---

### getQuarters()<a id='getQuarters'></a>

**Description**: Retrieves an array of localized quarter names.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the quarter names ("el" for Greek, "en" for English).
- **`format`** (optional, default: "full"): The format of the quarter names ("full", "short", or "min").

**Return Type**: Array of quarter names based on the specified format.

---

### getEras()<a id='getEras'></a>

**Description**: Retrieves an array of localized era names.

**Parameters:**

**`options`**: An object specifying the options for retrieval.

- **`locale`** (optional, default: "el"): The locale for the era names ("el" for Greek, "en" for English).
- **`format`** (optional, default: "full"): The format of the era names ("full", "short", or "min").

**Return Type**: Array of era names based on the specified format.

---

### getHolidays()<a id='getHolidays'></a>

**Description**: Retrieves an array of Greek holidays.

**Parameters:**

To update the `dateUtils.md` documentation to include the `getHolidays` function, you'd want to ensure that it provides users with a clear understanding of what the function does, how to use it, and what kind of output they should expect. Here's a suggested update for the documentation:

---

# Date Utilities (`dateUtils`)

The `dateUtils` module provides a collection of functions designed to assist with date-related operations. This module now includes functionality to retrieve Greek holidays for a given year, enhancing its utility for applications targeting Greek locales or observing Greek holidays.

## `getHolidays(year: string): Holiday[]`

Retrieves both fixed and movable Greek holidays for a specified year.

**Parameters:**

- `year`: A string representing the year for which to fetch Greek holidays.

### Returns

An array of `Holiday` objects where each `Holiday` object includes:
- `date`: A string representing the date of the holiday in the format `YYYY-MM-DD`.
- `name`: The name of the holiday in Greek.

### Usage Example

```typescript
import { getHolidays } from "@tsevdos/el-utils/src/dateUtils";

// Fetch Greek holidays for the year 2023
const holidays2023 = getHolidays("2023");

holidays2023.forEach(holiday => {
  console.log(`Date: ${holiday.date}, Name: ${holiday.name}`);
});
```

### Output

The output is an array of `Holiday` objects. Here's an example output for the year 2023 (note: this is a sample and might not include all holidays or accurate dates):

```plaintext
Date: 2023-01-01, Name: Πρωτοχρονιά
Date: 2023-01-06, Name: Θεοφάνεια
Date: 2023-03-25, Name: Ευαγγελισμός της Θεοτόκου
Date: 2023-04-17, Name: Δευτέρα του Πάσχα
Date: 2023-05-01, Name: Εργατική Πρωτομαγιά
...
```

This function is particularly useful for applications that require knowledge of Greek holidays, such as scheduling systems, calendars, or cultural/educational tools. By providing both fixed and movable holidays, it offers comprehensive support for observing Greek traditions and official holidays.

