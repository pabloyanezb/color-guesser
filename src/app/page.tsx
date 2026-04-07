"use client";

import { useState, useCallback } from "react";
import type { Phase, HSL } from "@/types";
import { generateRandomHSL, hslToHex, calculateScore } from "@/lib/game";
import { StartPhase } from "@/components/phases/StartPhase";
import { MemorizePhase } from "@/components/phases/MemorizePhase";
import { GuessPhase } from "@/components/phases/GuessPhase";
import { ResultsPhase } from "@/components/phases/ResultsPhase";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("start");
  const [original, setOriginal] = useState("");
  const [guess, setGuess] = useState<HSL>({ h: 180, s: 50, l: 50 });
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    setOriginal(hslToHex(generateRandomHSL()));
    setGuess({ h: 180, s: 50, l: 50 });
    setPhase("memorize");
  }, []);

  const goToGuess = useCallback(() => {
    setPhase("guess");
  }, []);

  const handleSubmit = useCallback(() => {
    setScore(calculateScore(original, hslToHex(guess)));
    setPhase("results");
  }, [guess, original]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 px-4">
      <div className="w-full max-w-2xl">
        {phase === "start" && (
          <StartPhase onStart={startGame} />
        )}

        {phase === "memorize" && (
          <MemorizePhase
            targetColor={original}
            onComplete={goToGuess}
          />
        )}

        {phase === "guess" && (
          <GuessPhase
            hsl={guess}
            onChange={setGuess}
            onSubmit={handleSubmit}
          />
        )}

        {phase === "results" && (
          <ResultsPhase
            original={original}
            guess={hslToHex(guess)}
            score={score}
            onPlayAgain={() => setPhase("start")}
          />
        )}
      </div>
    </main>
  );
}
