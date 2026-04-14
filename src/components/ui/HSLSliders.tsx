"use client";

import type { HSL } from "@/types";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  gradient?: string;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, unit, gradient, onChange }: SliderProps) {
  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-xs uppercase font-bold w-20">{label}</span>
      <div
        className="relative flex-1 h-3 rounded-full"
        style={{ background: gradient }}
      >
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-3 rounded-full appearance-none cursor-pointer slider-gradient"
        />
      </div>
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
  const hueGradient =
    "linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))";

  const saturationGradient = `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`;

  const lightnessGradient = `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 50%), hsl(${hsl.h}, ${hsl.s}%, 100%))`;

  return (
    <div className="flex flex-col gap-3 w-full">
      <Slider
        label="Hue"
        value={hsl.h}
        min={0}
        max={360}
        unit="°"
        gradient={hueGradient}
        onChange={(h) => onChange({ ...hsl, h })}
      />
      <Slider
        label="Saturation"
        value={hsl.s}
        min={0}
        max={100}
        unit="%"
        gradient={saturationGradient}
        onChange={(s) => onChange({ ...hsl, s })}
      />
      <Slider
        label="Lightness"
        value={hsl.l}
        min={0}
        max={100}
        unit="%"
        gradient={lightnessGradient}
        onChange={(l) => onChange({ ...hsl, l })}
      />
    </div>
  );
}
