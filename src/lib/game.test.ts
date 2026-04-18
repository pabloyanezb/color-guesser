import { hslToHex, generateRandomHSL, calculateScore } from "@/lib/game";

describe("game utils", () => {
  describe("hslToHex", () => {
    it("converts HSL to hex correctly", () => {
      const result = hslToHex({ h: 0, s: 100, l: 50 });
      expect(result).toBe("#ff0000");
    });

    it("handles neutral colors", () => {
      const result = hslToHex({ h: 0, s: 0, l: 50 });
      expect(result).toBe("#808080");
    });
  });

  describe("generateRandomHSL", () => {
    it("generates valid HSL values", () => {
      const result = generateRandomHSL();

      expect(result.h).toBeGreaterThanOrEqual(0);
      expect(result.h).toBeLessThan(360);

      expect(result.s).toBeGreaterThanOrEqual(50);
      expect(result.s).toBeLessThanOrEqual(90);

      expect(result.l).toBeGreaterThanOrEqual(40);
      expect(result.l).toBeLessThanOrEqual(70);
    });
  });

  describe("calculateScore", () => {
    it("returns high score for similar colors", () => {
      const score = calculateScore("#ff0000", "#ff0001");
      expect(score).toBeGreaterThan(90);
    });

    it("returns low score for different colors", () => {
      const score = calculateScore("#ff0000", "#0000ff");
      expect(score).toBeLessThan(50);
    });

    it("returns 100 for identical colors", () => {
      const score = calculateScore("#ff0000", "#ff0000");
      expect(score).toBe(100);
    });
  });
});