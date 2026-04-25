"use client";

import { RollingDigit } from "./RollingDigit";

interface RollingNumberProps {
  value: string;
  className?: string;
  duration?: number;
}

export function RollingNumber({ value, className = "", duration }: RollingNumberProps) {
  const parts = value.split("");

  return (
    <div className={`flex items-center font-mono tabular-nums ${className}`}>
      {parts.map((char, index) => {
        if (char === ".") {
          return (
            <span key={index} className="text-[0.8em] pb-1">
              .
            </span>
          );
        }
        return (
          <div key={index} className="relative w-[0.6em] h-[1em]">
            <RollingDigit
              value={Number.parseInt(char, 10)}
              duration={duration}
            />
          </div>
        );
      })}
    </div>
  );
}
