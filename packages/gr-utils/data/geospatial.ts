type Region = {
  id: number;
  iso31662: string;
  name: string;
  seat: string;
};
type Prefecture = {
  id: number;
  name: string;
  seat: string;
};
type RegionWithPrefectures = Region & { prefectures: Prefecture[] };
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
          name: "Αθηνών",
          seat: "Αθήνα",
        },
        {
          id: 2,
          name: "Ανατολικής Αττικής",
          seat: "Παλλήνη",
        },
        {
          id: 3,
          name: "Δυτικής Αττικής",
          seat: "Ελευσίνα",
        },
        {
          id: 4,
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
          name: "Ευβοίας",
          seat: "Χαλκίδα",
        },
        {
          id: 6,
          name: "Ευρυτανίας",
          seat: "Καρπενήσι",
        },
        {
          id: 7,
          name: "Φωκίδας",
          seat: "Άμφισσα",
        },
        {
          id: 8,
          name: "Φθιώτιδας",
          seat: "Λαμία",
        },
        {
          id: 9,
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
          name: "Χαλκιδικής",
          seat: "Πολύγυρος",
        },
        {
          id: 11,
          name: "Ημαθίας",
          seat: "Βέροια",
        },
        {
          id: 12,
          name: "Κιλκίς",
          seat: "Κιλκίς",
        },
        {
          id: 13,
          name: "Πέλλας",
          seat: "Έδεσσα",
        },
        {
          id: 14,
          name: "Πιερίας",
          seat: "Κατερίνη",
        },
        {
          id: 15,
          name: "Σερρών",
          seat: "Σέρρες",
        },
        {
          id: 16,
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
          name: "Χανίων",
          seat: "Χανιά",
        },
        {
          id: 18,
          name: "Ηρακλείου",
          seat: "Ηράκλειο",
        },
        {
          id: 19,
          name: "Λασιθίου",
          seat: "Άγιος Νικόλαος",
        },
        {
          id: 20,
          name: "Ρεθύμνης",
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
          name: "Δράμας",
          seat: "Δράμα",
        },
        {
          id: 22,
          name: "Έβρου",
          seat: "Αλεξανδρούπολη",
        },
        {
          id: 23,
          name: "Καβάλας",
          seat: "Καβάλα",
        },
        {
          id: 24,
          name: "Ροδόπης",
          seat: "Κομοτηνή",
        },
        {
          id: 25,
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
          name: "Άρτας",
          seat: "Άρτα",
        },
        {
          id: 27,
          name: "Ιωαννίνων",
          seat: "Ιωάννινα",
        },
        {
          id: 28,
          name: "Πρέβεζας",
          seat: "Πρέβεζα",
        },
        {
          id: 29,
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
          name: "Κέρκυρας",
          seat: "Κέρκυρα",
        },
        {
          id: 31,
          name: "Κεφαλληνίας",
          seat: "Αργοστόλι",
        },
        {
          id: 32,
          name: "Λευκάδας",
          seat: "Λευκάδα",
        },
        {
          id: 33,
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
          name: "Χίου",
          seat: "Χίος",
        },
        {
          id: 35,
          name: "Λέσβου",
          seat: "Μυτιλήνη",
        },
        {
          id: 36,
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
          name: "Αρκαδίας",
          seat: "Τρίπολη",
        },
        {
          id: 38,
          name: "Αργολίδας",
          seat: "Ναύπλιο",
        },
        {
          id: 39,
          name: "Κορινθίας",
          seat: "Κόρινθος",
        },
        {
          id: 40,
          name: "Λακωνίας",
          seat: "Σπάρτη",
        },
        {
          id: 41,
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
          name: "Κυκλάδων",
          seat: "Ερμούπολη",
        },
        {
          id: 43,
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
          name: "Καρδίτσας",
          seat: "Καρδίτσα",
        },
        {
          id: 45,
          name: "Λάρισας",
          seat: "Λάρισα",
        },
        {
          id: 46,
          name: "Μαγνησίας",
          seat: "Βόλος",
        },
        {
          id: 47,
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
          name: "Αχαΐας",
          seat: "Πάτρα",
        },
        {
          id: 49,
          name: "Αιτωλοακαρνανίας",
          seat: "Μεσολόγγι",
        },
        {
          id: 50,
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
          name: "Φλώρινας",
          seat: "Φλώρινα",
        },
        {
          id: 52,
          name: "Γρεβενών",
          seat: "Γρεβενά",
        },
        {
          id: 53,
          name: "Καστοριάς",
          seat: "Καστοριά",
        },
        {
          id: 54,
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
          name: "Athens Prefecture",
          seat: "Athens",
        },
        {
          id: 2,
          name: "East Attica",
          seat: "Pallini",
        },
        {
          id: 3,
          name: "West Attica",
          seat: "Elefsis",
        },
        {
          id: 4,
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
          name: "Euboea",
          seat: "Chalkis",
        },
        {
          id: 6,
          name: "Evrytania",
          seat: "Karpenisi",
        },
        {
          id: 7,
          name: "Phocis",
          seat: "Amfissa",
        },
        {
          id: 8,
          name: "Phthiotis",
          seat: "Lamia",
        },
        {
          id: 9,
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
          name: "Chalkidiki",
          seat: "Polygyros",
        },
        {
          id: 11,
          name: "Imathia",
          seat: "Veroia",
        },
        {
          id: 12,
          name: "Kilkis",
          seat: "Kilkis",
        },
        {
          id: 13,
          name: "Pella",
          seat: "Edessa",
        },
        {
          id: 14,
          name: "Pieria",
          seat: "Katerini",
        },
        {
          id: 15,
          name: "Serres",
          seat: "Serres",
        },
        {
          id: 16,
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
          name: "Chania",
          seat: "Chania",
        },
        {
          id: 18,
          name: "Herakleion",
          seat: "Herakleion",
        },
        {
          id: 19,
          name: "Lasithi",
          seat: "Agios Nikolaos",
        },
        {
          id: 20,
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
          name: "Drama",
          seat: "Drama",
        },
        {
          id: 22,
          name: "Evros",
          seat: "Alexandroupolis",
        },
        {
          id: 23,
          name: "Kavala",
          seat: "Kavala",
        },
        {
          id: 24,
          name: "Rhodope",
          seat: "Komotini",
        },
        {
          id: 25,
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
          name: "Arta",
          seat: "Arta",
        },
        {
          id: 27,
          name: "Ioannina",
          seat: "Ioannina",
        },
        {
          id: 28,
          name: "Preveza",
          seat: "Preveza",
        },
        {
          id: 29,
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
          name: "Corfu",
          seat: "Corfu",
        },
        {
          id: 31,
          name: "Cephalonia",
          seat: "Argostoli",
        },
        {
          id: 32,
          name: "Lefkada",
          seat: "Lefkas",
        },
        {
          id: 33,
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
          name: "Chios",
          seat: "Chios",
        },
        {
          id: 35,
          name: "Lesbos",
          seat: "Mytilini",
        },
        {
          id: 36,
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
          name: "Arcadia",
          seat: "Tripoli",
        },
        {
          id: 38,
          name: "Argolis",
          seat: "Nafplio",
        },
        {
          id: 39,
          name: "Corinthia",
          seat: "Corinthos",
        },
        {
          id: 40,
          name: "Laconia",
          seat: "Sparta",
        },
        {
          id: 41,
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
          name: "Cyclades",
          seat: "Ermoupolis",
        },
        {
          id: 43,
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
          name: "Karditsa",
          seat: "Karditsa",
        },
        {
          id: 45,
          name: "Larissa",
          seat: "Larissa",
        },
        {
          id: 46,
          name: "Magnesia",
          seat: "Volos",
        },
        {
          id: 47,
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
          name: "Achaea",
          seat: "Patra",
        },
        {
          id: 49,
          name: "Aetolia-Acarnania",
          seat: "Missolonghi",
        },
        {
          id: 50,
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
          name: "Florina",
          seat: "Florina",
        },
        {
          id: 52,
          name: "Grevena",
          seat: "Grevena",
        },
        {
          id: 53,
          name: "Kastoria",
          seat: "Kastoria",
        },
        {
          id: 54,
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
