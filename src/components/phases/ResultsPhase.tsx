"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import type { ResultsPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

const CONFIG = {
  cycles: 8,
  cycleDelay: 100,
  digitDelay: 80,
  scoreDelay: 300,
  buttonDelay: 1200,
};

function Digit({ value, index }: { value: string; index: number }) {
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
        }
      };
      roll();
    }, index * CONFIG.digitDelay);

    return () => clearTimeout(start);
  }, [value, index]);

  return (
    <span className={clsx("inline-block w-10 text-center", rolling ? "digit-wheel" : "digit-settle")}>
      {display}
    </span>
  );
}

export function ResultsPhase({ original, guess, score, onPlayAgain }: ResultsPhaseProps) {
  const scoreStr = score.toFixed(1);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScoreVisible(true), CONFIG.scoreDelay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scoreVisible) {
      const timer = setTimeout(() => setButtonVisible(true), CONFIG.buttonDelay);
      return () => clearTimeout(timer);
    }
  }, [scoreVisible]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-xl uppercase font-bold tracking-widest">Results</p>
      
      <div className="text-7xl font-bold font-mono text-center flex justify-center overflow-hidden">
        {scoreVisible ? (
          scoreStr.split("").map((c, i) => 
            c === "." ? (
              <span key={i} className="mx-1">.</span>
            ) : (
              <Digit key={i} value={c} index={i} />
            )
          )
        ) : (
          <span className="opacity-0">0</span>
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

      <div className={clsx("transition-opacity duration-500", buttonVisible ? "opacity-100" : "opacity-0")}>
        <Button
          onClick={onPlayAgain}
          variant="brand"
          fullWidth
        >
          Play Again
        </Button>
      </div>
    </div>
  );
}
