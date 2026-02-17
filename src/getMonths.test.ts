import { getMonths, monthsData } from "./getMonths";

describe("getMonths", () => {
  it("in full format (greek language)", () => {
    const expectedData = monthsData.el.full;

    expect(getMonths()).toEqual(expectedData);
    expect(getMonths({ locale: "el" })).toEqual(expectedData);
    expect(getMonths({ format: "full" })).toEqual(expectedData);
    expect(getMonths({ locale: "el", format: "full" })).toEqual(expectedData);
  });

  it("in alternative format (greek language)", () => {
    const expectedData = monthsData.el.alternative;

    expect(getMonths({ format: "alternative" })).toEqual(expectedData);
    expect(getMonths({ locale: "el", format: "alternative" })).toEqual(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = monthsData.el.short;

    expect(getMonths({ format: "short" })).toEqual(expectedData);
    expect(getMonths({ locale: "el", format: "short" })).toEqual(expectedData);
  });

  it("in min format (greek language)", () => {
    const expectedData = monthsData.el.min;

    expect(getMonths({ format: "min" })).toEqual(expectedData);
    expect(getMonths({ locale: "el", format: "min" })).toEqual(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = monthsData.en.full;

    expect(getMonths({ locale: "en" })).toEqual(expectedData);
    expect(getMonths({ locale: "en", format: "full" })).toEqual(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = monthsData.en.short;

    expect(getMonths({ locale: "en", format: "short" })).toEqual(expectedData);
  });

  it("in min format (english language)", () => {
    const expectedData = monthsData.en.min;

    expect(getMonths({ locale: "en", format: "min" })).toEqual(expectedData);
  });
});
