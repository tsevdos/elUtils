import { prefectures, prefecturesWithMountAthos, Prefecture } from "../../data/geospatial";
import { getPrefectures, getPrefectureById, getPrefectureByIsoCode } from "./prefectures";

// alias types (for les typing)
type TP = Prefecture;

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
    expect(getPrefectures().includes(getPrefectureById({ id }) as TP)).toBe(true);
    expect(getPrefectures().includes(getPrefectureById({ id, locale: "el" }) as TP)).toBe(true);
    expect(getPrefectures().includes(getPrefectureById({ id, includeMountAthos: false }) as TP)).toBe(true);
    expect(getPrefectures().includes(getPrefectureById({ id, locale: "el", includeMountAthos: false }) as TP)).toBe(
      true,
    );
  });

  test.each(prefectureIdsInGreekIncludingMountAthos)(
    "get prefecture with id %i, including Mount Athos (in greek language)",
    (id) => {
      expect(
        getPrefectures({ includeMountAthos: true }).includes(getPrefectureById({ id, includeMountAthos: true }) as TP),
      ).toBe(true);
      expect(
        getPrefectures({ includeMountAthos: true }).includes(
          getPrefectureById({ id, locale: "el", includeMountAthos: true }) as TP,
        ),
      ).toBe(true);
    },
  );

  test.each(prefectureIdsInEnglish)("get prefecture with id %i (in english language)", (id) => {
    expect(getPrefectures({ locale: "en" }).includes(getPrefectureById({ id, locale: "en" }) as TP)).toBe(true);
    expect(
      getPrefectures({ locale: "en" }).includes(
        getPrefectureById({ id, locale: "en", includeMountAthos: false }) as TP,
      ),
    ).toBe(true);
  });

  test.each(prefectureIdsInEnglishIncludingMountAthos)(
    "get prefecture with id %i, including Mount Athos (in english language)",
    (id) => {
      expect(
        getPrefectures({ locale: "en", includeMountAthos: true }).includes(
          getPrefectureById({ id, locale: "en", includeMountAthos: true }) as TP,
        ),
      ).toBe(true);
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
    expect(getPrefectures().includes(getPrefectureByIsoCode({ isoCode }) as TP)).toBe(true);
    expect(getPrefectures().includes(getPrefectureByIsoCode({ isoCode, locale: "el" }) as TP)).toBe(true);
    expect(getPrefectures().includes(getPrefectureByIsoCode({ isoCode, includeMountAthos: false }) as TP)).toBe(true);
    expect(
      getPrefectures().includes(getPrefectureByIsoCode({ isoCode, locale: "el", includeMountAthos: false }) as TP),
    ).toBe(true);
  });

  test.each(prefectureIsoCodesInGreekIncludingMountAthos)(
    "get prefecture with iso31662 code %s, including Mount Athos (in greek language)",
    (isoCode) => {
      expect(
        getPrefectures({ includeMountAthos: true }).includes(
          getPrefectureByIsoCode({ isoCode, includeMountAthos: true }) as TP,
        ),
      ).toBe(true);
      expect(
        getPrefectures({ includeMountAthos: true }).includes(
          getPrefectureByIsoCode({ isoCode, locale: "el", includeMountAthos: true }) as TP,
        ),
      ).toBe(true);
    },
  );

  test.each(prefectureIsoCodesInEnglish)("get prefecture with iso31662 code %s (in english language)", (isoCode) => {
    expect(getPrefectures({ locale: "en" }).includes(getPrefectureByIsoCode({ isoCode, locale: "en" }) as TP)).toBe(
      true,
    );
    expect(
      getPrefectures({ locale: "en" }).includes(
        getPrefectureByIsoCode({ isoCode, locale: "en", includeMountAthos: false }) as TP,
      ),
    ).toBe(true);
  });

  test.each(prefectureIsoCodesInEnglishIncludingMountAthos)(
    "get prefecture with iso31662 code %s, including Mount Athos (in english language)",
    (isoCode) => {
      expect(
        getPrefectures({ locale: "en", includeMountAthos: true }).includes(
          getPrefectureByIsoCode({ isoCode, locale: "en", includeMountAthos: true }) as TP,
        ),
      ).toBe(true);
    },
  );
});
