"use client";

import { useEffect, useState } from "react";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

interface ResultsPhaseProps {
  original: string;
  guess: string;
  score: number;
  onPlayAgain: () => void;
}

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

  const animClass = rolling ? "digit-wheel" : "digit-settle";
  return <span className={`inline-block w-10 text-center ${animClass}`}>{display}</span>;
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

      <button
        onClick={onPlayAgain}
        className="w-full py-4 bg-red-500 text-black text-2xl uppercase font-bold border-4 border-black hover:bg-red-400"
      >
        Play Again
      </button>
    </div>
  );
}
