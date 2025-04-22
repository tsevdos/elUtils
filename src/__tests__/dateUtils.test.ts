import datesData from "../../data/dates.json";
import {
  DAY_IN_MS,
  getDays,
  getEras,
  getHolidays,
  getMonths,
  getQuarters,
  HOUR_IN_MS,
  MINUTE_IN_MS,
  MONTH_IN_MS,
  relativeTimeFormat,
  WEEK_IN_MS,
  YEAR_IN_MS,
} from "../dateUtils";

describe("getDays", () => {
  it("in full format (greek language)", () => {
    const expectedData = datesData.days.el.full;

    expect(getDays()).toBe(expectedData);
    expect(getDays({ locale: "el" })).toBe(expectedData);
    expect(getDays({ format: "full" })).toBe(expectedData);
    expect(getDays({ locale: "el", format: "full" })).toBe(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = datesData.days.el.short;

    expect(getDays({ format: "short" })).toBe(expectedData);
    expect(getDays({ locale: "el", format: "short" })).toBe(expectedData);
  });

  it("in min format (greek language)", () => {
    const expectedData = datesData.days.el.min;

    expect(getDays({ format: "min" })).toBe(expectedData);
    expect(getDays({ locale: "el", format: "min" })).toBe(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = datesData.days.en.full;

    expect(getDays({ locale: "en" })).toBe(expectedData);
    expect(getDays({ locale: "en", format: "full" })).toBe(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = datesData.days.en.short;

    expect(getDays({ locale: "en", format: "short" })).toBe(expectedData);
  });

  it("in min format (english language)", () => {
    const expectedData = datesData.days.en.min;

    expect(getDays({ locale: "en", format: "min" })).toBe(expectedData);
  });
});

describe("getMonths", () => {
  it("in full format (greek language)", () => {
    const expectedData = datesData.months.el.full;

    expect(getMonths()).toBe(expectedData);
    expect(getMonths({ locale: "el" })).toBe(expectedData);
    expect(getMonths({ format: "full" })).toBe(expectedData);
    expect(getMonths({ locale: "el", format: "full" })).toBe(expectedData);
  });

  it("in alternative format (greek language)", () => {
    const expectedData = datesData.months.el.alternative;

    expect(getMonths({ format: "alternative" })).toBe(expectedData);
    expect(getMonths({ locale: "el", format: "alternative" })).toBe(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = datesData.months.el.short;

    expect(getMonths({ format: "short" })).toBe(expectedData);
    expect(getMonths({ locale: "el", format: "short" })).toBe(expectedData);
  });

  it("in min format (greek language)", () => {
    const expectedData = datesData.months.el.min;

    expect(getMonths({ format: "min" })).toBe(expectedData);
    expect(getMonths({ locale: "el", format: "min" })).toBe(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = datesData.months.en.full;

    expect(getMonths({ locale: "en" })).toBe(expectedData);
    expect(getMonths({ locale: "en", format: "full" })).toBe(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = datesData.months.en.short;

    expect(getMonths({ locale: "en", format: "short" })).toBe(expectedData);
  });

  it("in min format (english language)", () => {
    const expectedData = datesData.months.en.min;

    expect(getMonths({ locale: "en", format: "min" })).toBe(expectedData);
  });
});

describe("getQuarters", () => {
  it("in full format (greek language)", () => {
    const expectedData = datesData.quarters.el.full;

    expect(getQuarters()).toBe(expectedData);
    expect(getQuarters({ locale: "el" })).toBe(expectedData);
    expect(getQuarters({ format: "full" })).toBe(expectedData);
    expect(getQuarters({ locale: "el", format: "full" })).toBe(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = datesData.quarters.el.short;

    expect(getQuarters({ format: "short" })).toBe(expectedData);
    expect(getQuarters({ locale: "el", format: "short" })).toBe(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = datesData.quarters.en.full;

    expect(getQuarters({ locale: "en" })).toBe(expectedData);
    expect(getQuarters({ locale: "en", format: "full" })).toBe(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = datesData.quarters.en.short;

    expect(getQuarters({ locale: "en", format: "short" })).toBe(expectedData);
  });
});

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

describe("relativeTimeFormat", () => {
  describe("seconds", () => {
    it("greek", () => {
      const a = new Date(0);
      const b = new Date(2000);
      const c = new Date(6000);
      const d = new Date(7000);

      const present = relativeTimeFormat(a, b);
      const future = relativeTimeFormat(d, a);
      const past = relativeTimeFormat(a, c);

      const outputPresent = "μόλις τώρα";
      const outputFuture = "σε 7 δευτερόλεπτα";
      const outputPast = "6 δευτερόλεπτα πριν";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(2000);
      const c = new Date(6000);
      const d = new Date(7000);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      const outputPresent = "just now";
      const outputFuture = "in 7 seconds";
      const outputPast = "6 seconds ago";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
  });
  describe("minutes", () => {
    it("greek", () => {
      const a = new Date(0);
      const b = new Date(2 * MINUTE_IN_MS);
      const c = new Date(6 * MINUTE_IN_MS);
      const d = new Date(7 * MINUTE_IN_MS);

      const present = relativeTimeFormat(a, b);
      const future = relativeTimeFormat(d, a);
      const past = relativeTimeFormat(a, c);

      const outputPresent = "2 λεπτά πριν";
      const outputFuture = "σε 7 λεπτά";
      const outputPast = "6 λεπτά πριν";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(2 * MINUTE_IN_MS);
      const c = new Date(6 * MINUTE_IN_MS);
      const d = new Date(7 * MINUTE_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      const outputPresent = "2 minutes ago";
      const outputFuture = "in 7 minutes";
      const outputPast = "6 minutes ago";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
  });
  describe("hours", () => {
    it("greek", () => {
      const a = new Date(0);
      const b = new Date(2 * HOUR_IN_MS);
      const c = new Date(6 * HOUR_IN_MS);
      const d = new Date(7 * HOUR_IN_MS);

      const present = relativeTimeFormat(a, b);
      const future = relativeTimeFormat(d, a);
      const past = relativeTimeFormat(a, c);

      const outputPresent = "2 ώρες πριν";
      const outputFuture = "σε 7 ώρες";
      const outputPast = "6 ώρες πριν";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(2 * HOUR_IN_MS);
      const c = new Date(6 * HOUR_IN_MS);
      const d = new Date(7 * HOUR_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      const outputPresent = "2 hours ago";
      const outputFuture = "in 7 hours";
      const outputPast = "6 hours ago";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
  });
  describe("days", () => {
    it("greek", () => {
      const a = new Date(0);
      const b = new Date(2 * DAY_IN_MS);
      const c = new Date(6 * DAY_IN_MS);
      // const d = new Date(7 * DAY_IN_MS);

      const present = relativeTimeFormat(a, b);
      // const future = relativeTimeFormat(d, a);
      const past = relativeTimeFormat(a, c);

      const outputPresent = "2 μέρες πριν";
      // const outputFuture = "se 7 meres";
      const outputPast = "6 μέρες πριν";

      expect(present).toEqual(outputPresent);
      // expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(2 * DAY_IN_MS);
      const c = new Date(6 * DAY_IN_MS);
      // const d = new Date(7 * DAY_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      // const future = relativeTimeFormat(d, a, {locale: 'en'});
      const past = relativeTimeFormat(a, c, { locale: "en" });

      const outputPresent = "2 days ago"; //
      // const outputFuture = "se 7 meres";
      const outputPast = "6 days ago"; //

      expect(present).toEqual(outputPresent);
      // expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
  });
  describe("weeks", () => {
    it("greek", () => {
      const a = new Date(0);
      const b = new Date(1 * WEEK_IN_MS);
      const c = new Date(2 * WEEK_IN_MS);
      const d = new Date(3 * WEEK_IN_MS);

      const present = relativeTimeFormat(a, b);
      const future = relativeTimeFormat(d, a);
      const past = relativeTimeFormat(a, c);

      const outputPresent = "1 εβδομάδα πριν";
      const outputFuture = "σε 3 εβδομάδες";
      const outputPast = "2 εβδομάδες πριν";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(1 * WEEK_IN_MS);
      const c = new Date(2 * WEEK_IN_MS);
      const d = new Date(3 * WEEK_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      const outputPresent = "1 week ago";
      const outputFuture = "in 3 weeks";
      const outputPast = "2 weeks ago";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
  });
  describe("months", () => {
    it("greek", () => {
      const a = new Date(0);
      const b = new Date(1 * MONTH_IN_MS);
      const c = new Date(2 * MONTH_IN_MS);
      const d = new Date(3 * MONTH_IN_MS);

      const present = relativeTimeFormat(a, b);
      const future = relativeTimeFormat(d, a);
      const past = relativeTimeFormat(a, c);

      const outputPresent = "1 μήνα πριν";
      const outputFuture = "σε 3 μήνες";
      const outputPast = "2 μήνες πριν";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(1 * MONTH_IN_MS);
      const c = new Date(2 * MONTH_IN_MS);
      const d = new Date(3 * MONTH_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      const outputPresent = "1 month ago";
      const outputFuture = "in 3 months";
      const outputPast = "2 months ago";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
  });
  describe("years", () => {
    it("greek", () => {
      const a = new Date(0);
      const b = new Date(1 * YEAR_IN_MS);
      const c = new Date(2 * YEAR_IN_MS);
      const d = new Date(3 * YEAR_IN_MS);

      const present = relativeTimeFormat(a, b);
      const future = relativeTimeFormat(d, a);
      const past = relativeTimeFormat(a, c);

      const outputPresent = "1 χρόνο πριν";
      const outputFuture = "σε 3 χρόνια";
      const outputPast = "2 χρόνια πριν";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(1 * YEAR_IN_MS);
      const c = new Date(2 * YEAR_IN_MS);
      const d = new Date(3 * YEAR_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      const outputPresent = "1 year ago";
      const outputFuture = "in 3 years";
      const outputPast = "2 years ago";

      expect(present).toEqual(outputPresent);
      expect(future).toEqual(outputFuture);
      expect(past).toEqual(outputPast);
    });
  });
});
