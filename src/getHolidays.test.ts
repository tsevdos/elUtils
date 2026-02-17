import { getHolidays } from "./getHolidays";

describe("getHolidays", () => {
  // Test for a year with known fixed and movable holiday dates
  it("returns correct Greek holidays for a specific year (greek language)", () => {
    const holidays = getHolidays("2023");

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

  it("returns correct Greek holidays for a specific year (greek language)", () => {
    const holidays = getHolidays("2026");

    const expectedHolidays = [
      { date: "2026-01-01", name: "Πρωτοχρονιά" },
      { date: "2026-01-06", name: "Θεοφάνεια" },
      { date: "2026-02-23", name: "Καθαρά Δευτέρα" },
      { date: "2026-03-25", name: "Ευαγγελισμός της Θεοτόκου" },
      { date: "2026-04-10", name: "Μεγάλη Παρασκευή" },
      { date: "2026-04-13", name: "Δευτέρα του Πάσχα" },
      { date: "2026-05-01", name: "Εργατική Πρωτομαγιά" },
      { date: "2026-06-01", name: "Αγίου Πνεύματος" },
      { date: "2026-08-15", name: "Κοίμηση της Θεοτόκου" },
      { date: "2026-10-28", name: "Ημέρα του Όχι" },
      { date: "2026-12-25", name: "Χριστούγεννα" },
      { date: "2026-12-26", name: "Επόμενη των Χριστουγέννων" },
    ];

    expect(holidays).toEqual(expectedHolidays);
  });

  it("returns correct Greek holidays for a specific year (english language)", () => {
    const holidays = getHolidays("2023", { locale: "en" });

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
