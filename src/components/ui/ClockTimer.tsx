"use client";

import { useEffect } from "react";
import { RollingTimer } from "@/components/ui/RollingDigit";

interface ClockTimerProps {
  milliseconds: number;
  onComplete: () => void;
}

export function ClockTimer({ milliseconds, onComplete }: ClockTimerProps) {
  const seconds = Math.ceil(milliseconds / 1000);

  useEffect(() => {
    if (milliseconds <= 0) {
      onComplete();
    }
  }, [milliseconds, onComplete]);

  return (
    <span className="inline-flex items-center text-6xl font-bold font-mono tabular-nums">
      <RollingTimer value={seconds} isAnimating={true} />
    </span>
  );
}
