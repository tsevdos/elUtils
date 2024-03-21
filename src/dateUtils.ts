import datesData from "../data/dates.json";

type Format = "full" | "short" | "min";

type BaseDateTimeOptions = {
  locale?: "el" | "en";
  format?: Format;
};

/**
 * Returns the days based on the provided options.
 * @param {BaseDateTimeOptions} options - The options for locale and format.
 * @returns {string[]} The days in the specified locale and format.
 */
export function getDays(options: BaseDateTimeOptions = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.days[locale][format];
}

type MonthsBaseDateTimeOptions = Omit<BaseDateTimeOptions, "format"> & {
  format?: Format | "alternative";
};

/**
 * Returns the months based on the provided options.
 * @param {MonthsBaseDateTimeOptions} options - The options for locale and format.
 * @returns {string[]} The months in the specified locale and format.
 */
export function getMonths(options: MonthsBaseDateTimeOptions = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.months[locale][format];
}

type DateTimeOptionsWithoutMin = Omit<BaseDateTimeOptions, "format"> & {
  format?: Exclude<Format, "min">;
};

/**
 * Returns the quarters based on the provided options.
 * @param {DateTimeOptionsWithoutMin} options - The options for locale and format.
 * @returns {string[]} The quarters in the specified locale and format.
 */
export function getQuarters(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.quarters[locale][format];
}

/**
 * Returns the eras based on the provided options.
 * @param {DateTimeOptionsWithoutMin} options - The options for locale and format.
 * @returns {string[]} The eras in the specified locale and format.
 */
export function getEras(options: DateTimeOptionsWithoutMin = {}) {
  const { locale = "el", format = "full" } = options;

  return datesData.eras[locale][format];
}

type Holiday = {
  date: string;
  name: string;
};

/**
 * Calculates movable Greek holidays based on the given year.
 * @param {number} year - The year for which to calculate the holidays.
 * @returns {Holiday[]} An array of movable holiday objects.
 */
function calculateMovableGreekHolidays(year: number): Holiday[] {
  let e = 10;

  if (year > 1600) {
    const year2 = Math.floor(year / 100);
    e = 10 + year2 - 16 - Math.floor((year2 - 16) / 4);
  }
  if (year < 1583) {
    e = 0;
  }
  const a = year % 19;
  const b = (19 * a + 15) % 30;
  const c = (year + Math.floor(year / 4) + b) % 7;
  const L = b - c;
  const p = L + e;
  const d = 1 + ((p + 27 + Math.floor((p + 6) / 40)) % 31);
  const m = 3 + Math.floor((p + 26) / 30) - 1;
  const oneDay = 60 * 1000 * 60 * 24;
  const pascha = new Date(Date.UTC(year, m, d));
  const katharaDeftera = new Date(pascha.getTime() + oneDay * -48).toISOString().split("T")[0];
  const megParaskevi = new Date(pascha.getTime() + oneDay * -2).toISOString().split("T")[0];
  const deftPascha = new Date(pascha.getTime() + oneDay).toISOString().split("T")[0];
  const agiouPnefmatos = new Date(pascha.getTime() + oneDay * 50).toISOString().split("T")[0];

  return [
    { date: katharaDeftera!, name: "Καθαρά Δευτέρα" },
    { date: megParaskevi!, name: "Μεγάλη Παρασκευή" },
    { date: deftPascha!, name: "Δευτέρα του Πάσχα" },
    { date: agiouPnefmatos!, name: "Αγίου Πνεύματος" },
  ];
}

/**
 * Gets Greek holidays for the given year, including both fixed and movable.
 * @param {string} year - The year for which to fetch the holidays.
 * @returns {Holiday[]} An array of holiday objects.
 */
export function getHolidays(year: string): Holiday[] {
  const y = parseInt(year);

  // Fixed Date Holidays
  const fixedHolidays: Holiday[] = [
    { date: `${year}-01-01`, name: "Πρωτοχρονιά" },
    { date: `${year}-01-06`, name: "Θεοφάνεια" },
    { date: `${year}-03-25`, name: "Ευαγγελισμός της Θεοτόκου" },
    { date: `${year}-05-01`, name: "Εργατική Πρωτομαγιά" },
    { date: `${year}-08-15`, name: "Κοίμηση της Θεοτόκου" },
    { date: `${year}-10-28`, name: "Ημέρα του Όχι" },
    { date: `${year}-12-25`, name: "Χριστούγεννα" },
    { date: `${year}-12-26`, name: "Επόμενη των Χριστουγέννων" },
  ];

  const movableHolidays: Holiday[] = calculateMovableGreekHolidays(y);
  const holidays = [...fixedHolidays, ...movableHolidays].sort((a, b) => a.date.localeCompare(b.date));
  const firstMay = holidays.find((h) => h.name === `Εργατική Πρωτομαγιά`);

  if (firstMay) {
    const firstMayCount = holidays.filter((h) => h.date === `${year}-05-01`).length;

    if (firstMayCount > 1) {
      holidays.splice(holidays.indexOf(firstMay), 1);
    }
    const firstMayDate = new Date(firstMay.date);
    const day = firstMayDate.getDay();
    if (day === 0 || day === 6) {
      holidays.splice(holidays.indexOf(firstMay), 1);
    }
  }

  // Additional logic to handle special cases, e.g., Labor Day falling on a weekend

  return holidays;
}
