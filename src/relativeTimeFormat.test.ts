import {
  DAY_IN_MS,
  HOUR_IN_MS,
  MINUTE_IN_MS,
  MONTH_IN_MS,
  relativeTimeFormat,
  WEEK_IN_MS,
  YEAR_IN_MS,
} from "./relativeTimeFormat";

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

      expect(present).toEqual("μόλις τώρα");
      expect(future).toEqual("σε 7 δευτερόλεπτα");
      expect(past).toEqual("6 δευτερόλεπτα πριν");
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(2000);
      const c = new Date(6000);
      const d = new Date(7000);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      expect(present).toEqual("just now");
      expect(future).toEqual("in 7 seconds");
      expect(past).toEqual("6 seconds ago");
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

      expect(present).toEqual("2 λεπτά πριν");
      expect(future).toEqual("σε 7 λεπτά");
      expect(past).toEqual("6 λεπτά πριν");
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(2 * MINUTE_IN_MS);
      const c = new Date(6 * MINUTE_IN_MS);
      const d = new Date(7 * MINUTE_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      expect(present).toEqual("2 minutes ago");
      expect(future).toEqual("in 7 minutes");
      expect(past).toEqual("6 minutes ago");
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

      expect(present).toEqual("2 ώρες πριν");
      expect(future).toEqual("σε 7 ώρες");
      expect(past).toEqual("6 ώρες πριν");
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(2 * HOUR_IN_MS);
      const c = new Date(6 * HOUR_IN_MS);
      const d = new Date(7 * HOUR_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      expect(present).toEqual("2 hours ago");
      expect(future).toEqual("in 7 hours");
      expect(past).toEqual("6 hours ago");
    });
  });
  describe("days", () => {
    it("greek", () => {
      const a = new Date(0);
      const b = new Date(2 * DAY_IN_MS);
      const c = new Date(6 * DAY_IN_MS);

      const present = relativeTimeFormat(a, b);
      const past = relativeTimeFormat(a, c);

      expect(present).toEqual("2 μέρες πριν");
      expect(past).toEqual("6 μέρες πριν");
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(2 * DAY_IN_MS);
      const c = new Date(6 * DAY_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      expect(present).toEqual("2 days ago");
      expect(past).toEqual("6 days ago");
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

      expect(present).toEqual("1 εβδομάδα πριν");
      expect(future).toEqual("σε 3 εβδομάδες");
      expect(past).toEqual("2 εβδομάδες πριν");
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(1 * WEEK_IN_MS);
      const c = new Date(2 * WEEK_IN_MS);
      const d = new Date(3 * WEEK_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      expect(present).toEqual("1 week ago");
      expect(future).toEqual("in 3 weeks");
      expect(past).toEqual("2 weeks ago");
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

      expect(present).toEqual("1 μήνα πριν");
      expect(future).toEqual("σε 3 μήνες");
      expect(past).toEqual("2 μήνες πριν");
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(1 * MONTH_IN_MS);
      const c = new Date(2 * MONTH_IN_MS);
      const d = new Date(3 * MONTH_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      expect(present).toEqual("1 month ago");
      expect(future).toEqual("in 3 months");
      expect(past).toEqual("2 months ago");
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

      expect(present).toEqual("1 χρόνο πριν");
      expect(future).toEqual("σε 3 χρόνια");
      expect(past).toEqual("2 χρόνια πριν");
    });
    it("english", () => {
      const a = new Date(0);
      const b = new Date(1 * YEAR_IN_MS);
      const c = new Date(2 * YEAR_IN_MS);
      const d = new Date(3 * YEAR_IN_MS);

      const present = relativeTimeFormat(a, b, { locale: "en" });
      const future = relativeTimeFormat(d, a, { locale: "en" });
      const past = relativeTimeFormat(a, c, { locale: "en" });

      expect(present).toEqual("1 year ago");
      expect(future).toEqual("in 3 years");
      expect(past).toEqual("2 years ago");
    });
  });
});
