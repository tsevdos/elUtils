import { daysData, getDays } from "./getDays";

describe("getDays", () => {
  it("in full format (greek language)", () => {
    const expectedData = daysData.el.full;

    expect(getDays()).toBe(expectedData);
    expect(getDays({ locale: "el" })).toBe(expectedData);
    expect(getDays({ format: "full" })).toBe(expectedData);
    expect(getDays({ locale: "el", format: "full" })).toBe(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = daysData.el.short;

    expect(getDays({ format: "short" })).toBe(expectedData);
    expect(getDays({ locale: "el", format: "short" })).toBe(expectedData);
  });

  it("in min format (greek language)", () => {
    const expectedData = daysData.el.min;

    expect(getDays({ format: "min" })).toBe(expectedData);
    expect(getDays({ locale: "el", format: "min" })).toBe(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = daysData.en.full;

    expect(getDays({ locale: "en" })).toBe(expectedData);
    expect(getDays({ locale: "en", format: "full" })).toBe(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = daysData.en.short;

    expect(getDays({ locale: "en", format: "short" })).toBe(expectedData);
  });

  it("in min format (english language)", () => {
    const expectedData = daysData.en.min;

    expect(getDays({ locale: "en", format: "min" })).toBe(expectedData);
  });
});
