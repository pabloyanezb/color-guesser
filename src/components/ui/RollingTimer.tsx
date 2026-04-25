"use client";

import { useEffect } from "react";
import { RollingNumber } from "./RollingNumber";

interface RollingTimerProps {
  milliseconds: number;
  onComplete: () => void;
}

export function RollingTimer({ milliseconds, onComplete }: RollingTimerProps) {
  const seconds = Math.ceil(milliseconds / 1000);

  useEffect(() => {
    if (milliseconds <= 0) {
      onComplete();
    }
  }, [milliseconds, onComplete]);

  return (
    <span className="inline-flex items-center text-6xl font-bold font-mono tabular-nums">
      <RollingNumber value={seconds.toString()} />
    </span>
  );
}
