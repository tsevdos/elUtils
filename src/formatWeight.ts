const weightsData = {
  pound: {
    international: "(lb)",
    el: {
      full: "λίβρες",
      short: "lb",
      full_single: "λίβρα",
    },
    en: {
      full: "pounds",
      short: "lb",
      full_single: "pound",
    },
  },
  centigram: {
    international: "(cg)",
    el: {
      full: "εκατοστόγραμμα",
      short: "cg",
      full_single: "εκατοστόγραμμο",
    },
    en: {
      full: "centigrams",
      short: "cg",
      full_single: "centigram",
    },
  },
  carat: {
    international: "(ct)",
    el: {
      full: "καράτια",
      short: "ct",
      full_single: "καράτι",
    },
    en: {
      full: "carats",
      short: "ct",
      full_single: "carat",
    },
  },
  dram: {
    international: "(dr)",
    el: {
      full: "δράμια",
      short: "dr",
      full_single: "δράμι",
    },
    en: {
      full: "drams",
      short: "dr",
      full_single: "dram",
    },
  },
  gram: {
    international: "(g)",
    el: {
      full: "γραμμάρια",
      short: "g",
      full_single: "γραμμάριο",
    },
    en: {
      full: "grams",
      short: "g",
      full_single: "gram",
    },
  },
  grain: {
    international: "(gr)",
    el: {
      full: "κόκκους",
      short: "gr",
      full_single: "κόκκος",
    },
    en: {
      full: "grains",
      short: "gr",
      full_single: "grain",
    },
  },
  hectogram: {
    international: "(hg)",
    el: {
      full: "εκατόγραμμα",
      short: "hg",
      full_single: "εκατόγραμμο",
    },
    en: {
      full: "hectograms",
      short: "hg",
      full_single: "hectogram",
    },
  },
  kilogram: {
    international: "(kg)",
    el: {
      full: "κιλά",
      short: "kg",
      full_single: "κιλό",
    },
    en: {
      full: "kilograms",
      short: "kg",
      full_single: "kilogram",
    },
  },
  kilonewton: {
    international: "(kN)",
    el: {
      full: "κιλονιούτον",
      short: "kN",
      full_single: "κιλονιούτον",
    },
    en: {
      full: "kilonewtons",
      short: "kN",
      full_single: "kilonewton",
    },
  },
  milligram: {
    international: "(mg)",
    el: {
      full: "χιλιοστόγραμμα",
      short: "mg",
      full_single: "χιλιοστόγραμμο",
    },
    en: {
      full: "milligrams",
      short: "mg",
      full_single: "milligram",
    },
  },
  nanogram: {
    international: "(ng)",
    el: {
      full: "νανογραμμάρια",
      short: "ng",
      full_single: "νανογραμμάριο",
    },
    en: {
      full: "nanograms",
      short: "ng",
      full_single: "nanogram",
    },
  },
  ounce: {
    international: "(oz)",
    el: {
      full: "ουγγιές",
      short: "oz",
      full_single: "ουγγιά",
    },
    en: {
      full: "ounces",
      short: "oz",
      full_single: "ounce",
    },
  },
  ton: {
    international: "(t)",
    el: {
      full: "τόνοι",
      short: "t",
      full_single: "τόνος",
    },
    en: {
      full: "tons",
      short: "t",
      full_single: "ton",
    },
  },
} as const;

type WeightTypes =
  | "pound"
  | "kilogram"
  | "centigram"
  | "carat"
  | "dram"
  | "gram"
  | "grain"
  | "hectogram"
  | "kilonewton"
  | "milligram"
  | "nanogram"
  | "ounce"
  | "ton";

type FormatWeightsOptions = {
  locale?: "el" | "en";
  type?: WeightTypes;
} & (
  | {
      format?: "full" | "full_single";
      withInternational?: boolean;
    }
  | {
      // we don't want to have both a short format and the international symbol
      // since we will end up with "two" symbols e.g 1 lb (lb)
      format?: "short";
      withInternational?: never;
    }
);

type WithInternationalOptions = Pick<FormatWeightsOptions, "type">;

// helper to add international symbol
const withInternationalSymbol = (value: string, options: WithInternationalOptions = {}): string => {
  const { type = "pound" } = options;

  if (weightsData[type].international) {
    return `${value} ${weightsData[type].international}`;
  }

  return value;
};

/**
 * Formats a weight value based on the provided options.
 *
 * @param {number} value - The weight value to format.
 * @param {FormatWeightsOptions} [options={}] - The options for formatting the weight.
 * @param {string} [options.locale="el"] - The locale to use for formatting. Default is "el".
 * @param {WeightTypes} [options.type="pound"] - The type of weight to format. Default is "pound".
 * @param {"full" | "full_single" | "short"} [options.format="full"] - The format to use. Default is "full".
 * @param {boolean} [options.withInternational=false] - Whether to include the international symbol. Default is false.
 *
 * @returns {string} - The formatted weight string.
 */
export const formatWeight = (value: number, options: FormatWeightsOptions = {}): string => {
  const { locale = "el", format = "full", type = "pound", withInternational = false } = options;
  let getFormat = format;

  if (getFormat !== "short") {
    getFormat = value > 1 ? "full" : "full_single";
  }

  const result = `${value} ${weightsData[type][locale][getFormat]}`;

  if (withInternational) {
    return withInternationalSymbol(result, { type });
  }

  return result;
};
