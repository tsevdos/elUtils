import weightsData from "../data/weights.json";

export type WeightTypes =
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

  if (weightsData.weights[type].international) {
    return `${value} ${weightsData.weights[type].international}`;
  }

  return value;
};

export const formatWeight = (value: number, options: FormatWeightsOptions = {}): string => {
  const { locale = "el", format = "full", type = "pound", withInternational = false } = options;
  let getFormat = format;

  if (getFormat !== "short") {
    getFormat = value > 1 ? "full" : "full_single";
  }

  const result = `${value} ${weightsData.weights[type][locale][getFormat]}`;

  if (withInternational) {
    return withInternationalSymbol(result, { type });
  }

  return result;
};
