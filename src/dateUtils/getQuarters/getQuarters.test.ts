import { getQuarters, quartersData } from "./getQuarters";

describe("getQuarters", () => {
  it("in full format (greek language)", () => {
    const expectedData = quartersData.el.full;

    expect(getQuarters()).toBe(expectedData);
    expect(getQuarters({ locale: "el" })).toBe(expectedData);
    expect(getQuarters({ format: "full" })).toBe(expectedData);
    expect(getQuarters({ locale: "el", format: "full" })).toBe(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = quartersData.el.short;

    expect(getQuarters({ format: "short" })).toBe(expectedData);
    expect(getQuarters({ locale: "el", format: "short" })).toBe(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = quartersData.en.full;

    expect(getQuarters({ locale: "en" })).toBe(expectedData);
    expect(getQuarters({ locale: "en", format: "full" })).toBe(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = quartersData.en.short;

    expect(getQuarters({ locale: "en", format: "short" })).toBe(expectedData);
  });
});
