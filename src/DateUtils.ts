import datesData from "../data/dates.json";

type Format = "full" | "short" | "min";

type BaseDateTimeOptions = {
  locale?: "el" | "en";
  format?: Format;
};

type MonthsBaseDateTimeOptions = Omit<BaseDateTimeOptions, "format"> & {
  format?: Format | "alternative";
};

type DateTimeOptionsWithoutMin = Omit<BaseDateTimeOptions, "format"> & {
  format?: Exclude<Format, "min">;
};

class DateUtilities {
  private datesData = datesData;

  getDays(options: BaseDateTimeOptions = {}) {
    const { locale = "el", format = "full" } = options;

    return this.datesData.days[locale][format];
  }

  getMonths(options: MonthsBaseDateTimeOptions = {}) {
    const { locale = "el", format = "full" } = options;

    return this.datesData.months[locale][format];
  }

  getQuarters(options: DateTimeOptionsWithoutMin = {}) {
    const { locale = "el", format = "full" } = options;

    return this.datesData.quarters[locale][format];
  }

  getEras(options: DateTimeOptionsWithoutMin = {}) {
    const { locale = "el", format = "full" } = options;

    return this.datesData.eras[locale][format];
  }
}

export const DateUtils = new DateUtilities();
