import { getMonths, monthsData } from "./getMonths";

describe("getMonths", () => {
  it("in full format (greek language)", () => {
    const expectedData = monthsData.el.full;

    expect(getMonths()).toBe(expectedData);
    expect(getMonths({ locale: "el" })).toBe(expectedData);
    expect(getMonths({ format: "full" })).toBe(expectedData);
    expect(getMonths({ locale: "el", format: "full" })).toBe(expectedData);
  });

  it("in alternative format (greek language)", () => {
    const expectedData = monthsData.el.alternative;

    expect(getMonths({ format: "alternative" })).toBe(expectedData);
    expect(getMonths({ locale: "el", format: "alternative" })).toBe(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = monthsData.el.short;

    expect(getMonths({ format: "short" })).toBe(expectedData);
    expect(getMonths({ locale: "el", format: "short" })).toBe(expectedData);
  });

  it("in min format (greek language)", () => {
    const expectedData = monthsData.el.min;

    expect(getMonths({ format: "min" })).toBe(expectedData);
    expect(getMonths({ locale: "el", format: "min" })).toBe(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = monthsData.en.full;

    expect(getMonths({ locale: "en" })).toBe(expectedData);
    expect(getMonths({ locale: "en", format: "full" })).toBe(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = monthsData.en.short;

    expect(getMonths({ locale: "en", format: "short" })).toBe(expectedData);
  });

  it("in min format (english language)", () => {
    const expectedData = monthsData.en.min;

    expect(getMonths({ locale: "en", format: "min" })).toBe(expectedData);
  });
});
