import { daysData, getDays } from "./getDays";

describe("getDays", () => {
  it("in full format (greek language)", () => {
    const expectedData = daysData.el.full;

    expect(getDays()).toEqual(expectedData);
    expect(getDays({ locale: "el" })).toEqual(expectedData);
    expect(getDays({ format: "full" })).toEqual(expectedData);
    expect(getDays({ locale: "el", format: "full" })).toEqual(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = daysData.el.short;

    expect(getDays({ format: "short" })).toEqual(expectedData);
    expect(getDays({ locale: "el", format: "short" })).toEqual(expectedData);
  });

  it("in min format (greek language)", () => {
    const expectedData = daysData.el.min;

    expect(getDays({ format: "min" })).toEqual(expectedData);
    expect(getDays({ locale: "el", format: "min" })).toEqual(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = daysData.en.full;

    expect(getDays({ locale: "en" })).toEqual(expectedData);
    expect(getDays({ locale: "en", format: "full" })).toEqual(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = daysData.en.short;

    expect(getDays({ locale: "en", format: "short" })).toEqual(expectedData);
  });

  it("in min format (english language)", () => {
    const expectedData = daysData.en.min;

    expect(getDays({ locale: "en", format: "min" })).toEqual(expectedData);
  });
});
