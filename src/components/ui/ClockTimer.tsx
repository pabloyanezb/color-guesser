"use client";

import { useEffect } from "react";

interface ClockTimerProps {
  milliseconds: number;
  onComplete: () => void;
}

export function ClockTimer({ milliseconds, onComplete }: ClockTimerProps) {
  useEffect(() => {
    if (milliseconds <= 0) {
      onComplete();
    }
  }, [milliseconds, onComplete]);

  const whole = Math.floor(milliseconds / 1000);
  const tenths = Math.floor((milliseconds % 1000) / 100);
  const hundredths = Math.floor((milliseconds % 100) / 10);

  return (
    <span className="font-bold text-6xl inline-flex items-center font-mono tabular-nums">
      <span className="w-10 text-center">{whole}</span>
      <span className="text-3xl mx-0.5 relative top-1">.</span>
      <span className="w-8 text-center">{tenths}</span>
      <span className="w-8 text-center">{hundredths}</span>
    </span>
  );
}