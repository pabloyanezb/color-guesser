"use client";

import { useEffect, useState } from "react";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

interface ResultsPhaseProps {
  original: string;
  guess: string;
  score: number;
  onPlayAgain: () => void;
}

interface DigitProps {
  value: string;
  index: number;
}

function Digit({ value, index }: DigitProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [phase, setPhase] = useState<"rolling" | "settling" | "done">("rolling");

  useEffect(() => {
    const delay = index * 80;
    const totalCycles = 8;
    const cycleDuration = 80;
    
    const startTimeout = setTimeout(() => {
      let cycle = 0;
      
      const roll = () => {
        const randomDigit = Math.floor(Math.random() * 10).toString();
        setDisplayValue(randomDigit);
        cycle++;
        
        if (cycle < totalCycles) {
          setTimeout(roll, cycleDuration);
        } else {
          setDisplayValue(value);
          setPhase("settling");
          setTimeout(() => setPhase("done"), 500);
        }
      };
      
      roll();
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [value, index]);

  const getClassName = () => {
    let classes = "inline-block w-10 text-center relative";
    
    if (phase === "rolling") {
      classes += " digit-wheel";
    } else if (phase === "settling") {
      classes += " digit-settle";
    }
    
    return classes;
  };

  return (
    <span className={getClassName()}>
      {displayValue}
    </span>
  );
}

export function ResultsPhase({ original, guess, score, onPlayAgain }: ResultsPhaseProps) {
  const scoreStr = score.toFixed(1);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScore(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-xl uppercase font-bold tracking-widest">Results</p>
      
      <div className="text-7xl font-bold font-mono text-center flex justify-center overflow-hidden">
        {showScore ? (
          <>
            {scoreStr.split("").map((char, i) => {
              if (char === ".") {
                return <span key={i} className="mx-1">.</span>;
              }
              return <Digit key={i} value={char} index={i} />;
            })}
          </>
        ) : (
          <span className="opacity-0">0</span>
        )}
      </div>
      
      <div className="flex justify-center">
        <ColorSwatch color={original} size="lg" bordered>
          <div className="flex items-center justify-center gap-0 w-full h-full">
            <div
              className="flex-1 h-full"
              style={{ backgroundColor: original }}
            />
            <div
              className="flex-1 h-full border-l-4 border-black"
              style={{ backgroundColor: guess }}
            />
          </div>
        </ColorSwatch>
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full py-4 bg-red-500 text-black text-2xl uppercase font-bold border-4 border-black cursor-pointer hover:bg-red-400 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}
