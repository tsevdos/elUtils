import datesData from "../../data/dates.json";

type DateTimeOptions = {
  locale?: "el" | "en";
  format?: "full" | "short" | "min" | "alternative";
};

class DateUtilities {
  private datesData = datesData;

  getDays(options: DateTimeOptions = {}) {
    const { locale = "el", format = "full" } = options;

    return this.datesData.days[locale][format] as string[];
  }

  getMonths(options: DateTimeOptions = {}) {
    const { locale = "el", format = "full" } = options;

    return this.datesData.months[locale][format] as string[];
  }

  getQuarters(options: DateTimeOptions = {}) {
    const { locale = "el", format = "full" } = options;

    return this.datesData.quarters[locale][format] as string[];
  }

  getEras(options: DateTimeOptions = {}) {
    const { locale = "el", format = "full" } = options;

    return this.datesData.eras[locale][format] as string[];
  }
}

export const DateUtils = new DateUtilities();
