import { getQuarters, quartersData } from "./getQuarters";

describe("getQuarters", () => {
  it("in full format (greek language)", () => {
    const expectedData = quartersData.el.full;

    expect(getQuarters()).toEqual(expectedData);
    expect(getQuarters({ locale: "el" })).toEqual(expectedData);
    expect(getQuarters({ format: "full" })).toEqual(expectedData);
    expect(getQuarters({ locale: "el", format: "full" })).toEqual(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = quartersData.el.short;

    expect(getQuarters({ format: "short" })).toEqual(expectedData);
    expect(getQuarters({ locale: "el", format: "short" })).toEqual(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = quartersData.en.full;

    expect(getQuarters({ locale: "en" })).toEqual(expectedData);
    expect(getQuarters({ locale: "en", format: "full" })).toEqual(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = quartersData.en.short;

    expect(getQuarters({ locale: "en", format: "short" })).toEqual(expectedData);
  });
});
