"use client";

import { useState, useEffect, startTransition } from "react";
import { HSL, generateRandomHSL, hslToHex, calculateScore } from "@/lib/game";
import { StartPhase } from "@/components/phases/StartPhase";
import { MemorizePhase } from "@/components/phases/MemorizePhase";
import { GuessPhase } from "@/components/phases/GuessPhase";
import { ResultsPhase } from "@/components/phases/ResultsPhase";

const MEMORIZE_TIME = 5;

type Phase = "start" | "memorize" | "guess" | "results";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("start");
  const [timeLeft, setTimeLeft] = useState(MEMORIZE_TIME);
  const [original, setOriginal] = useState<string>("");
  const [guess, setGuess] = useState<HSL>({ h: 180, s: 50, l: 50 });
  const [score, setScore] = useState(0);

  function startGame() {
    const color = generateRandomHSL();
    setOriginal(hslToHex(color));
    setGuess({ h: 180, s: 50, l: 50 });
    setTimeLeft(MEMORIZE_TIME);
    setPhase("memorize");
  }

  useEffect(() => {
    if (phase !== "memorize") return;
    if (timeLeft <= 0) {
      startTransition(() => {
        setPhase("guess");
      });
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, timeLeft]);

  function handleSubmit() {
    const guessHex = hslToHex(guess);
    const finalScore = calculateScore(original, guessHex);
    setScore(finalScore);
    setPhase("results");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 px-4">
      {phase === "start" && <StartPhase onStart={startGame} />}

      {phase === "memorize" && (
        <MemorizePhase color={original} timeLeft={timeLeft} />
      )}

      {phase === "guess" && (
        <GuessPhase hsl={guess} onChange={setGuess} onSubmit={handleSubmit} />
      )}

      {phase === "results" && (
        <ResultsPhase
          original={original}
          guess={hslToHex(guess)}
          score={score}
          onPlayAgain={() => setPhase("start")}
        />
      )}
    </main>
  );
}
