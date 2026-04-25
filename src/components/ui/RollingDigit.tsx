"use client";

import { useEffect, useRef, useState } from "react";

interface RollingDigitProps {
  value: number;
  duration?: number;
}

export function RollingDigit({ value, duration = 800 }: RollingDigitProps) {
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
