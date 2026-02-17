import { erasData, getEras } from "./getEras";

describe("getEras", () => {
  it("in full format (greek language)", () => {
    const expectedData = erasData.el.full;

    expect(getEras()).toEqual(expectedData);
    expect(getEras({ locale: "el" })).toEqual(expectedData);
    expect(getEras({ format: "full" })).toEqual(expectedData);
    expect(getEras({ locale: "el", format: "full" })).toEqual(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = erasData.el.short;

    expect(getEras({ format: "short" })).toEqual(expectedData);
    expect(getEras({ locale: "el", format: "short" })).toEqual(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = erasData.en.full;

    expect(getEras({ locale: "en" })).toEqual(expectedData);
    expect(getEras({ locale: "en", format: "full" })).toEqual(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = erasData.en.short;

    expect(getEras({ locale: "en", format: "short" })).toEqual(expectedData);
  });
});
