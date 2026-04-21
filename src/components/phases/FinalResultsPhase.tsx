"use client";

import { useState, useRef } from "react";
import type { GameRound } from "@/types";
import { Button } from "@/components/ui/Button";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { RollingDigit } from "../ui/RollingDigit";

interface FinalResultsPhaseProps {
  rounds: GameRound[];
  onPlayAgain: () => void;
}

export function FinalResultsPhase({ rounds, onPlayAgain }: FinalResultsPhaseProps) {
  const averageScore = rounds.reduce((sum, r) => sum + (r.score ?? 0), 0) / rounds.length;
  const scoreStr = averageScore.toFixed(1);
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
        Final Results
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
              width="w-8"
            />
          ),
        )}
      </div>

      <div className="flex gap-4 justify-center mb-6">
        {rounds.map((round, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className="text-lg font-bold">{index + 1}/3 - {round.score?.toFixed(1)}</span>
            <ColorSwatch
              color={round.targetColor}
              size="md"
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
        ))}
      </div>

      <div className="h-11">
        {buttonVisible && (
          <Button
            onClick={onPlayAgain}
            variant="brand"
            fullWidth
          >
            <span className="fade-in-delay">Play Again</span>
          </Button>
        )}
      </div>
    </div>
  );
}
