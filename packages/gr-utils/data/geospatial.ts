export type Region = {
  id: number;
  iso31662: string;
  name: string;
  seat: string;
};
export type Prefecture = {
  id: number;
  iso31662: string;
  name: string;
  seat: string;
};
export type RegionWithPrefectures = Region & { prefectures: Prefecture[] };
export type Language = "el" | "en";
type RegionsWithPrefectures = { [T in Language]: RegionWithPrefectures[] };
type Regions = { [T in Language]: Region[] };
type Prefectures = { [T in Language]: Prefecture[] };

export const regionsWithPrefectures = {
  el: [
    {
      id: 1,
      iso31662: "GR-I",
      name: "Αττική",
      seat: "Αθήνα",
      prefectures: [
        {
          id: 1,
          iso31662: "GR-A1",
          name: "Αθηνών",
          seat: "Αθήνα",
        },
        {
          id: 2,
          iso31662: "GR-A2",
          name: "Ανατολικής Αττικής",
          seat: "Παλλήνη",
        },
        {
          id: 3,
          iso31662: "GR-A3",
          name: "Δυτικής Αττικής",
          seat: "Ελευσίνα",
        },
        {
          id: 4,
          iso31662: "GR-A1",
          name: "Πειραιώς",
          seat: "Πειραιάς",
        },
      ],
    },
    {
      id: 2,
      iso31662: "GR-H",
      name: "Στερεά Ελλάδα",
      seat: "Λαμία",
      prefectures: [
        {
          id: 5,
          iso31662: "GR-04",
          name: "Ευβοίας",
          seat: "Χαλκίδα",
        },
        {
          id: 6,
          iso31662: "GR-05",
          name: "Ευρυτανίας",
          seat: "Καρπενήσι",
        },
        {
          id: 7,
          iso31662: "GR-07",
          name: "Φωκίδας",
          seat: "Άμφισσα",
        },
        {
          id: 8,
          iso31662: "GR-06",
          name: "Φθιώτιδας",
          seat: "Λαμία",
        },
        {
          id: 9,
          iso31662: "GR-03",
          name: "Βοιωτίας",
          seat: "Λιβαδειά",
        },
      ],
    },
    {
      id: 3,
      iso31662: "GR-B",
      name: "Κεντρική Μακεδονία",
      seat: "Θεσσαλονίκη",
      prefectures: [
        {
          id: 10,
          iso31662: "GR-64",
          name: "Χαλκιδικής",
          seat: "Πολύγυρος",
        },
        {
          id: 11,
          iso31662: "GR-53",
          name: "Ημαθίας",
          seat: "Βέροια",
        },
        {
          id: 12,
          iso31662: "GR-57",
          name: "Κιλκίς",
          seat: "Κιλκίς",
        },
        {
          id: 13,
          iso31662: "GR-59",
          name: "Πέλλας",
          seat: "Έδεσσα",
        },
        {
          id: 14,
          iso31662: "GR-61",
          name: "Πιερίας",
          seat: "Κατερίνη",
        },
        {
          id: 15,
          iso31662: "GR-62",
          name: "Σερρών",
          seat: "Σέρρες",
        },
        {
          id: 16,
          iso31662: "GR-54",
          name: "Θεσσαλονίκης",
          seat: "Θεσσαλονίκη",
        },
      ],
    },
    {
      id: 4,
      iso31662: "GR-M",
      name: "Κρήτη",
      seat: "Ηράκλειο",
      prefectures: [
        {
          id: 17,
          iso31662: "GR-94",
          name: "Χανίων",
          seat: "Χανιά",
        },
        {
          id: 18,
          iso31662: "GR-91",
          name: "Ηρακλείου",
          seat: "Ηράκλειο",
        },
        {
          id: 19,
          iso31662: "GR-92",
          name: "Λασιθίου",
          seat: "Άγιος Νικόλαος",
        },
        {
          id: 20,
          iso31662: "GR-93",
          name: "Ρεθύμνου",
          seat: "Ρέθυμνο",
        },
      ],
    },
    {
      id: 5,
      iso31662: "GR-A",
      name: "Ανατολική Μακεδονία και Θράκη",
      seat: "Κομοτηνή",
      prefectures: [
        {
          id: 21,
          iso31662: "GR-52",
          name: "Δράμας",
          seat: "Δράμα",
        },
        {
          id: 22,
          iso31662: "GR-71",
          name: "Έβρου",
          seat: "Αλεξανδρούπολη",
        },
        {
          id: 23,
          iso31662: "GR-55",
          name: "Καβάλας",
          seat: "Καβάλα",
        },
        {
          id: 24,
          iso31662: "GR-73",
          name: "Ροδόπης",
          seat: "Κομοτηνή",
        },
        {
          id: 25,
          iso31662: "GR-72",
          name: "Ξάνθης",
          seat: "Ξάνθη",
        },
      ],
    },
    {
      id: 6,
      iso31662: "GR-D",
      name: "Ήπειρος",
      seat: "Ιωάννινα",
      prefectures: [
        {
          id: 26,
          iso31662: "GR-31",
          name: "Άρτας",
          seat: "Άρτα",
        },
        {
          id: 27,
          iso31662: "GR-33",
          name: "Ιωαννίνων",
          seat: "Ιωάννινα",
        },
        {
          id: 28,
          iso31662: "GR-34",
          name: "Πρέβεζας",
          seat: "Πρέβεζα",
        },
        {
          id: 29,
          iso31662: "GR-32",
          name: "Θεσπρωτίας",
          seat: "Ηγουμενίτσα",
        },
      ],
    },
    {
      id: 7,
      iso31662: "GR-F",
      name: "Ιόνια νησιά",
      seat: "Κέρκυρα",
      prefectures: [
        {
          id: 30,
          iso31662: "GR-22",
          name: "Κέρκυρας",
          seat: "Κέρκυρα",
        },
        {
          id: 31,
          iso31662: "GR-23",
          name: "Κεφαλληνίας",
          seat: "Αργοστόλι",
        },
        {
          id: 32,
          iso31662: "GR-24",
          name: "Λευκάδας",
          seat: "Λευκάδα",
        },
        {
          id: 33,
          iso31662: "GR-21",
          name: "Ζακύνθου",
          seat: "Ζάκυνθος",
        },
      ],
    },
    {
      id: 8,
      iso31662: "GR-K",
      name: "Βόρειο Αιγαίο",
      seat: "Μυτιλήνη",
      prefectures: [
        {
          id: 34,
          iso31662: "GR-85",
          name: "Χίου",
          seat: "Χίος",
        },
        {
          id: 35,
          iso31662: "GR-83",
          name: "Λέσβου",
          seat: "Μυτιλήνη",
        },
        {
          id: 36,
          iso31662: "GR-84",
          name: "Σάμου",
          seat: "Σάμος",
        },
      ],
    },
    {
      id: 9,
      iso31662: "GR-J",
      name: "Πελοπόννησος",
      seat: "Τρίπολη",
      prefectures: [
        {
          id: 37,
          iso31662: "GR-12",
          name: "Αρκαδίας",
          seat: "Τρίπολη",
        },
        {
          id: 38,
          iso31662: "GR-11",
          name: "Αργολίδας",
          seat: "Ναύπλιο",
        },
        {
          id: 39,
          iso31662: "GR-15",
          name: "Κορινθίας",
          seat: "Κόρινθος",
        },
        {
          id: 40,
          iso31662: "GR-16",
          name: "Λακωνίας",
          seat: "Σπάρτη",
        },
        {
          id: 41,
          iso31662: "GR-17",
          name: "Μεσσηνίας",
          seat: "Καλαμάτα",
        },
      ],
    },
    {
      id: 10,
      iso31662: "GR-L",
      name: "Νότιο Αιγαίο",
      seat: "Ερμούπολη",
      prefectures: [
        {
          id: 42,
          iso31662: "GR-82",
          name: "Κυκλάδων",
          seat: "Ερμούπολη",
        },
        {
          id: 43,
          iso31662: "GR-81",
          name: "Δωδεκανήσου",
          seat: "Ρόδος",
        },
      ],
    },
    {
      id: 11,
      iso31662: "GR-E",
      name: "Θεσσαλία",
      seat: "Λάρισα",
      prefectures: [
        {
          id: 44,
          iso31662: "GR-41",
          name: "Καρδίτσας",
          seat: "Καρδίτσα",
        },
        {
          id: 45,
          iso31662: "GR-42",
          name: "Λάρισας",
          seat: "Λάρισα",
        },
        {
          id: 46,
          iso31662: "GR-43",
          name: "Μαγνησίας",
          seat: "Βόλος",
        },
        {
          id: 47,
          iso31662: "GR-44",
          name: "Τρικάλων",
          seat: "Τρίκαλα",
        },
      ],
    },
    {
      id: 12,
      iso31662: "GR-G",
      name: "Δυτική Ελλάδα",
      seat: "Πάτρα",
      prefectures: [
        {
          id: 48,
          iso31662: "GR-13",
          name: "Αχαΐας",
          seat: "Πάτρα",
        },
        {
          id: 49,
          iso31662: "GR-01",
          name: "Αιτωλοακαρνανίας",
          seat: "Μεσολόγγι",
        },
        {
          id: 50,
          iso31662: "GR-14",
          name: "Ηλείας",
          seat: "Πύργος",
        },
      ],
    },
    {
      id: 13,
      iso31662: "GR-C",
      name: "Δυτική Μακεδονία",
      seat: "Κοζάνη",
      prefectures: [
        {
          id: 51,
          iso31662: "GR-63",
          name: "Φλώρινας",
          seat: "Φλώρινα",
        },
        {
          id: 52,
          iso31662: "GR-51",
          name: "Γρεβενών",
          seat: "Γρεβενά",
        },
        {
          id: 53,
          iso31662: "GR-56",
          name: "Καστοριάς",
          seat: "Καστοριά",
        },
        {
          id: 54,
          iso31662: "GR-58",
          name: "Κοζάνης",
          seat: "Κοζάνη",
        },
      ],
    },
  ],
  en: [
    {
      id: 1,
      iso31662: "GR-I",
      name: "Attica",
      seat: "Athens",
      prefectures: [
        {
          id: 1,
          iso31662: "GR-A1",
          name: "Athens",
          seat: "Athens",
        },
        {
          id: 2,
          iso31662: "GR-A2",
          name: "East Attica",
          seat: "Pallini",
        },
        {
          id: 3,
          iso31662: "GR-A3",
          name: "West Attica",
          seat: "Elefsis",
        },
        {
          id: 4,
          iso31662: "GR-A1",
          name: "Piraeus",
          seat: "Piraeus",
        },
      ],
    },
    {
      id: 2,
      iso31662: "GR-H",
      name: "Central Greece",
      seat: "Lamia",
      prefectures: [
        {
          id: 5,
          iso31662: "GR-04",
          name: "Euboea",
          seat: "Chalkis",
        },
        {
          id: 6,
          iso31662: "GR-05",
          name: "Evrytania",
          seat: "Karpenisi",
        },
        {
          id: 7,
          iso31662: "GR-07",
          name: "Phocis",
          seat: "Amfissa",
        },
        {
          id: 8,
          iso31662: "GR-06",
          name: "Phthiotis",
          seat: "Lamia",
        },
        {
          id: 9,
          iso31662: "GR-03",
          name: "Boeotia",
          seat: "Livadia",
        },
      ],
    },
    {
      id: 3,
      iso31662: "GR-B",
      name: "Central Macedonia",
      seat: "Thessaloniki",
      prefectures: [
        {
          id: 10,
          iso31662: "GR-64",
          name: "Chalkidiki",
          seat: "Polygyros",
        },
        {
          id: 11,
          iso31662: "GR-53",
          name: "Imathia",
          seat: "Veroia",
        },
        {
          id: 12,
          iso31662: "GR-57",
          name: "Kilkis",
          seat: "Kilkis",
        },
        {
          id: 13,
          iso31662: "GR-59",
          name: "Pella",
          seat: "Edessa",
        },
        {
          id: 14,
          iso31662: "GR-61",
          name: "Pieria",
          seat: "Katerini",
        },
        {
          id: 15,
          iso31662: "GR-62",
          name: "Serres",
          seat: "Serres",
        },
        {
          id: 16,
          iso31662: "GR-54",
          name: "Thessaloniki",
          seat: "Thessaloniki",
        },
      ],
    },
    {
      id: 4,
      iso31662: "GR-M",
      name: "Crete",
      seat: "Heraklion",
      prefectures: [
        {
          id: 17,
          iso31662: "GR-94",
          name: "Chania",
          seat: "Chania",
        },
        {
          id: 18,
          iso31662: "GR-91",
          name: "Herakleion",
          seat: "Herakleion",
        },
        {
          id: 19,
          iso31662: "GR-92",
          name: "Lasithi",
          seat: "Agios Nikolaos",
        },
        {
          id: 20,
          iso31662: "GR-93",
          name: "Rethymno",
          seat: "Rethymno",
        },
      ],
    },
    {
      id: 5,
      iso31662: "GR-A",
      name: "Eastern Macedonia and Thrace",
      seat: "Komotini",
      prefectures: [
        {
          id: 21,
          iso31662: "GR-52",
          name: "Drama",
          seat: "Drama",
        },
        {
          id: 22,
          iso31662: "GR-71",
          name: "Evros",
          seat: "Alexandroupolis",
        },
        {
          id: 23,
          iso31662: "GR-55",
          name: "Kavala",
          seat: "Kavala",
        },
        {
          id: 24,
          iso31662: "GR-73",
          name: "Rhodope",
          seat: "Komotini",
        },
        {
          id: 25,
          iso31662: "GR-72",
          name: "Xanthi",
          seat: "Xanthi",
        },
      ],
    },
    {
      id: 6,
      iso31662: "GR-D",
      name: "Epirus",
      seat: "Ioannina",
      prefectures: [
        {
          id: 26,
          iso31662: "GR-31",
          name: "Arta",
          seat: "Arta",
        },
        {
          id: 27,
          iso31662: "GR-33",
          name: "Ioannina",
          seat: "Ioannina",
        },
        {
          id: 28,
          iso31662: "GR-34",
          name: "Preveza",
          seat: "Preveza",
        },
        {
          id: 29,
          iso31662: "GR-32",
          name: "Thesprotia",
          seat: "Igoumenitsa",
        },
      ],
    },
    {
      id: 7,
      iso31662: "GR-F",
      name: "Ionian Islands",
      seat: "Corfu",
      prefectures: [
        {
          id: 30,
          iso31662: "GR-22",
          name: "Corfu",
          seat: "Corfu",
        },
        {
          id: 31,
          iso31662: "GR-23",
          name: "Cephalonia",
          seat: "Argostoli",
        },
        {
          id: 32,
          iso31662: "GR-24",
          name: "Lefkada",
          seat: "Lefkas",
        },
        {
          id: 33,
          iso31662: "GR-21",
          name: "Zakynthos",
          seat: "Zakynthos",
        },
      ],
    },
    {
      id: 8,
      iso31662: "GR-K",
      name: "North Aegean",
      seat: "Mytilene",
      prefectures: [
        {
          id: 34,
          iso31662: "GR-85",
          name: "Chios",
          seat: "Chios",
        },
        {
          id: 35,
          iso31662: "GR-83",
          name: "Lesbos",
          seat: "Mytilini",
        },
        {
          id: 36,
          iso31662: "GR-84",
          name: "Samos",
          seat: "Samos",
        },
      ],
    },
    {
      id: 9,
      iso31662: "GR-J",
      name: "Peloponnese",
      seat: "Tripoli",
      prefectures: [
        {
          id: 37,
          iso31662: "GR-12",
          name: "Arcadia",
          seat: "Tripoli",
        },
        {
          id: 38,
          iso31662: "GR-11",
          name: "Argolis",
          seat: "Nafplio",
        },
        {
          id: 39,
          iso31662: "GR-15",
          name: "Corinthia",
          seat: "Corinthos",
        },
        {
          id: 40,
          iso31662: "GR-16",
          name: "Laconia",
          seat: "Sparta",
        },
        {
          id: 41,
          iso31662: "GR-17",
          name: "Messenia",
          seat: "Kalamata",
        },
      ],
    },
    {
      id: 10,
      iso31662: "GR-L",
      name: "South Aegean",
      seat: "Ermoupoli",
      prefectures: [
        {
          id: 42,
          iso31662: "GR-82",
          name: "Cyclades",
          seat: "Ermoupolis",
        },
        {
          id: 43,
          iso31662: "GR-81",
          name: "Dodecanese",
          seat: "Rhodes",
        },
      ],
    },
    {
      id: 11,
      iso31662: "GR-E",
      name: "Thessaly",
      seat: "Larissa",
      prefectures: [
        {
          id: 44,
          iso31662: "GR-41",
          name: "Karditsa",
          seat: "Karditsa",
        },
        {
          id: 45,
          iso31662: "GR-42",
          name: "Larissa",
          seat: "Larissa",
        },
        {
          id: 46,
          iso31662: "GR-43",
          name: "Magnesia",
          seat: "Volos",
        },
        {
          id: 47,
          iso31662: "GR-44",
          name: "Trikala",
          seat: "Trikala",
        },
      ],
    },
    {
      id: 12,
      iso31662: "GR-G",
      name: "Western Greece",
      seat: "Patras",
      prefectures: [
        {
          id: 48,
          iso31662: "GR-13",
          name: "Achaea",
          seat: "Patra",
        },
        {
          id: 49,
          iso31662: "GR-01",
          name: "Aetolia-Acarnania",
          seat: "Missolonghi",
        },
        {
          id: 50,
          iso31662: "GR-14",
          name: "Elis",
          seat: "Pyrgos",
        },
      ],
    },
    {
      id: 13,
      iso31662: "GR-C",
      name: "Western Macedonia",
      seat: "Kozani",
      prefectures: [
        {
          id: 51,
          iso31662: "GR-63",
          name: "Florina",
          seat: "Florina",
        },
        {
          id: 52,
          iso31662: "GR-51",
          name: "Grevena",
          seat: "Grevena",
        },
        {
          id: 53,
          iso31662: "GR-56",
          name: "Kastoria",
          seat: "Kastoria",
        },
        {
          id: 54,
          iso31662: "GR-58",
          name: "Kozani",
          seat: "Kozani",
        },
      ],
    },
  ],
};

export const regionsWithPrefecturesAndMountAthos: RegionsWithPrefectures = {
  el: [
    ...regionsWithPrefectures.el,
    {
      id: 14,
      iso31662: "GR-69",
      name: "Άγιον Όρος",
      seat: "Καρυές",
      prefectures: [
        {
          id: 55,
          iso31662: "GR-69",
          name: "Άγιον Όρος",
          seat: "Καρυές",
        },
      ],
    },
  ],
  en: [
    ...regionsWithPrefectures.en,
    {
      id: 14,
      iso31662: "GR-69",
      name: "Mount Athos",
      seat: "Karyes",
      prefectures: [
        {
          id: 55,
          iso31662: "GR-69",
          name: "Mount Athos",
          seat: "Karyes",
        },
      ],
    },
  ],
};

export const regions: Regions = {
  el: regionsWithPrefectures.el.map(({ id, name, seat, iso31662 }) => ({ id, name, seat, iso31662 })),
  en: regionsWithPrefectures.en.map(({ id, name, seat, iso31662 }) => ({ id, name, seat, iso31662 })),
};

export const regionsWithMountAthos: Regions = {
  el: [
    ...regions.el,
    {
      id: 14,
      iso31662: "GR-69",
      name: "Άγιον Όρος",
      seat: "Καρυές",
    },
  ],
  en: [
    ...regions.en,
    {
      id: 14,
      iso31662: "GR-69",
      name: "Mount Athos",
      seat: "Karyes",
    },
  ],
};

export const prefectures: Prefectures = {
  el: regionsWithPrefectures.el.map((region) => region.prefectures).flat(),
  en: regionsWithPrefectures.en.map((region) => region.prefectures).flat(),
};

export const prefecturesWithMountAthos: Prefectures = {
  el: regionsWithPrefecturesAndMountAthos.el.map((region) => region.prefectures).flat(),
  en: regionsWithPrefecturesAndMountAthos.en.map((region) => region.prefectures).flat(),
};
