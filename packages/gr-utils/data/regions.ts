export const regions = {
  el: [
    {
      id: 1,
      name: "Αττική",
      seat: "Αθήνα",
    },
    {
      id: 2,
      name: "Στερεά Ελλάδα",
      seat: "Λαμία",
    },
    {
      id: 3,
      name: "Κεντρική Μακεδονία",
      seat: "Θεσσαλονίκη",
    },
    {
      id: 4,
      name: "Κρήτη",
      seat: "Ηράκλειο",
    },
    {
      id: 5,
      name: "Ανατολική Μακεδονία και Θράκη",
      seat: "Κομοτηνή",
    },
    {
      id: 6,
      name: "Ήπειρος",
      seat: "Ιωάννινα",
    },
    {
      id: 7,
      name: "Ιονίων Νήσων",
      seat: "Κέρκυρα",
    },
    {
      id: 8,
      name: "Βόρειο Αιγαίο",
      seat: "Μυτιλήνη",
    },
    {
      id: 9,
      name: "Πελοπόννησος",
      seat: "Τρίπολη",
    },
    {
      id: 10,
      name: "Νότιο Αιγαίο",
      seat: "Ερμούπολη",
    },
    {
      id: 11,
      name: "Θεσσαλία",
      seat: "Λάρισα",
    },
    {
      id: 12,
      name: "Δυτική Ελλάδα",
      seat: "Πάτρα",
    },
    {
      id: 13,
      name: "Δυτική Μακεδονία",
      seat: "Κοζάνη",
    },
  ],
  en: [
    {
      id: 1,
      name: "Attica",
      seat: "Athens",
    },
    {
      id: 2,
      name: "Central Greece",
      seat: "Lamia",
    },
    {
      id: 3,
      name: "Central Macedonia",
      seat: "Thessaloniki",
    },
    {
      id: 4,
      name: "Crete",
      seat: "Heraklion",
    },
    {
      id: 5,
      name: "Eastern Macedonia and Thrace",
      seat: "Komotini",
    },
    {
      id: 6,
      name: "Epirus",
      seat: "Ioannina",
    },
    {
      id: 7,
      name: "Ionian Islands",
      seat: "Corfu",
    },
    {
      id: 8,
      name: "North Aegean",
      seat: "Mytilene",
    },
    {
      id: 9,
      name: "Peloponnese",
      seat: "Tripoli",
    },
    {
      id: 10,
      name: "South Aegean",
      seat: "Ermoupoli",
    },
    {
      id: 11,
      name: "Thessaly",
      seat: "Larissa",
    },
    {
      id: 12,
      name: "Western Greece",
      seat: "Patras",
    },
    {
      id: 13,
      name: "Western Macedonia",
      seat: "Kozani",
    },
  ],
} as const;

export const regionsWithMountAthos = {
  el: [
    ...regions.el,
    {
      id: 14,
      name: "Αυτόνομη Μοναστική Πολιτεία του Αγίου Όρους",
      seat: "Καρυές",
    },
  ],
  en: [
    ...regions.en,
    {
      id: 14,
      name: "Mount Athos",
      seat: "Karyes",
    },
  ],
} as const;
