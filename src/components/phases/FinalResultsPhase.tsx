"use client";

import { useEffect, useState } from "react";
import type { GameRound, PlayerTag } from "@/types";
import { Button } from "@/components/ui/Button";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { RollingNumber } from "@/components/ui/RollingNumber";
import clsx from "clsx";

const ROLLING_DURATION = 1000;
const SCORE_CHANGE_DELAY = 300;
const PLAYER_TAG_MIN_LENGTH = 3;
const PLAYER_TAG_MAX_LENGTH = 4;
const PLAYER_TAG_REGEX = /^[A-Z0-9]{3,4}$/;

interface FinalResultsPhaseProps {
  rounds: GameRound[];
  onPlayAgain: () => void;
  onSaveScore?: (playerTag: PlayerTag, finalScore: number, roundScores: number[]) => void;
}

export function FinalResultsPhase({
  rounds,
  onPlayAgain,
  onSaveScore,
}: FinalResultsPhaseProps) {
  const averageScore = rounds.reduce((sum, round) => sum + (round.score ?? 0), 0) / rounds.length;
  const roundScores = rounds.map((round) => round.score ?? 0);
  const [scoreStr, setScoreStr] = useState("00.0");
  const [buttonVisible, setButtonVisible] = useState(false);
  const [playerTag, setPlayerTag] = useState("");
  const [hasDecidedSave, setHasDecidedSave] = useState(false);
  const [savedScore, setSavedScore] = useState(false);
  const [showTagError, setShowTagError] = useState(false);

  useEffect(() => {
    const scoreTimer = setTimeout(() => {
      setScoreStr(averageScore.toFixed(1));
    }, SCORE_CHANGE_DELAY);
    return () => clearTimeout(scoreTimer);
  }, [averageScore]);

  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setButtonVisible(true);
    }, ROLLING_DURATION + SCORE_CHANGE_DELAY);
    return () => clearTimeout(buttonTimer);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="fade-in text-xl uppercase font-bold tracking-widest">
        Final Results
      </p>

      <div className="text-7xl font-bold font-mono text-center flex justify-center">
        <RollingNumber
          value={scoreStr}
          duration={ROLLING_DURATION}
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {rounds.map((round, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className="text-lg font-bold">{index + 1}/3 - {round.score?.toFixed(1) ?? "0.0"}</span>
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
        {buttonVisible && !hasDecidedSave && (
          <div className="flex flex-col items-center gap-6 mb-3">
            <div className="w-full max-w-sm mx-auto">
              <p className="block text-sm font-bold uppercase tracking-wider mb-2">
                Save your score?
              </p>
              <input
                id="player-tag"
                type="text"
                value={playerTag}
                onChange={(event) => {
                  const normalized = event.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, PLAYER_TAG_MAX_LENGTH);
                  setPlayerTag(normalized);
                  if (normalized.length >= PLAYER_TAG_MIN_LENGTH) {
                    setShowTagError(false);
                  }
                }}
                placeholder="NAME"
                className={clsx(
                  "w-full bg-white text-black text-center text-3xl font-black",
                  "uppercase tracking-[0.55em] pl-[0.55em]",
                  "border-0 border-b-4 outline-none focus:border-black py-2",
                  {
                    "border-red-700": showTagError,
                    "border-black": !showTagError,
                  },
                )}
                minLength={PLAYER_TAG_MIN_LENGTH}
                maxLength={PLAYER_TAG_MAX_LENGTH}
                autoComplete="off"
                aria-label="Player name"
              />
              {showTagError && (
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-red-700">
                  Name required (3-4 letters or numbers)
                </p>
              )}
            </div>
            <div className="flex justify-center gap-6">
              <Button
                onClick={() => {
                  const isTagValid = PLAYER_TAG_REGEX.test(playerTag);
                  if (!isTagValid) {
                    setShowTagError(true);
                    return;
                  }
                  onSaveScore?.(playerTag, averageScore, roundScores);
                  setShowTagError(false);
                  setSavedScore(true);
                  setHasDecidedSave(true);
                }}
                variant="primary"
                size="sm"
                disabled={hasDecidedSave}
              >
                ✓
              </Button>
              <Button
                onClick={() => {
                  setShowTagError(false);
                  setSavedScore(false);
                  setHasDecidedSave(true);
                }}
                variant="primary"
                size="sm"
                disabled={hasDecidedSave}
              >
                ✕
              </Button>
            </div>
          </div>
        )}
        {buttonVisible && hasDecidedSave && !savedScore && (
          <div className="flex gap-2">
            <Button
              onClick={onPlayAgain}
              variant="brand"
              fullWidth
            >
              <span className="fade-in-delay">Play Again</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
