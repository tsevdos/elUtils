export const zipCodes = {
  el: [
    {
      zipCodes: [30015],
      prefecture: "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",
      area: "Άγιος Ανδρέας Γαβαλού",
    },
    {
      zipCodes: [30021],
      prefecture: "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",
      area: "Άγιος Βλάσιος",
    },
    {
      zipCodes: [30027],
      prefecture: "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",
      area: "Άγιος Κωνσταντίνος",
    },
    {
      zipCodes: [30131, 30132, 30133, 30150],
      prefecture: "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",
      area: "Αγρίνιο",
    },
    {
      zipCodes: [30400],
      prefecture: "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",
      area: "Αιτωλικό",
    },
    {
      zipCodes: [30002],
      prefecture: "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",
      area: "Άκτιο",
    },
    {
      zipCodes: [30500],
      prefecture: "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",
      area: "Αμφιλοχία",
    },
    {
      zipCodes: [30020],
      prefecture: "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",
      area: "Αντίρριο",
    },
  ],
} as const;

export const validZipCodes = zipCodes.el.map(({ zipCode }) => zipCode);
