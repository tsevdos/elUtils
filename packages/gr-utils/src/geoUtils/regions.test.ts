import {
  regionsWithPrefectures,
  regionsWithPrefecturesAndMountAthos,
  regions,
  regionsWithMountAthos,
  RegionWithPrefectures,
  Region,
} from "../../data/geospatial";
import {
  getRegionsWithPrefectures,
  getRegions,
  getRegionWithPrefecturesById,
  getRegionWithPrefecturesByIsoCode,
  getRegionById,
  getRegionByIsoCode,
} from "./regions";

// alias types (for les typing)
type TRWP = RegionWithPrefectures;
type TR = Region;

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
  const regionIdsInGreek = getRegionsWithPrefectures().map(({ id }) => id);
  const regionIdsInGreekIncludingMountAthos = getRegionsWithPrefectures({ includeMountAthos: true }).map(
    ({ id }) => id,
  );
  const regionIdsInEnglish = getRegionsWithPrefectures({ locale: "en" }).map(({ id }) => id);
  const regionIdsInEnglishIncludingMountAthos = getRegionsWithPrefectures({
    locale: "en",
    includeMountAthos: true,
  }).map(({ id }) => id);

  test.each(regionIdsInGreek)("get region with id %i of Greece with its prefectures (in greek language)", (id) => {
    expect(getRegionsWithPrefectures().includes(getRegionWithPrefecturesById({ id }) as TRWP)).toBe(true);
    expect(getRegionsWithPrefectures().includes(getRegionWithPrefecturesById({ id, locale: "el" }) as TRWP)).toBe(true);
    expect(
      getRegionsWithPrefectures().includes(getRegionWithPrefecturesById({ id, includeMountAthos: false }) as TRWP),
    ).toBe(true);
    expect(
      getRegionsWithPrefectures().includes(getRegionWithPrefecturesById({ id, includeMountAthos: false }) as TRWP),
    ).toBe(true);
  });

  test.each(regionIdsInGreekIncludingMountAthos)(
    "get region with id %i of Greece with its prefectures, including Mount Athos (in greek language)",
    (id) => {
      expect(
        getRegionsWithPrefectures({ includeMountAthos: true }).includes(
          getRegionWithPrefecturesById({ id, includeMountAthos: true }) as TRWP,
        ),
      ).toBe(true);
      expect(
        getRegionsWithPrefectures({ includeMountAthos: true }).includes(
          getRegionWithPrefecturesById({ id, locale: "el", includeMountAthos: true }) as TRWP,
        ),
      ).toBe(true);
    },
  );

  test.each(regionIdsInEnglish)("get region with id %i of Greece with its prefectures (in english language)", (id) => {
    expect(
      getRegionsWithPrefectures({ locale: "en" }).includes(getRegionWithPrefecturesById({ id, locale: "en" }) as TRWP),
    ).toBe(true);
    expect(
      getRegionsWithPrefectures({ locale: "en" }).includes(
        getRegionWithPrefecturesById({ id, locale: "en", includeMountAthos: false }) as TRWP,
      ),
    ).toBe(true);
  });

  test.each(regionIdsInEnglishIncludingMountAthos)(
    "get region with id %i of Greece with its prefectures, including Mount Athos (in english language)",
    (id) => {
      expect(
        getRegionsWithPrefectures({ locale: "en", includeMountAthos: true }).includes(
          getRegionWithPrefecturesById({ id, locale: "en", includeMountAthos: true }) as TRWP,
        ),
      ).toBe(true);
    },
  );
});

describe("getRegionWithPrefecturesByIsoCode", () => {
  const regionIsoCodesInGreek = getRegionsWithPrefectures().map(({ iso31662 }) => iso31662);
  const regionIsoCodesInGreekIncludingMountAthos = getRegionsWithPrefectures({ includeMountAthos: true }).map(
    ({ iso31662 }) => iso31662,
  );
  const regionIsoCodesInEnglish = getRegionsWithPrefectures({ locale: "en" }).map(({ iso31662 }) => iso31662);
  const regionIsoCodesInEnglishIncludingMountAthos = getRegionsWithPrefectures({
    locale: "en",
    includeMountAthos: true,
  }).map(({ iso31662 }) => iso31662);

  test.each(regionIsoCodesInGreek)(
    "get region with iso31662 code %s of Greece with its prefectures (in greek language)",
    (isoCode) => {
      expect(getRegionsWithPrefectures().includes(getRegionWithPrefecturesByIsoCode({ isoCode }) as TRWP)).toBe(true);
      expect(
        getRegionsWithPrefectures().includes(getRegionWithPrefecturesByIsoCode({ isoCode, locale: "el" }) as TRWP),
      ).toBe(true);
      expect(
        getRegionsWithPrefectures().includes(
          getRegionWithPrefecturesByIsoCode({ isoCode, includeMountAthos: false }) as TRWP,
        ),
      ).toBe(true);
      expect(
        getRegionsWithPrefectures().includes(
          getRegionWithPrefecturesByIsoCode({ isoCode, locale: "el", includeMountAthos: false }) as TRWP,
        ),
      ).toBe(true);
    },
  );

  test.each(regionIsoCodesInGreekIncludingMountAthos)(
    "get region with iso31662 code %s of Greece with its prefectures, including Mount Athos (in greek language)",
    (isoCode) => {
      expect(
        getRegionsWithPrefectures({ includeMountAthos: true }).includes(
          getRegionWithPrefecturesByIsoCode({ isoCode, includeMountAthos: true }) as TRWP,
        ),
      ).toBe(true);
      expect(
        getRegionsWithPrefectures({ includeMountAthos: true }).includes(
          getRegionWithPrefecturesByIsoCode({ isoCode, locale: "el", includeMountAthos: true }) as TRWP,
        ),
      ).toBe(true);
    },
  );

  test.each(regionIsoCodesInEnglish)(
    "get region with iso31662 code %s of Greece with its prefectures (in english language)",
    (isoCode) => {
      expect(
        getRegionsWithPrefectures({ locale: "en" }).includes(
          getRegionWithPrefecturesByIsoCode({ isoCode, locale: "en" }) as TRWP,
        ),
      ).toBe(true);
      expect(
        getRegionsWithPrefectures({ locale: "en" }).includes(
          getRegionWithPrefecturesByIsoCode({ isoCode, locale: "en", includeMountAthos: false }) as TRWP,
        ),
      ).toBe(true);
    },
  );

  test.each(regionIsoCodesInEnglishIncludingMountAthos)(
    "get region with iso31662 code %s of Greece with its prefectures, including Mount Athos (in english language)",
    (isoCode) => {
      expect(
        getRegionsWithPrefectures({ locale: "en", includeMountAthos: true }).includes(
          getRegionWithPrefecturesByIsoCode({ isoCode, locale: "en", includeMountAthos: true }) as TRWP,
        ),
      ).toBe(true);
    },
  );
});

describe("getRegionById", () => {
  const regionIdsInGreek = getRegions().map(({ id }) => id);
  const regionIdsInGreekIncludingMountAthos = getRegions({ includeMountAthos: true }).map(({ id }) => id);
  const regionIdsInEnglish = getRegions({ locale: "en" }).map(({ id }) => id);
  const regionIdsInEnglishIncludingMountAthos = getRegions({ locale: "en", includeMountAthos: true }).map(
    ({ id }) => id,
  );

  test.each(regionIdsInGreek)("get region with id %i of Greece (in greek language)", (id) => {
    expect(getRegions().includes(getRegionById({ id }) as TR)).toBe(true);
    expect(getRegions().includes(getRegionById({ id, locale: "el" }) as TR)).toBe(true);
    expect(getRegions().includes(getRegionById({ id, includeMountAthos: false }) as TR)).toBe(true);
    expect(getRegions().includes(getRegionById({ id, locale: "el", includeMountAthos: false }) as TR)).toBe(true);
  });

  test.each(regionIdsInGreekIncludingMountAthos)(
    "get region with id %i of Greece, including Mount Athos (in greek language)",
    (id) => {
      expect(
        getRegions({ includeMountAthos: true }).includes(getRegionById({ id, includeMountAthos: true }) as TR),
      ).toBe(true);
      expect(
        getRegions({ includeMountAthos: true }).includes(
          getRegionById({ id, locale: "el", includeMountAthos: true }) as TR,
        ),
      ).toBe(true);
    },
  );

  test.each(regionIdsInEnglish)("get region with id %i of Greece (in english language)", (id) => {
    expect(getRegions({ locale: "en" }).includes(getRegionById({ id, locale: "en" }) as TR)).toBe(true);
    expect(
      getRegions({ locale: "en" }).includes(getRegionById({ id, locale: "en", includeMountAthos: false }) as TR),
    ).toBe(true);
  });

  test.each(regionIdsInEnglishIncludingMountAthos)(
    "get region with id %i of Greece, including Mount Athos (in english language)",
    (id) => {
      expect(
        getRegions({ locale: "en", includeMountAthos: true }).includes(
          getRegionById({ id, locale: "en", includeMountAthos: true }) as TR,
        ),
      ).toBe(true);
    },
  );
});

describe("getRegionByIsoCode", () => {
  const regionIsoCodesInGreek = getRegions().map(({ iso31662 }) => iso31662);
  const regionIsoCodesInGreekIncludingMountAthos = getRegions({ includeMountAthos: true }).map(
    ({ iso31662 }) => iso31662,
  );
  const regionIsoCodesInEnglish = getRegions({ locale: "en" }).map(({ iso31662 }) => iso31662);
  const regionIsoCodesInEnglishIncludingMountAthos = getRegions({ locale: "en", includeMountAthos: true }).map(
    ({ iso31662 }) => iso31662,
  );

  test.each(regionIsoCodesInGreek)("get region with iso31662 code %s of Greece (in greek language)", (isoCode) => {
    expect(getRegions().includes(getRegionByIsoCode({ isoCode }) as TR)).toBe(true);
    expect(getRegions().includes(getRegionByIsoCode({ isoCode, locale: "el" }) as TR)).toBe(true);
    expect(getRegions().includes(getRegionByIsoCode({ isoCode, includeMountAthos: false }) as TR)).toBe(true);
    expect(getRegions().includes(getRegionByIsoCode({ isoCode, locale: "el", includeMountAthos: false }) as TR)).toBe(
      true,
    );
  });

  test.each(regionIsoCodesInGreekIncludingMountAthos)(
    "get region with iso31662 code %s of Greece, including Mount Athos (in greek language)",
    (isoCode) => {
      expect(
        getRegions({ includeMountAthos: true }).includes(
          getRegionByIsoCode({ isoCode, includeMountAthos: true }) as TR,
        ),
      ).toBe(true);
      expect(
        getRegions({ includeMountAthos: true }).includes(
          getRegionByIsoCode({ isoCode, locale: "el", includeMountAthos: true }) as TR,
        ),
      ).toBe(true);
    },
  );

  test.each(regionIsoCodesInEnglish)("get region with iso31662 code %s of Greece (in english language)", (isoCode) => {
    expect(getRegions({ locale: "en" }).includes(getRegionByIsoCode({ isoCode, locale: "en" }) as TR)).toBe(true);
    expect(
      getRegions({ locale: "en" }).includes(
        getRegionByIsoCode({ isoCode, locale: "en", includeMountAthos: false }) as TR,
      ),
    ).toBe(true);
  });

  test.each(regionIsoCodesInEnglishIncludingMountAthos)(
    "get region with iso31662 code %s, including Mount Athos (in english language)",
    (isoCode) => {
      expect(
        getRegions({ locale: "en", includeMountAthos: true }).includes(
          getRegionByIsoCode({ isoCode, locale: "en", includeMountAthos: true }) as TR,
        ),
      ).toBe(true);
    },
  );
});
