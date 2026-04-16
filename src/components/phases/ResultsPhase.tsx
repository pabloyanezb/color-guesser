"use client";

import { useEffect, useState, useRef } from "react";
import { clsx } from "clsx";
import type { ResultsPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

const CONFIG = {
  cycles: 8,
  cycleDelay: 100,
  digitDelay: 80,
};

function Digit({
  value,
  index,
  onSettled,
}: {
  value: string;
  index: number;
  onSettled: () => void;
}) {
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
        "inline-block w-10 text-center",
        rolling ? "digit-wheel" : "digit-settle",
      )}
    >
      {display}
    </span>
  );
}

export function ResultsPhase({
  original,
  guess,
  score,
  onPlayAgain,
}: ResultsPhaseProps) {
  const scoreStr = score.toFixed(1);
  const [buttonVisible, setButtonVisible] = useState(false);
  const settledCountRef = useRef(0);
  const totalDigits = scoreStr.replace(".", "").length;

  const handleSettled = () => {
    settledCountRef.current += 1;
    if (settledCountRef.current >= totalDigits) {
      setButtonVisible(true);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="fade-in text-xl uppercase font-bold tracking-widest">
        Results
      </p>

      <div className="text-7xl font-bold font-mono text-center flex justify-center overflow-hidden">
        {scoreStr.split("").map((c, i) =>
          c === "." ? (
            <span key={i} className="mx-1">.</span>
          ) : (
            <Digit
              key={i}
              value={c}
              index={i}
              onSettled={handleSettled}
            />
          ),
        )}
      </div>

      <div className="flex justify-center">
        <ColorSwatch
          color={original}
          size="lg"
          bordered
        >
          <div className="flex w-full h-full">
            <div
              className="flex-1"
              style={{ backgroundColor: original }}
            />
            <div
              className="flex-1 border-l-4 border-black"
              style={{ backgroundColor: guess }}
            />
          </div>
        </ColorSwatch>
      </div>

      <div className="h-11">
        {buttonVisible && (
          <Button
            onClick={onPlayAgain}
            variant="brand"
            fullWidth
          >
            Play Again
          </Button>
        )}
      </div>
    </div>
  );
}
