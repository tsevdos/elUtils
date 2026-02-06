export type Format = "full" | "short" | "min";

export type BaseDateTimeOptions = {
  locale?: "el" | "en";
  format?: Format;
};

export type DateTimeOptionsWithoutMin = Omit<BaseDateTimeOptions, "format"> & {
  format?: Exclude<Format, "min">;
};
