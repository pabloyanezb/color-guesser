"use client";

import { useState, useCallback } from "react";
import type { Phase, HSL, GameRound } from "@/types";
import { generateRandomColor, hslToHex, calculateScore } from "@/lib/game";
import { StartPhase } from "@/components/phases/StartPhase";
import { MemorizePhase } from "@/components/phases/MemorizePhase";
import { GuessPhase } from "@/components/phases/GuessPhase";
import { ResultsPhase } from "@/components/phases/ResultsPhase";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("start");
  const [rounds, setRounds] = useState<GameRound[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [guess, setGuess] = useState<HSL>({ h: 180, s: 50, l: 50 });
  const [animKey, setAnimKey] = useState(0);

  const startGame = useCallback(() => {
    const newRounds: GameRound[] = [
      { targetColor: generateRandomColor() },
      { targetColor: generateRandomColor() },
      { targetColor: generateRandomColor() },
    ];
    setRounds(newRounds);
    setCurrentRound(0);
    setGuess({ h: 180, s: 50, l: 50 });
    setAnimKey((k) => k + 1);
    setPhase("memorize");
  }, []);

  const goToGuess = useCallback(() => {
    setGuess({ h: 180, s: 50, l: 50 });
    setAnimKey((k) => k + 1);
    setPhase("guess");
  }, []);

  const handleSubmit = useCallback(() => {
    const guessColor = hslToHex(guess);
    const score = calculateScore(rounds[currentRound].targetColor, guessColor);

    const updatedRounds = [...rounds];
    updatedRounds[currentRound] = {
      ...updatedRounds[currentRound],
      guessColor,
      score,
    };
    setRounds(updatedRounds);

    setAnimKey((k) => k + 1);
    setPhase("results");
  }, [guess, rounds, currentRound]);

  const handleContinue = useCallback(() => {
    if (currentRound < 2) {
      setCurrentRound((r) => r + 1);
      setGuess({ h: 180, s: 50, l: 50 });
      setAnimKey((k) => k + 1);
      setPhase("memorize");
    } else {
      setPhase("start");
    }
  }, [currentRound]);

  const currentRoundData = rounds[currentRound];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 px-4">
      <div className="w-full max-w-2xl" key={animKey}>
        {phase === "start" && (
          <StartPhase onStart={startGame} />
        )}
        {phase === "memorize" && currentRoundData && (
          <MemorizePhase
            targetColor={currentRoundData.targetColor}
            onComplete={goToGuess}
          />
        )}
        {phase === "guess" && (
          <GuessPhase
            hsl={guess}
            colorIndex={currentRound}
            onChange={setGuess}
            onSubmit={handleSubmit}
          />
        )}
        {phase === "results" && currentRoundData && (
          <ResultsPhase
            round={currentRoundData}
            colorIndex={currentRound}
            onContinue={handleContinue}
            onPlayAgain={() => setPhase("start")}
          />
        )}
      </div>
    </main>
  );
}
