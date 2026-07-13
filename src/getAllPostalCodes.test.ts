import postalCodes from "./data/postal-codes.json";
import { getAllPostalCodes } from "./getAllPostalCodes";

describe("getAllPostalCodes", () => {
  it("correctly returns all available postal codes", () => {
    const expectedResult = postalCodes.flatMap(({ postalCodes }) => postalCodes);

    expect(getAllPostalCodes()).toEqual(expectedResult);
    expect(getAllPostalCodes().length).toBe(1290);
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
