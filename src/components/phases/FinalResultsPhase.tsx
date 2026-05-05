"use client";

import { useEffect, useState } from "react";
import type { GameRound, PlayerTag } from "@/types";
import { Button } from "@/components/ui/Button";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { RollingNumber } from "@/components/ui/RollingNumber";

const ROLLING_DURATION = 1000;
const SCORE_CHANGE_DELAY = 300;
const PLAYER_TAG_MIN_LENGTH = 3;
const PLAYER_TAG_MAX_LENGTH = 4;
const PLAYER_TAG_REGEX = /^[A-Z0-9]{3,4}$/;

interface FinalResultsPhaseProps {
  rounds: GameRound[];
  onPlayAgain: () => void;
  onSaveScore?: (playerTag: PlayerTag) => void;
}

export function FinalResultsPhase({
  rounds,
  onPlayAgain,
  onSaveScore,
}: FinalResultsPhaseProps) {
  const averageScore = rounds.reduce((sum, r) => sum + (r.score ?? 0), 0) / rounds.length;
  const [scoreStr, setScoreStr] = useState("00.0");
  const [buttonVisible, setButtonVisible] = useState(false);
  const [playerTag, setPlayerTag] = useState("");
  const [hasDecidedSave, setHasDecidedSave] = useState(false);
  const [showTagError, setShowTagError] = useState(false);

  const isTagValid = PLAYER_TAG_REGEX.test(playerTag);

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

      <div className="flex gap-4 justify-center mb-6">
        {rounds.map((round, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className="text-lg font-bold">{index + 1}/3 - {round.score}</span>
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
            <div className="w-75">
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
                placeholder="Your player name"
                className={`w-full border-4 bg-white text-black px-3 py-2 font-bold uppercase tracking-wider ${showTagError ? "border-red-600" : "border-black"}`}
                minLength={PLAYER_TAG_MIN_LENGTH}
                maxLength={PLAYER_TAG_MAX_LENGTH}
              />
              {showTagError && (
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-red-700">
                  Name required (3-4 letters or numbers)
                </p>
              )}
            </div>
            <div className="flex justify-center gap-2">
              <Button
                onClick={() => {
                  if (!isTagValid) {
                    setShowTagError(true);
                    return;
                  }
                  onSaveScore?.(playerTag);
                  setShowTagError(false);
                  setHasDecidedSave(true);
                }}
                variant="primary"
                disabled={hasDecidedSave}
                className="px-4 py-2 text-3xl leading-none min-w-16"
              >
                ✓
              </Button>
              <Button
                onClick={() => {
                  setShowTagError(false);
                  setHasDecidedSave(true);
                }}
                variant="primary"
                disabled={hasDecidedSave}
                className="px-4 py-2 text-3xl leading-none min-w-16"
              >
                ✕
              </Button>
            </div>
          </div>
        )}
        {buttonVisible && hasDecidedSave && (
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
