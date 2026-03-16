export type FormatNumberOptions = Intl.NumberFormatOptions & { locale?: string | string[] };

/**
 * Formats a number based on the provided options, defaulting to the Greek locale.
 *
 * @param {number | bigint} value - The number to format.
 * @param {FormatNumberOptions} [options={}] - Options for formatting the number.
 * @returns {string} - The formatted number string.
 */
export const formatNumber = (value: number | bigint, options: FormatNumberOptions = {}): string => {
  const { locale = "el-GR", ...intlOptions } = options;

  return new Intl.NumberFormat(locale, intlOptions).format(value);
};
