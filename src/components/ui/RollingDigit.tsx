"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

const CONFIG = {
  cycles: 8,
  cycleDelay: 100,
  digitDelay: 80,
};

interface RollingDigitProps {
  value: string;
  index: number;
  onSettled: () => void;
  width?: string;
}

export function RollingDigit({
  value,
  index,
  onSettled,
  width = "w-10",
}: RollingDigitProps) {
  const [display, setDisplay] = useState("0");
  const [rolling, setRolling] = useState(true);

  useEffect(() => {
    const start = setTimeout(() => {
      let cycle = 0;
      const roll = () => {
        setDisplay(Math.floor(Math.random() * 10).toString());
        if (++cycle < CONFIG.cycles) {
          setTimeout(roll, CONFIG.cycleDelay);
        } else {
          setDisplay(value);
          setRolling(false);
          onSettled();
        }
      };
      roll();
    }, index * CONFIG.digitDelay);

    return () => clearTimeout(start);
  }, [value, index, onSettled]);

  return (
    <span
      className={clsx(
        "inline-block text-center",
        width,
        rolling ? "digit-wheel" : "digit-settle",
      )}
    >
      {display}
    </span>
  );
}
