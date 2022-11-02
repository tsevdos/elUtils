import { prefectures, prefecturesWithMountAthos } from "../../data/geospatial";
import { getPrefectures, getPrefectureById, getPrefectureByIsoCode } from "./prefectures";

describe("getPrefectures", () => {
  it("get all prefectures of Greece (in greek language)", () => {
    expect(getPrefectures()).toBe(prefectures.el);
    expect(getPrefectures({ locale: "el" })).toBe(prefectures.el);
    expect(getPrefectures({ includeMountAthos: false })).toBe(prefectures.el);
    expect(getPrefectures({ locale: "el", includeMountAthos: false })).toBe(prefectures.el);
    expect(getPrefectures().length).toBe(54);
  });

  it("get all prefectures of Greece including Mount Athos (in greek language)", () => {
    expect(getPrefectures({ includeMountAthos: true })).toBe(prefecturesWithMountAthos.el);
    expect(getPrefectures({ locale: "el", includeMountAthos: true })).toBe(prefecturesWithMountAthos.el);
    expect(getPrefectures({ includeMountAthos: true }).length).toBe(55);
  });

  it("get all prefectures of Greece (in english language)", () => {
    expect(getPrefectures({ locale: "en" })).toBe(prefectures.en);
    expect(getPrefectures({ locale: "en", includeMountAthos: false })).toBe(prefectures.en);
    expect(getPrefectures({ locale: "en" }).length).toBe(54);
  });

  it("get all prefectures of Greece including Mount Athos (in english language)", () => {
    expect(getPrefectures({ locale: "en", includeMountAthos: true })).toBe(prefecturesWithMountAthos.en);
    expect(getPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(55);
  });
});

describe("getPrefectureById", () => {
  const prefectureIdsInGreek = getPrefectures().map(({ id }) => id);
  const prefectureIdsInGreekIncludingMountAthos = getPrefectures({ includeMountAthos: true }).map(({ id }) => id);
  const prefectureIdsInEnglish = getPrefectures({ locale: "en" }).map(({ id }) => id);
  const prefectureIdsInEnglishIncludingMountAthos = getPrefectures({ locale: "en", includeMountAthos: true }).map(
    ({ id }) => id,
  );

  test.each(prefectureIdsInGreek)("get prefecture with id %i (in greek language)", (id) => {
    expect(getPrefectureById({ id })).toBe(getPrefectures().find((prefecture) => prefecture.id === id));
    expect(getPrefectureById({ id, locale: "el" })).toBe(getPrefectures().find((prefecture) => prefecture.id === id));
    expect(getPrefectureById({ id, includeMountAthos: false })).toBe(
      getPrefectures().find((region) => region.id === id),
    );
    expect(getPrefectureById({ id, locale: "el", includeMountAthos: false })).toBe(
      getPrefectures().find((region) => region.id === id),
    );
  });

  test.each(prefectureIdsInGreekIncludingMountAthos)(
    "get prefecture with id %i, including Mount Athos (in greek language)",
    (id) => {
      expect(getPrefectureById({ id, includeMountAthos: true })).toBe(
        getPrefectures({ includeMountAthos: true }).find((region) => region.id === id),
      );
      expect(getPrefectureById({ id, locale: "el", includeMountAthos: true })).toBe(
        getPrefectures({ includeMountAthos: true }).find((region) => region.id === id),
      );
    },
  );

  test.each(prefectureIdsInEnglish)("get prefecture with id %i (in english language)", (id) => {
    expect(getPrefectureById({ id, locale: "en" })).toBe(
      getPrefectures({ locale: "en" }).find((region) => region.id === id),
    );
    expect(getPrefectureById({ id, locale: "en", includeMountAthos: false })).toBe(
      getPrefectures({ locale: "en" }).find((region) => region.id === id),
    );
  });

  test.each(prefectureIdsInEnglishIncludingMountAthos)(
    "get prefecture with id %i, including Mount Athos (in english language)",
    (id) => {
      expect(getPrefectureById({ id, locale: "en", includeMountAthos: true })).toBe(
        getPrefectures({ locale: "en", includeMountAthos: true }).find((region) => region.id === id),
      );
    },
  );
});

describe("getPrefectureByIsoCode", () => {
  const prefectureIsoCodesInGreek = getPrefectures().map(({ iso31662 }) => iso31662);
  const prefectureIsoCodesInGreekIncludingMountAthos = getPrefectures({ includeMountAthos: true }).map(
    ({ iso31662 }) => iso31662,
  );
  const prefectureIsoCodesInEnglish = getPrefectures({ locale: "en" }).map(({ iso31662 }) => iso31662);
  const prefectureIsoCodesInEnglishIncludingMountAthos = getPrefectures({ locale: "en", includeMountAthos: true }).map(
    ({ iso31662 }) => iso31662,
  );

  test.each(prefectureIsoCodesInGreek)("get prefecture with iso31662 code %s (in greek language)", (isoCode) => {
    expect(getPrefectureByIsoCode({ isoCode })).toBe(
      getPrefectures().find((prefecture) => prefecture.iso31662 === isoCode),
    );
    expect(getPrefectureByIsoCode({ isoCode, locale: "el" })).toBe(
      getPrefectures().find((prefecture) => prefecture.iso31662 === isoCode),
    );
    expect(getPrefectureByIsoCode({ isoCode, includeMountAthos: false })).toBe(
      getPrefectures().find((region) => region.iso31662 === isoCode),
    );
    expect(getPrefectureByIsoCode({ isoCode, locale: "el", includeMountAthos: false })).toBe(
      getPrefectures().find((region) => region.iso31662 === isoCode),
    );
  });

  test.each(prefectureIsoCodesInGreekIncludingMountAthos)(
    "get prefecture with iso31662 code %s, including Mount Athos (in greek language)",
    (isoCode) => {
      expect(getPrefectureByIsoCode({ isoCode, includeMountAthos: true })).toBe(
        getPrefectures({ includeMountAthos: true }).find((region) => region.iso31662 === isoCode),
      );
      expect(getPrefectureByIsoCode({ isoCode, locale: "el", includeMountAthos: true })).toBe(
        getPrefectures({ includeMountAthos: true }).find((region) => region.iso31662 === isoCode),
      );
    },
  );

  test.each(prefectureIsoCodesInEnglish)("get prefecture with iso31662 code %s (in english language)", (isoCode) => {
    expect(getPrefectureByIsoCode({ isoCode, locale: "en" })).toBe(
      getPrefectures({ locale: "en" }).find((region) => region.iso31662 === isoCode),
    );
    expect(getPrefectureByIsoCode({ isoCode, locale: "en", includeMountAthos: false })).toBe(
      getPrefectures({ locale: "en" }).find((region) => region.iso31662 === isoCode),
    );
  });

  test.each(prefectureIsoCodesInEnglishIncludingMountAthos)(
    "get prefecture with iso31662 code %s, including Mount Athos (in english language)",
    (isoCode) => {
      expect(getPrefectureByIsoCode({ isoCode, locale: "en", includeMountAthos: true })).toBe(
        getPrefectures({ locale: "en", includeMountAthos: true }).find((region) => region.iso31662 === isoCode),
      );
    },
  );
});
