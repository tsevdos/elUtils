import { getAllPostalCodes } from "./getAllPostalCodes";

describe("getAllPostalCodes", () => {
  it("correctly returns all available postal codes", () => {
    const postalCodes = getAllPostalCodes();

    expect(postalCodes.length).toBe(1290);
    expect(postalCodes.slice(0, 3)).toEqual(["30021", "30027", "30100"]);
    expect(postalCodes).toContain("11526");
  });

  it("returns an array of strings", () => {
    const result = getAllPostalCodes();
    result.forEach((postalCode) => {
      expect(typeof postalCode).toBe("string");
    });
  });

  it("returns valid 5-digit postal codes", () => {
    const result = getAllPostalCodes();
    result.forEach((postalCode) => {
      expect(postalCode).toMatch(/^\d{5}$/);
    });
  });

  it("does not return empty strings", () => {
    const result = getAllPostalCodes();
    result.forEach((postalCode) => {
      expect(postalCode.length).toBeGreaterThan(0);
    });
  });
});
