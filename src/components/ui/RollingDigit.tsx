"use client";

import { useEffect, useRef, useState } from "react";

interface RollingDigitWheelProps {
  value: number;
  duration?: number;
}

function RollingDigitWheel({ value, duration = 800 }: RollingDigitWheelProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value === prevValueRef.current) {
      return;
    }

    prevValueRef.current = value;
    startTimeRef.current = null;

    const startValue = displayValue;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentValue = startValue + (value - startValue) * eased;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  const offset = (displayValue % 10) * -100;

  return (
    <div className="relative overflow-hidden h-full">
      <div
        className="absolute inset-0 transition-transform duration-100 ease-linear"
        style={{ transform: `translateY(${offset}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <div
            key={digit}
            className="h-full flex items-center justify-center"
            style={{ height: "100%" }}
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}

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
            <RollingDigitWheel
              value={Number.parseInt(char, 10)}
              duration={duration}
            />
          </div>
        );
      })}
    </div>
  );
}

interface RollingTimerProps {
  value: number;
  className?: string;
}

export function RollingTimer({ value, className = "" }: RollingTimerProps) {
  return (
    <RollingNumber
      value={value.toString()}
      className={className}
    />
  );
}
