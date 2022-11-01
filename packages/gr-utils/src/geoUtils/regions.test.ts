import {
  regionsWithPrefectures,
  regionsWithPrefecturesAndMountAthos,
  regions,
  regionsWithMountAthos,
} from "../../data/geospatial";
import {
  getRegionsWithPrefectures,
  getRegions,
  getRegionWithPrefecturesById,
  getRegionWithPrefecturesByIsoCode,
  getRegionById,
  getRegionByIsoCode,
} from "./regions";

describe("getRegionsWithPrefectures", () => {
  it("get all regions with prefectures of Greece (in greek language)", () => {
    expect(getRegionsWithPrefectures()).toBe(regionsWithPrefectures.el);
    expect(getRegionsWithPrefectures({ locale: "el" })).toBe(regionsWithPrefectures.el);
    expect(getRegionsWithPrefectures({ includeMountAthos: false })).toBe(regionsWithPrefectures.el);
    expect(getRegionsWithPrefectures({ locale: "el", includeMountAthos: false })).toBe(regionsWithPrefectures.el);
    expect(getRegionsWithPrefectures().length).toBe(13);
  });

  it("get all regions with prefectures of Greece including Mount Athos (in greek language)", () => {
    expect(getRegionsWithPrefectures({ includeMountAthos: true })).toBe(regionsWithPrefecturesAndMountAthos.el);
    expect(getRegionsWithPrefectures({ locale: "el", includeMountAthos: true })).toBe(
      regionsWithPrefecturesAndMountAthos.el,
    );
    expect(getRegionsWithPrefectures({ includeMountAthos: true }).length).toBe(14);
  });

  it("get all regions with prefectures of Greece (in english language)", () => {
    expect(getRegionsWithPrefectures({ locale: "en" })).toBe(regionsWithPrefectures.en);
    expect(getRegionsWithPrefectures({ locale: "en", includeMountAthos: false })).toBe(regionsWithPrefectures.en);
    expect(getRegionsWithPrefectures({ locale: "en" }).length).toBe(13);
  });

  it("get all regions with prefectures of Greece including Mount Athos (in english language)", () => {
    expect(getRegionsWithPrefectures({ locale: "en", includeMountAthos: true })).toBe(
      regionsWithPrefecturesAndMountAthos.en,
    );
    expect(getRegionsWithPrefectures({ locale: "en", includeMountAthos: true }).length).toBe(14);
  });
});

describe("getRegions", () => {
  it("get all regions of Greece (in greek language)", () => {
    expect(getRegions()).toBe(regions.el);
    expect(getRegions({ locale: "el" })).toBe(regions.el);
    expect(getRegions({ includeMountAthos: false })).toBe(regions.el);
    expect(getRegions({ locale: "el", includeMountAthos: false })).toBe(regions.el);
    expect(getRegions().length).toBe(13);
  });

  it("get all regions of Greece including Mount Athos (in greek language)", () => {
    expect(getRegions({ includeMountAthos: true })).toBe(regionsWithMountAthos.el);
    expect(getRegions({ locale: "el", includeMountAthos: true })).toBe(regionsWithMountAthos.el);
    expect(getRegions({ includeMountAthos: true }).length).toBe(14);
  });

  it("get all regions of Greece (in english language)", () => {
    expect(getRegions({ locale: "en" })).toBe(regions.en);
    expect(getRegions({ locale: "en", includeMountAthos: false })).toBe(regions.en);
    expect(getRegions({ locale: "en" }).length).toBe(13);
  });

  it("get all regions of Greece including Mount Athos (in english language)", () => {
    expect(getRegions({ locale: "en", includeMountAthos: true })).toBe(regionsWithMountAthos.en);
    expect(getRegions({ locale: "en", includeMountAthos: true }).length).toBe(14);
  });
});

describe("getRegionWithPrefecturesById", () => {
  const regionIdsInGreek = regionsWithPrefectures.el.map(({ id }) => id);
  const regionIdsInGreekIncludingMountAthos = regionsWithPrefecturesAndMountAthos.el.map(({ id }) => id);
  const regionIdsInEnglish = regionsWithPrefectures.en.map(({ id }) => id);
  const regionIdsInEnglishIncludingMountAthos = regionsWithPrefecturesAndMountAthos.en.map(({ id }) => id);

  test.each(regionIdsInGreek)("get region with id %i of Greece with its prefectures (in greek language)", (id) => {
    expect(getRegionWithPrefecturesById({ id })).toBe(regionsWithPrefectures.el.find((region) => region.id === id));
    expect(getRegionWithPrefecturesById({ id, locale: "el" })).toBe(
      regionsWithPrefectures.el.find((region) => region.id === id),
    );
    expect(getRegionWithPrefecturesById({ id, includeMountAthos: false })).toBe(
      regionsWithPrefectures.el.find((region) => region.id === id),
    );
    expect(getRegionWithPrefecturesById({ id, locale: "el", includeMountAthos: false })).toBe(
      regionsWithPrefectures.el.find((region) => region.id === id),
    );
  });

  test.each(regionIdsInGreekIncludingMountAthos)(
    "get region with id %i of Greece with its prefectures, including Mount Athos (in greek language)",
    (id) => {
      expect(getRegionWithPrefecturesById({ id, includeMountAthos: true })).toBe(
        regionsWithPrefecturesAndMountAthos.el.find((region) => region.id === id),
      );
      expect(getRegionWithPrefecturesById({ id, locale: "el", includeMountAthos: true })).toBe(
        regionsWithPrefecturesAndMountAthos.el.find((region) => region.id === id),
      );
    },
  );

  test.each(regionIdsInEnglish)("get region with id %i of Greece with its prefectures (in english language)", (id) => {
    expect(getRegionWithPrefecturesById({ id, locale: "en" })).toBe(
      regionsWithPrefectures.en.find((region) => region.id === id),
    );
    expect(getRegionWithPrefecturesById({ id, locale: "en", includeMountAthos: false })).toBe(
      regionsWithPrefectures.en.find((region) => region.id === id),
    );
  });

  test.each(regionIdsInEnglishIncludingMountAthos)(
    "get region with id %i of Greece with its prefectures, including Mount Athos (in english language)",
    (id) => {
      expect(getRegionWithPrefecturesById({ id, locale: "en", includeMountAthos: true })).toBe(
        regionsWithPrefecturesAndMountAthos.en.find((region) => region.id === id),
      );
    },
  );
});

describe("getRegionWithPrefecturesByIsoCode", () => {
  const regionIsoCodesInGreek = regions.el.map(({ iso31662 }) => iso31662);
  const regionIsoCodesInGreekIncludingMountAthos = regionsWithMountAthos.el.map(({ iso31662 }) => iso31662);
  const regionIsoCodesInEnglish = regions.en.map(({ iso31662 }) => iso31662);
  const regionIsoCodesInEnglishIncludingMountAthos = regionsWithMountAthos.en.map(({ iso31662 }) => iso31662);

  test.each(regionIsoCodesInGreek)(
    "get region with iso31662 code %s of Greece with its prefectures (in greek language)",
    (isoCode) => {
      expect(getRegionWithPrefecturesByIsoCode({ isoCode })).toBe(
        regionsWithPrefectures.el.find((region) => region.iso31662 === isoCode),
      );
      expect(getRegionWithPrefecturesByIsoCode({ isoCode, locale: "el" })).toBe(
        regionsWithPrefectures.el.find((region) => region.iso31662 === isoCode),
      );
      expect(getRegionWithPrefecturesByIsoCode({ isoCode, includeMountAthos: false })).toBe(
        regionsWithPrefectures.el.find((region) => region.iso31662 === isoCode),
      );
      expect(getRegionWithPrefecturesByIsoCode({ isoCode, locale: "el", includeMountAthos: false })).toBe(
        regionsWithPrefectures.el.find((region) => region.iso31662 === isoCode),
      );
    },
  );

  test.each(regionIsoCodesInGreekIncludingMountAthos)(
    "get region with iso31662 code %s of Greece with its prefectures, including Mount Athos (in greek language)",
    (isoCode) => {
      expect(getRegionWithPrefecturesByIsoCode({ isoCode, includeMountAthos: true })).toBe(
        regionsWithPrefecturesAndMountAthos.el.find((region) => region.iso31662 === isoCode),
      );
      expect(getRegionWithPrefecturesByIsoCode({ isoCode, locale: "el", includeMountAthos: true })).toBe(
        regionsWithPrefecturesAndMountAthos.el.find((region) => region.iso31662 === isoCode),
      );
    },
  );

  test.each(regionIsoCodesInEnglish)(
    "get region with iso31662 code %s of Greece with its prefectures (in english language)",
    (isoCode) => {
      expect(getRegionWithPrefecturesByIsoCode({ isoCode, locale: "en" })).toBe(
        regionsWithPrefectures.en.find((region) => region.iso31662 === isoCode),
      );
      expect(getRegionWithPrefecturesByIsoCode({ isoCode, locale: "en", includeMountAthos: false })).toBe(
        regionsWithPrefectures.en.find((region) => region.iso31662 === isoCode),
      );
    },
  );

  test.each(regionIsoCodesInEnglishIncludingMountAthos)(
    "get region with iso31662 code %s of Greece with its prefectures, including Mount Athos (in english language)",
    (isoCode) => {
      expect(getRegionWithPrefecturesByIsoCode({ isoCode, locale: "en", includeMountAthos: true })).toBe(
        regionsWithPrefecturesAndMountAthos.en.find((region) => region.iso31662 === isoCode),
      );
    },
  );
});

describe("getRegionById", () => {
  const regionIdsInGreek = regions.el.map(({ id }) => id);
  const regionIdsInGreekIncludingMountAthos = regionsWithMountAthos.el.map(({ id }) => id);
  const regionIdsInEnglish = regions.en.map(({ id }) => id);
  const regionIdsInEnglishIncludingMountAthos = regionsWithMountAthos.en.map(({ id }) => id);

  test.each(regionIdsInGreek)("get region with id %i of Greece (in greek language)", (id) => {
    expect(getRegionById({ id })).toBe(regions.el.find((region) => region.id === id));
    expect(getRegionById({ id, locale: "el" })).toBe(regions.el.find((region) => region.id === id));
    expect(getRegionById({ id, includeMountAthos: false })).toBe(regions.el.find((region) => region.id === id));
    expect(getRegionById({ id, locale: "el", includeMountAthos: false })).toBe(
      regions.el.find((region) => region.id === id),
    );
  });

  test.each(regionIdsInGreekIncludingMountAthos)(
    "get region with id %i of Greece, including Mount Athos (in greek language)",
    (id) => {
      expect(getRegionById({ id, includeMountAthos: true })).toBe(
        regionsWithMountAthos.el.find((region) => region.id === id),
      );
      expect(getRegionById({ id, locale: "el", includeMountAthos: true })).toBe(
        regionsWithMountAthos.el.find((region) => region.id === id),
      );
    },
  );

  test.each(regionIdsInEnglish)("get region with id %i of Greece (in english language)", (id) => {
    expect(getRegionById({ id, locale: "en" })).toBe(regions.en.find((region) => region.id === id));
    expect(getRegionById({ id, locale: "en", includeMountAthos: false })).toBe(
      regions.en.find((region) => region.id === id),
    );
  });

  test.each(regionIdsInEnglishIncludingMountAthos)(
    "get region with id %i of Greece, including Mount Athos (in english language)",
    (id) => {
      expect(getRegionById({ id, locale: "en", includeMountAthos: true })).toBe(
        regionsWithMountAthos.en.find((region) => region.id === id),
      );
    },
  );
});

describe("getRegionByIsoCode", () => {
  const regionIsoCodesInGreek = regions.el.map(({ iso31662 }) => iso31662);
  const regionIsoCodesInGreekIncludingMountAthos = regionsWithMountAthos.el.map(({ iso31662 }) => iso31662);
  const regionIsoCodesInEnglish = regions.en.map(({ iso31662 }) => iso31662);
  const regionIsoCodesInEnglishIncludingMountAthos = regionsWithMountAthos.en.map(({ iso31662 }) => iso31662);

  test.each(regionIsoCodesInGreek)("get region with iso31662 code %s of Greece (in greek language)", (isoCode) => {
    expect(getRegionByIsoCode({ isoCode })).toBe(regions.el.find((region) => region.iso31662 === isoCode));
    expect(getRegionByIsoCode({ isoCode, locale: "el" })).toBe(
      regions.el.find((region) => region.iso31662 === isoCode),
    );
    expect(getRegionByIsoCode({ isoCode, includeMountAthos: false })).toBe(
      regions.el.find((region) => region.iso31662 === isoCode),
    );
    expect(getRegionByIsoCode({ isoCode, locale: "el", includeMountAthos: false })).toBe(
      regions.el.find((region) => region.iso31662 === isoCode),
    );
  });

  test.each(regionIsoCodesInGreekIncludingMountAthos)(
    "get region with iso31662 code %s of Greece, including Mount Athos (in greek language)",
    (isoCode) => {
      expect(getRegionByIsoCode({ isoCode, includeMountAthos: true })).toBe(
        regionsWithMountAthos.el.find((region) => region.iso31662 === isoCode),
      );
      expect(getRegionByIsoCode({ isoCode, locale: "el", includeMountAthos: true })).toBe(
        regionsWithMountAthos.el.find((region) => region.iso31662 === isoCode),
      );
    },
  );

  test.each(regionIsoCodesInEnglish)("get region with iso31662 code %s of Greece (in english language)", (isoCode) => {
    expect(getRegionByIsoCode({ isoCode, locale: "en" })).toBe(
      regions.en.find((region) => region.iso31662 === isoCode),
    );
    expect(getRegionByIsoCode({ isoCode, locale: "en", includeMountAthos: false })).toBe(
      regions.en.find((region) => region.iso31662 === isoCode),
    );
  });

  test.each(regionIsoCodesInEnglishIncludingMountAthos)(
    "get region with iso31662 code %s, including Mount Athos (in english language)",
    (isoCode) => {
      expect(getRegionByIsoCode({ isoCode, locale: "en", includeMountAthos: true })).toBe(
        regionsWithMountAthos.en.find((region) => region.iso31662 === isoCode),
      );
    },
  );
});
