"use client";

import type { HSL } from "@/types";

const HUE_STOPS = [
  { deg: 0, color: "hsl(0, 100%, 50%)" },
  { deg: 60, color: "hsl(60, 100%, 50%)" },
  { deg: 120, color: "hsl(120, 100%, 50%)" },
  { deg: 180, color: "hsl(180, 100%, 50%)" },
  { deg: 240, color: "hsl(240, 100%, 50%)" },
  { deg: 300, color: "hsl(300, 100%, 50%)" },
  { deg: 360, color: "hsl(360, 100%, 50%)" },
];

const HUE_GRADIENT = `linear-gradient(to right, ${HUE_STOPS.map((s) => s.color).join(", ")})`;

function getSaturationGradient(h: number, l: number) {
  const low = `hsl(${h}, 0%, ${l}%)`;
  const high = `hsl(${h}, 100%, ${l}%)`;
  return `linear-gradient(to right, ${low}, ${high})`;
}

function getLightnessGradient(h: number, s: number) {
  const dark = `hsl(${h}, ${s}%, 0%)`;
  const mid = `hsl(${h}, ${s}%, 50%)`;
  const light = `hsl(${h}, ${s}%, 100%)`;
  return `linear-gradient(to right, ${dark}, ${mid}, ${light})`;
}

interface SliderConfig {
  label: string;
  value: number;
  min: number;
  max: number;
  getGradient: () => string;
  onChange: (value: number) => void;
}

function Slider({ label, value, min, max, getGradient, onChange }: SliderConfig) {
  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-xs uppercase font-bold w-20">{label}</span>
      <div
        className="relative flex-1 h-6 border-2 border-black"
        style={{ background: getGradient() }}
      >
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full appearance-none cursor-pointer slider-gradient"
        />
      </div>
    </div>
  );
}

interface HSLSlidersProps {
  hsl: HSL;
  onChange: (hsl: HSL) => void;
}

export function HSLSliders({ hsl, onChange }: HSLSlidersProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Slider
        label="Hue"
        value={hsl.h}
        min={0}
        max={360}
        getGradient={() => HUE_GRADIENT}
        onChange={(h) => onChange({ ...hsl, h })}
      />
      <Slider
        label="Saturation"
        value={hsl.s}
        min={0}
        max={100}
        getGradient={() => getSaturationGradient(hsl.h, hsl.l)}
        onChange={(s) => onChange({ ...hsl, s })}
      />
      <Slider
        label="Lightness"
        value={hsl.l}
        min={0}
        max={100}
        getGradient={() => getLightnessGradient(hsl.h, hsl.s)}
        onChange={(l) => onChange({ ...hsl, l })}
      />
    </div>
  );
}
