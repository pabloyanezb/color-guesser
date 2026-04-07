import chroma from "chroma-js";
import type { HSL, ColorSequence } from "@/types";

export type { HSL, ColorSequence } from "@/types";

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

export function generateRandomColor(): string {
  const hsl = generateRandomHSL();
  return hslToHex(hsl);
}

export function generateColorSequence(count: number, targetColor: string): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(generateRandomColor());
  }
  colors.push(targetColor);
  return colors;
}

export function getRotationDelay(index: number, baseDelay: number = 30, increment: number = 60): number {
  return baseDelay + (index * increment);
}
