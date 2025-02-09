# ValidationUtils

> The **`validationUtils`** module provides functions for validating various data (such as postal codes, AMKA, EFKA, AFM, etc.).

## Table of Contents

- [**validatePostalCode()**](#validatePostalCode)
- [**validateVATNumber()**](#validateVATNumber)
- [**validateAMKA()**](#validateAMKA)
- [**isValidMobilePhone()**](#isValidMobilePhone)
- [**isValidLandlinePhone()**](#isValidLandlinePhone)
- [**isValidPhone()**](#isValidPhone)

---

### validatePostalCode()<a id='validatePostalCode'></a>

**Description**: Validates a postal code.

**Parameters:**

- **`postalCode`**: The postal code to validate.

**Return Type**: Boolean indicating whether the postal code is valid.

---

### validateVATNumber()<a id='validateVATNumber'></a>

**Description**: Validates an a greek tax id / AFM (ΑΦΜ) .

**Parameters:**

- **`VATNumber`**: The VAT Number to validate.

**Return Type**: Boolean indicating whether the VAT Number is valid.

---

### validateAMKA()<a id='validateAMKA'></a>

**Description**: Validates an AMKA number.

**Parameters:**

- **`amka`**: The AMKA number to validate.

**Return Type**: Boolean indicating whether the AMKA number is valid.

---

### isValidMobilePhone()<a id='isValidMobilePhone'></a>

**Description**: Validates if a given phone number is a Greek mobile phone number.

**Parameters:**

- **`mobilePhone`**: The mobile phone number to validate.

**Return Type**: Boolean indicating whether the mobile phone number is valid.

---

### isValidLandlinePhone()<a id='isValidLandlinePhone'></a>

**Description**: Validates if a given phone number is a Greek landline number.

**Parameters:**

- **`landLinePhone`**: The landline phone number to validate.
- **`withPrefix`**: Indicates whether the phone number should include the country prefix.

**Return Type**: Boolean indicating whether the phone number is a valid Greek landline number.

---

### isValidPhone()<a id='isValidPhone'></a>

**Description**: Validates if a given phone number is either a Greek mobile or landline number.

**Parameters:**

- **`phone`**: The phone number to validate.

**Return Type**: Boolean indicating whether the phone number is a valid Greek mobile or landline number.
