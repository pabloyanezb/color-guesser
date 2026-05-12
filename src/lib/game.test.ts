import { hslToHex, generateRandomHSL, calculateScore, generateRandomColor, generateColorSequence, getRotationDelay } from "@/lib/game";

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

  describe("generateRandomColor", () => {
    it("returns a hex string", () => {
      const result = generateRandomColor();
      expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  describe("generateColorSequence", () => {
    it("returns count + 1 colors", () => {
      const result = generateColorSequence(3, "#ff0000");
      expect(result).toHaveLength(4);
    });

    it("ends with the target color", () => {
      const result = generateColorSequence(3, "#00ff00");
      expect(result[result.length - 1]).toBe("#00ff00");
    });
  });

  describe("getRotationDelay", () => {
    it("calculates delay with defaults", () => {
      expect(getRotationDelay(0)).toBe(30);
      expect(getRotationDelay(1)).toBe(90);
      expect(getRotationDelay(2)).toBe(150);
    });

    it("accepts custom baseDelay and increment", () => {
      expect(getRotationDelay(1, 100, 50)).toBe(150);
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
