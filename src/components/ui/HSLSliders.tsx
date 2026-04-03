"use client";

import { HSL } from "@/lib/game";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, unit, onChange }: SliderProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <div className="flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="font-mono">
          {Math.round(value)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 rounded-full appearance-none cursor-pointer bg-zinc-300"
      />
    </div>
  );
}

interface HSLSlidersProps {
  hsl: HSL;
  onChange: (hsl: HSL) => void;
}

export function HSLSliders({ hsl, onChange }: HSLSlidersProps) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <Slider
        label="Hue"
        value={hsl.h}
        min={0}
        max={360}
        unit="°"
        onChange={(h) => onChange({ ...hsl, h })}
      />
      <Slider
        label="Saturation"
        value={hsl.s}
        min={0}
        max={100}
        unit="%"
        onChange={(s) => onChange({ ...hsl, s })}
      />
      <Slider
        label="Lightness"
        value={hsl.l}
        min={0}
        max={100}
        unit="%"
        onChange={(l) => onChange({ ...hsl, l })}
      />
    </div>
  );
}
