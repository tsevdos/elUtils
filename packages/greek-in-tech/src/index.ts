import entries from "../data/entries.json";

type Entry = {
  id: number;
  title: string;
  description: string;
  categories: string[];
  references: { name: string; source: string }[];
};

export const all: Entry[] = entries;

export const random = (): Entry => entries[Math.floor(Math.random() * entries.length)];

export const getEntry = (id = 1): Entry => {
  const entry = entries[id - 1];

  if (!entry) {
    throw new Error("Invalid ID");
  }

  return entry;
};

const GreekInTech = {
  all,
  random,
  getEntry,
};

export default GreekInTech;
