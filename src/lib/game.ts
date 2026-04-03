import chroma from "chroma-js";

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hslToHex(hsl: HSL): string {
  return chroma.hsl(hsl.h, hsl.s / 100, hsl.l / 100).hex();
}

export function generateRandomHSL(): HSL {
  return {
    h: Math.floor(Math.random() * 360),
    s: 50 + Math.floor(Math.random() * 40),
    l: 40 + Math.floor(Math.random() * 30),
  };
}

export function calculateScore(original: string, guess: string): number {
  const delta = chroma.deltaE(original, guess);
  return Math.max(0, Math.round(100 - delta));
}
