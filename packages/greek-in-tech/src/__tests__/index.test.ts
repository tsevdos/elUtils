import GiT, { all, random, getEntry } from "../index";

describe("Greek in Tech", () => {
  describe("all", () => {
    it("must be an array with length more than zero", () => {
      expect(Array.isArray(GiT.all)).toBe(true);
      expect(GiT.all.length).toBe(66);

      expect(Array.isArray(all)).toBe(true);
      expect(all.length).toBe(66);
    });

    it('must includes the "Daemon" entry', () => {
      const entry = all[1];

      expect(GiT.all).toContain(entry);
      expect(all).toContain(entry);
    });
  });

  describe("random", () => {
    it("must return a random entry from the list", () => {
      const entry = random();

      expect(GiT.all).toContain(entry);
      expect(all).toContain(entry);
    });
  });

  describe("getEntry", () => {
    it("the entry must be an object with correct properties", () => {
      const entry3 = GiT.getEntry(3);
      expect(typeof entry3).toBe("object");
      expect(entry3).toHaveProperty("id");
      expect(entry3).toHaveProperty("title");
      expect(entry3).toHaveProperty("description");
      expect(entry3).toHaveProperty("categories");
      expect(entry3).toHaveProperty("references");
      expect(Array.isArray(entry3.references)).toBe(true);

      const entry2 = getEntry(2);
      expect(typeof entry2).toBe("object");
      expect(entry2).toHaveProperty("id");
      expect(entry2).toHaveProperty("title");
      expect(entry2).toHaveProperty("description");
      expect(entry2).toHaveProperty("categories");
      expect(entry2).toHaveProperty("references");
      expect(Array.isArray(entry2.references)).toBe(true);
    });

    it("must return a specific entry", () => {
      const entry2 = GiT.getEntry(2);
      expect(entry2.id).toBe(2);
      expect(entry2.title).toBe("Daemon");
      expect(entry2.description).toBe(
        "The term coined by programmers of MIT's Project MAC, was inspired by the physicist James Clerk Maxwell's demon. It originated as an imaginary being from a thought experiment that constantly works in the background sorting molecules. In Greek mythology, a daemon is a supernatural being working in the background, with no particular bias towards good or evil. The daemon concept was subsequently adopted by Unix systems, however, BSD and some of its derivatives have used a Christian interpretation of the mythological deamon as their mascot rather than a Greek daemon.",
      );
      expect(entry2.categories).toEqual(["OS", "unix", "linux", "open source"]);
      expect(entry2.references[0].name).toBe("Wikipedia");
      expect(entry2.references[0].source).toBe("https://en.wikipedia.org/wiki/Daemon_(computing)#Etymology");

      const entry1 = getEntry(1);
      expect(entry1.id).toBe(1);
      expect(entry1.title).toBe("Cron (job scheduler)");
      const description1 =
        "It comes from the Greek word for time, chronos (χρόνος). Chronos is the personification of time in early Greek mythology and literature. He later appears in the Renaissance as Father Time.";
      expect(entry1.description).toBe(description1);
      expect(entry1.categories).toEqual(["OS", "unix", "linux", "open source"]);
      expect(entry1.references[0].name).toBe("Wikipedia");
      expect(entry1.references[0].source).toBe("https://en.wikipedia.org/wiki/Cron");
    });

    it("must throw an error if entry doesnt exists", () => {
      expect(() => GiT.getEntry(10001)).toThrow("Invalid ID");
      expect(() => getEntry(10001)).toThrow("Invalid ID");
    });
  });
});
