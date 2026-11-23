import { describe, expect, it } from "vitest";
import { puppies } from "../lib/data";
import { rank, type Answers } from "../lib/match";

const pool = puppies.filter((p) => !p.gone);
const base: Answers = { home: "apartment", kids: "none", activity: "medium", grooming: "regular", timing: "either" };

describe("match quiz ranking", () => {
  it("returns every puppy, sorted by score, within 0-100", () => {
    const r = rank(base, pool);
    expect(r).toHaveLength(pool.length);
    for (let i = 1; i < r.length; i++) expect(r[i - 1].score).toBeGreaterThanOrEqual(r[i].score);
    r.forEach((m) => {
      expect(m.score).toBeGreaterThanOrEqual(0);
      expect(m.score).toBeLessThanOrEqual(100);
      expect(m.reasons.length).toBeGreaterThan(0);
    });
  });

  it("prefers gentler breeds when there are young children", () => {
    const top = rank({ ...base, kids: "young" }, pool)[0].puppy;
    expect(top.breed.toLowerCase()).not.toMatch(/pomeranian/);
    expect(top.breed.toLowerCase()).not.toMatch(/teacup/);
  });

  it("does not penalise everyone when no pup can meet the timing wish", () => {
    const allImported = pool.every((p) => p.origin === "imported");
    if (allImported) {
      const asap = rank({ ...base, timing: "now" }, pool)[0].score;
      const either = rank({ ...base, timing: "either" }, pool)[0].score;
      expect(asap).toBe(either);
    }
  });
});
