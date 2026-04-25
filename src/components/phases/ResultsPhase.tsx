"use client";

import { useEffect, useState } from "react";
import type { ResultsPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { RollingNumber } from "@/components/ui/RollingNumber";

const ROLLING_DURATION = 1000;
const SCORE_CHANGE_DELAY = 300;

export function ResultsPhase({ round, onContinue }: ResultsPhaseProps) {
  const score = round.score ?? 0;
  const [scoreStr, setScoreStr] = useState("00.0");
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const scoreTimer = setTimeout(() => {
      setScoreStr(score.toFixed(1));
    }, SCORE_CHANGE_DELAY);
    return () => clearTimeout(scoreTimer);
  }, [score]);

  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setButtonVisible(true);
    }, ROLLING_DURATION + SCORE_CHANGE_DELAY);
    return () => clearTimeout(buttonTimer);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="fade-in text-xl uppercase font-bold tracking-widest">
        Result
      </p>

      <div className="text-7xl font-bold font-mono text-center flex justify-center">
        <RollingNumber
          value={scoreStr}
          duration={ROLLING_DURATION}
        />
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
