export const holidaysData = {
  el: [
    { date: "01-01", name: "Πρωτοχρονιά", moveable: false },
    { date: "01-06", name: "Θεοφάνεια", moveable: false },
    { date: "03-25", name: "Ευαγγελισμός της Θεοτόκου", moveable: false },
    { date: "05-01", name: "Εργατική Πρωτομαγιά", moveable: false },
    { date: "08-15", name: "Κοίμηση της Θεοτόκου", moveable: false },
    { date: "10-28", name: "Ημέρα του Όχι", moveable: false },
    { date: "12-25", name: "Χριστούγεννα", moveable: false },
    { date: "12-26", name: "Επόμενη των Χριστουγέννων", moveable: false },
    { date: "cleanMonday", name: "Καθαρά Δευτέρα", moveable: true },
    { date: "goodFriday", name: "Μεγάλη Παρασκευή", moveable: true },
    { date: "easterMonday", name: "Δευτέρα του Πάσχα", moveable: true },
    { date: "pentecost", name: "Αγίου Πνεύματος", moveable: true },
  ],
  en: [
    { date: "01-01", name: "New Year's Day", moveable: false },
    { date: "01-06", name: "Epiphany", moveable: false },
    { date: "03-25", name: "Annunciation", moveable: false },
    { date: "05-01", name: "Labour Day", moveable: false },
    { date: "08-15", name: "Assumption of Mary", moveable: false },
    { date: "10-28", name: "Ohi Day", moveable: false },
    { date: "12-25", name: "Christmas Day", moveable: false },
    { date: "12-26", name: "Boxing Day", moveable: false },
    { date: "cleanMonday", name: "Clean Monday", moveable: true },
    { date: "goodFriday", name: "Good Friday", moveable: true },
    { date: "easterMonday", name: "Easter Monday", moveable: true },
    { date: "pentecost", name: "Pentecost", moveable: true },
  ],
};

type Holiday = {
  date: string;
  name: string;
};

/**
 * Calculates movable Greek holidays based on the given year and locale.
 *
 * @param {number} year - The year for which to calculate the holidays.
 * @param {"el" | "en"} - The locale to use for holiday names.
 *
 * @returns {Holiday[]} An array of objects representing the movable holidays for the specified year and locale.
 */
function calculateMovableGreekHolidays(year: number, locale: "el" | "en"): Holiday[] {
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
  const easter = new Date(Date.UTC(year, m, d));
  const cleanMonday = new Date(easter.getTime() + oneDay * -48).toISOString();
  const goodFriday = new Date(easter.getTime() + oneDay * -2).toISOString();
  const easterMonday = new Date(easter.getTime() + oneDay).toISOString();
  const pentecost = new Date(easter.getTime() + oneDay * 50).toISOString();
  const movableGreekHolidaysDates = {
    cleanMonday: `${year}-${cleanMonday.slice(5, 7)}-${cleanMonday.slice(8, 10)}`,
    goodFriday: `${year}-${goodFriday.slice(5, 7)}-${goodFriday.slice(8, 10)}`,
    easterMonday: `${year}-${easterMonday.slice(5, 7)}-${easterMonday.slice(8, 10)}`,
    pentecost: `${year}-${pentecost.slice(5, 7)}-${pentecost.slice(8, 10)}`,
  };

  return holidaysData[locale]
    .filter(({ moveable }) => moveable)
    .map(({ date, name }) => ({
      date: movableGreekHolidaysDates[date as keyof typeof movableGreekHolidaysDates],
      name,
    }));
}

type GetHolidaysOptions = {
  locale?: "el" | "en";
};

/**
 * Gets Greek holidays for the given year, including both fixed and movable.
 *
 * @param {string} year - The year for which to fetch the holidays.
 * @param {GetHolidaysOptions} [options={}] - The options for locale.
 * @param {"el" | "en"} [options.locale="el"] - The locale to use for formatting. Default is "el".
 *
 * @returns {Holiday[]} An array of holiday objects.
 */
export function getHolidays(year: string, options: GetHolidaysOptions = {}): Holiday[] {
  const { locale = "el" } = options;
  const y = Number.parseInt(year);
  const nonMovableHolidays = holidaysData[locale]
    .filter(({ moveable }) => !moveable)
    .map(({ date, name }) => ({ date: `${year}-${date}`, name }));
  const movableHolidays: Holiday[] = calculateMovableGreekHolidays(y, locale);
  const holidays = [...nonMovableHolidays, ...movableHolidays].toSorted((a, b) => a.date.localeCompare(b.date));

  return holidays;
}
