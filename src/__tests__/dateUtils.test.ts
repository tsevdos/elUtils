import datesData from "../../data/dates.json";
import { getDays, getMonths, getQuarters, getEras } from "../dateUtils";

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
