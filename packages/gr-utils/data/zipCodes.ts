export const zipCodes = {
  el: [
    {
      zipCode: 30015,
      prefecture: "Αιτωλοακαρνανίας",
      area: "Άγιος Ανδρέας Γαβαλού",
      address: "Άγιος Ανδρέας Γαβαλού",
    },
  ],
} as const;

export const validZipCodes = zipCodes.el.map(({ zipCode }) => zipCode);
