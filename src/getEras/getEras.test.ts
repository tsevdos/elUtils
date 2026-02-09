import { erasData, getEras } from "./getEras";

describe("getEras", () => {
  it("in full format (greek language)", () => {
    const expectedData = erasData.el.full;

    expect(getEras()).toBe(expectedData);
    expect(getEras({ locale: "el" })).toBe(expectedData);
    expect(getEras({ format: "full" })).toBe(expectedData);
    expect(getEras({ locale: "el", format: "full" })).toBe(expectedData);
  });

  it("in short format (greek language)", () => {
    const expectedData = erasData.el.short;

    expect(getEras({ format: "short" })).toBe(expectedData);
    expect(getEras({ locale: "el", format: "short" })).toBe(expectedData);
  });

  it("in full format (english language)", () => {
    const expectedData = erasData.en.full;

    expect(getEras({ locale: "en" })).toBe(expectedData);
    expect(getEras({ locale: "en", format: "full" })).toBe(expectedData);
  });

  it("in short format (english language)", () => {
    const expectedData = erasData.en.short;

    expect(getEras({ locale: "en", format: "short" })).toBe(expectedData);
  });
});
