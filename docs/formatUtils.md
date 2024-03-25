# FormatUtils

> The **`formatUtils`** module provides functions for formating data such as weight, speed, time, price, numbers, dates etc.

## Table of Contents

- [**formatWeight()**](#formatWeight)

---

### formatWeight()<a id='formatWeight'></a>

**Description**: Given a type of weight and a value it returns a string that handles the plural/single state.

**Parameters:**

**`value`**: The weight value as a number

**`options`**: An object specifying formating options.

- **`type`**: The type of weight(e.g. pounds, centigrams, kilograms etc.) you want to format.
- **`locale`** (optional, default: "el"): The locale for the type of weight("el" for Greek, "en" for English).
- **`format`** (optional, default: false): Whether to include Mount Athos region.
- **`withInternational`** (optional): Appends the International System of Units(SI) symbol at the end(e.g. 2 pounds (lb)).

**Return Type**: A string.
