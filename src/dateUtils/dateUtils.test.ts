import datesData from "./dates.json";
import { getEras, getHolidays } from "./dateUtils";

describe("getEras", () => {
  it("in full format (greek language)", () => {
    const expectedData = datesData.eras.el.full;

    expect(getEras()).toBe(expectedData);
    expect(getEras({ locale: "el" })).toBe(expectedData);
    expect(getEras({ format: "full" })).toBe(expectedData);
    expect(getEras({ locale: "el", format: "full" })).toBe(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = datesData.eras.el.short;

    expect(getEras({ format: "short" })).toBe(expectedData);
    expect(getEras({ locale: "el", format: "short" })).toBe(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = datesData.eras.en.full;

    expect(getEras({ locale: "en" })).toBe(expectedData);
    expect(getEras({ locale: "en", format: "full" })).toBe(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = datesData.eras.en.short;

    expect(getEras({ locale: "en", format: "short" })).toBe(expectedData);
  });
});

describe("getHolidays", () => {
  // Test for a year with known fixed and movable holiday dates
  it("returns correct Greek holidays for a specific year (greek language)", () => {
    const year = "2023";
    const holidays = getHolidays(year);

    // Expected holidays for the year 2023 - this is a sample and might need adjustments based on accurate holiday dates
    const expectedHolidays = [
      { date: "2023-01-01", name: "Πρωτοχρονιά" },
      { date: "2023-01-06", name: "Θεοφάνεια" },
      { date: "2023-02-27", name: "Καθαρά Δευτέρα" },
      { date: "2023-03-25", name: "Ευαγγελισμός της Θεοτόκου" },
      { date: "2023-04-14", name: "Μεγάλη Παρασκευή" },
      { date: "2023-04-17", name: "Δευτέρα του Πάσχα" },
      { date: "2023-05-01", name: "Εργατική Πρωτομαγιά" },
      { date: "2023-06-05", name: "Αγίου Πνεύματος" },
      { date: "2023-08-15", name: "Κοίμηση της Θεοτόκου" },
      { date: "2023-10-28", name: "Ημέρα του Όχι" },
      { date: "2023-12-25", name: "Χριστούγεννα" },
      { date: "2023-12-26", name: "Επόμενη των Χριστουγέννων" },
    ];

    expect(holidays).toEqual(expectedHolidays);
  });

  it("returns correct Greek holidays for a specific year (english language)", () => {
    const year = "2023";
    const holidays = getHolidays(year, { locale: "en" });

    // Expected holidays for the year 2023 - this is a sample and might need adjustments based on accurate holiday dates
    const expectedHolidays = [
      { date: "2023-01-01", name: "New Year's Day" },
      { date: "2023-01-06", name: "Epiphany" },
      { date: "2023-02-27", name: "Clean Monday" },
      { date: "2023-03-25", name: "Annunciation" },
      { date: "2023-04-14", name: "Good Friday" },
      { date: "2023-04-17", name: "Easter Monday" },
      { date: "2023-05-01", name: "Labour Day" },
      { date: "2023-06-05", name: "Pentecost" },
      { date: "2023-08-15", name: "Assumption of Mary" },
      { date: "2023-10-28", name: "Ohi Day" },
      { date: "2023-12-25", name: "Christmas Day" },
      { date: "2023-12-26", name: "Boxing Day" },
    ];

    expect(holidays).toEqual(expectedHolidays);
  });

  // Add more tests
  // Additional tests can be designed to cover edge cases, such as:
  // - Leap years
  // - Years where Labor Day coincides with Easter or falls on a weekend
  // - Future or past years with different holiday dates
});
