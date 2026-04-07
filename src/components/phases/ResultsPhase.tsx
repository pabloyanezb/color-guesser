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
  showDelay: 300,
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), CONFIG.showDelay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-xl uppercase font-bold tracking-widest">Results</p>
      
      <div className="text-7xl font-bold font-mono text-center flex justify-center overflow-hidden">
        {visible ? (
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

      <Button
        onClick={onPlayAgain}
        variant="danger"
        fullWidth
      >
        Play Again
      </Button>
    </div>
  );
}
