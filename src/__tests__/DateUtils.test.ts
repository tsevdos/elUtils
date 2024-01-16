import datesData from "../../data/dates.json";
import { DateUtils } from "../DateUtils";

describe("Date singleton object", () => {
  describe("getDays", () => {
    it("in full format (greek language)", () => {
      const expectedData = datesData.days.el.full;

      expect(DateUtils.getDays()).toBe(expectedData);
      expect(DateUtils.getDays({ locale: "el" })).toBe(expectedData);
      expect(DateUtils.getDays({ format: "full" })).toBe(expectedData);
      expect(DateUtils.getDays({ locale: "el", format: "full" })).toBe(expectedData);
    });

    it("in short format (greek language)", () => {
      const expectedData = datesData.days.el.short;

      expect(DateUtils.getDays({ format: "short" })).toBe(expectedData);
      expect(DateUtils.getDays({ locale: "el", format: "short" })).toBe(expectedData);
    });

    it("in min format (greek language)", () => {
      const expectedData = datesData.days.el.min;

      expect(DateUtils.getDays({ format: "min" })).toBe(expectedData);
      expect(DateUtils.getDays({ locale: "el", format: "min" })).toBe(expectedData);
    });

    it("in full format (english language)", () => {
      const expectedData = datesData.days.en.full;

      expect(DateUtils.getDays({ locale: "en" })).toBe(expectedData);
      expect(DateUtils.getDays({ locale: "en", format: "full" })).toBe(expectedData);
    });

    it("in short format (english language)", () => {
      const expectedData = datesData.days.en.short;

      expect(DateUtils.getDays({ locale: "en", format: "short" })).toBe(expectedData);
    });

    it("in min format (english language)", () => {
      const expectedData = datesData.days.en.min;

      expect(DateUtils.getDays({ locale: "en", format: "min" })).toBe(expectedData);
    });
  });

  describe("getMonths", () => {
    it("in full format (greek language)", () => {
      const expectedData = datesData.months.el.full;

      expect(DateUtils.getMonths()).toBe(expectedData);
      expect(DateUtils.getMonths({ locale: "el" })).toBe(expectedData);
      expect(DateUtils.getMonths({ format: "full" })).toBe(expectedData);
      expect(DateUtils.getMonths({ locale: "el", format: "full" })).toBe(expectedData);
    });

    it("in alternative format (greek language)", () => {
      const expectedData = datesData.months.el.alternative;

      expect(DateUtils.getMonths({ format: "alternative" })).toBe(expectedData);
      expect(DateUtils.getMonths({ locale: "el", format: "alternative" })).toBe(expectedData);
    });

    it("in short format (greek language)", () => {
      const expectedData = datesData.months.el.short;

      expect(DateUtils.getMonths({ format: "short" })).toBe(expectedData);
      expect(DateUtils.getMonths({ locale: "el", format: "short" })).toBe(expectedData);
    });

    it("in min format (greek language)", () => {
      const expectedData = datesData.months.el.min;

      expect(DateUtils.getMonths({ format: "min" })).toBe(expectedData);
      expect(DateUtils.getMonths({ locale: "el", format: "min" })).toBe(expectedData);
    });

    it("in full format (english language)", () => {
      const expectedData = datesData.months.en.full;

      expect(DateUtils.getMonths({ locale: "en" })).toBe(expectedData);
      expect(DateUtils.getMonths({ locale: "en", format: "full" })).toBe(expectedData);
    });

    it("in short format (english language)", () => {
      const expectedData = datesData.months.en.short;

      expect(DateUtils.getMonths({ locale: "en", format: "short" })).toBe(expectedData);
    });

    it("in min format (english language)", () => {
      const expectedData = datesData.months.en.min;

      expect(DateUtils.getMonths({ locale: "en", format: "min" })).toBe(expectedData);
    });
  });

  describe("getQuarters", () => {
    it("in full format (greek language)", () => {
      const expectedData = datesData.quarters.el.full;

      expect(DateUtils.getQuarters()).toBe(expectedData);
      expect(DateUtils.getQuarters({ locale: "el" })).toBe(expectedData);
      expect(DateUtils.getQuarters({ format: "full" })).toBe(expectedData);
      expect(DateUtils.getQuarters({ locale: "el", format: "full" })).toBe(expectedData);
    });

    it("in short format (greek language)", () => {
      const expectedData = datesData.quarters.el.short;

      expect(DateUtils.getQuarters({ format: "short" })).toBe(expectedData);
      expect(DateUtils.getQuarters({ locale: "el", format: "short" })).toBe(expectedData);
    });

    it("in full format (english language)", () => {
      const expectedData = datesData.quarters.en.full;

      expect(DateUtils.getQuarters({ locale: "en" })).toBe(expectedData);
      expect(DateUtils.getQuarters({ locale: "en", format: "full" })).toBe(expectedData);
    });

    it("in short format (english language)", () => {
      const expectedData = datesData.quarters.en.short;

      expect(DateUtils.getQuarters({ locale: "en", format: "short" })).toBe(expectedData);
    });
  });

  describe("getEras", () => {
    it("in full format (greek language)", () => {
      const expectedData = datesData.eras.el.full;

      expect(DateUtils.getEras()).toBe(expectedData);
      expect(DateUtils.getEras({ locale: "el" })).toBe(expectedData);
      expect(DateUtils.getEras({ format: "full" })).toBe(expectedData);
      expect(DateUtils.getEras({ locale: "el", format: "full" })).toBe(expectedData);
    });

    it("in short format (greek language)", () => {
      const expectedData = datesData.eras.el.short;

      expect(DateUtils.getEras({ format: "short" })).toBe(expectedData);
      expect(DateUtils.getEras({ locale: "el", format: "short" })).toBe(expectedData);
    });

    it("in full format (english language)", () => {
      const expectedData = datesData.eras.en.full;

      expect(DateUtils.getEras({ locale: "en" })).toBe(expectedData);
      expect(DateUtils.getEras({ locale: "en", format: "full" })).toBe(expectedData);
    });

    it("in short format (english language)", () => {
      const expectedData = datesData.eras.en.short;

      expect(DateUtils.getEras({ locale: "en", format: "short" })).toBe(expectedData);
    });
  });
});
