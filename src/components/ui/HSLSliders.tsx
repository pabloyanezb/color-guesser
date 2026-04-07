"use client";

import type { HSL } from "@/types";

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
    <div className="flex items-center gap-3 w-full">
      <span className="text-xs uppercase font-bold w-20">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-3 rounded-full appearance-none cursor-pointer bg-zinc-300"
      />
      <span className="text-xs font-mono w-10 text-right">
        {Math.round(value)}
        {unit}
      </span>
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
