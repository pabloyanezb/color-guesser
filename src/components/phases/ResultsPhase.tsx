"use client";

import { useState, useRef } from "react";
import type { ResultsPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { RollingDigit } from "../ui/RollingDigit";

export function ResultsPhase({ round, onContinue }: ResultsPhaseProps) {
  const score = round.score ?? 0;
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
        Result
      </p>

      <div className="text-7xl font-bold font-mono text-center flex justify-center overflow-hidden">
        {scoreStr.split("").map((c, i) =>
          c === "." ? (
            <span key={i} className="mx-1">.</span>
          ) : (
            <RollingDigit
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
          color={round.targetColor}
          size="lg"
          bordered
        >
          <div className="flex w-full h-full">
            <div
              className="flex-1"
              style={{ backgroundColor: round.targetColor }}
            />
            <div
              className="flex-1 border-l-4 border-black"
              style={{ backgroundColor: round.guessColor }}
            />
          </div>
        </ColorSwatch>
      </div>

      <div className="h-11">
        {buttonVisible && (
          <Button
            onClick={onContinue}
            variant="brand"
            fullWidth
          >
            <span className="fade-in-delay">Continue</span>
          </Button>
        )}
      </div>
    </div>
  );
}
