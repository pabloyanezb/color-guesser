"use client";

import { useEffect, useRef, useState } from "react";

interface RollingNumberProps {
  value: string;
  isAnimating: boolean;
  className?: string;
  digitDuration?: number;
}

function RollingDigitWheel({ value, duration }: { value: number; duration: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const targetValueRef = useRef(value);

  useEffect(() => {
    if (displayValue === value) {
      return;
    }

    targetValueRef.current = value;
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentValue =
        startValueRef.current + (targetValueRef.current - startValueRef.current) * eased;

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

export function RollingNumber({
  value,
  className = "",
  digitDuration = 800,
}: RollingNumberProps) {
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
              duration={digitDuration}
            />
          </div>
        );
      })}
    </div>
  );
}

interface RollingTimerProps {
  value: number;
  isAnimating: boolean;
  className?: string;
  digitDuration?: number;
}

export function RollingTimer({
  value,
  isAnimating,
  className = "",
  digitDuration = 800,
}: RollingTimerProps) {
  return (
    <RollingNumber
      value={value.toString()}
      isAnimating={isAnimating}
      className={className}
      digitDuration={digitDuration}
    />
  );
}
