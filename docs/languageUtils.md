# LanguageUtils

The `LanguageUtils` module provides utility functions for handling Greek text. These functions help in normalizing Greek text by removing accents, spaces, and special characters, and converting the text to uppercase for comparison purposes.

## Table of Contents

- [convertsGreekTextToComparableUpperCase](#convertsgreektexttocomparableuppercase)
- [compareGreekStrings](#comparegreekstrings)

---

### convertsGreekTextToComparableUpperCase()<a id='convertsGreekTextToComparableUpperCase'></a>

**Description**: Removes accents, spaces, and special characters from the input string and converts it to uppercase (for easier comparison).

**Parameters:**

- **`input`** (`string`): The Greek text to be converted.

## **Return Type**: The normalized and uppercased string.

---

### compareGreekStrings()<a id='compareGreekStrings'></a>

**Description**: Compares two Greek strings by normalizing them (removing accents, spaces, and special characters) and converting them to uppercase.

**Parameters:**

- **`stringA`** (`string`): The first Greek string to compare.
- **`stringB`** (`string`): The second Greek string to compare.

## **Return Type**: `true` if the normalized strings are equal, `false` otherwise.
