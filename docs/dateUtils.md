# DateUtils

> The **`dateUtils`** module provides functions for retrieving date-related data such as days, months, quarters, and eras. It also includes a function for fetching Greek holidays for a specific year.

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
**`year`**: A string representing the year for which to fetch Greek holidays.

**Return Type**: An array of `Holiday` objects where each `Holiday` object includes:

- `date`: A string representing the date of the holiday in the format `YYYY-MM-DD`.
- `name`: The name of the holiday in Greek.
