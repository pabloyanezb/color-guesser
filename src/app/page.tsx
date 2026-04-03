"use client";

import { useState, useEffect, startTransition } from "react";
import chroma from "chroma-js";
import { HSLSliders } from "@/components/HSLSliders";

const MEMORIZE_TIME = 5;

interface HSL {
  h: number;
  s: number;
  l: number;
}

type Phase = "start" | "memorize" | "guess" | "results";

function hslToHex(hsl: HSL): string {
  return chroma.hsl(hsl.h, hsl.s / 100, hsl.l / 100).hex();
}

function generateRandomHSL(): HSL {
  return {
    h: Math.floor(Math.random() * 360),
    s: 50 + Math.floor(Math.random() * 40),
    l: 40 + Math.floor(Math.random() * 30),
  };
}

function calculateScore(original: string, guess: string): number {
  const delta = chroma.deltaE(original, guess);
  return Math.max(0, Math.round(100 - delta));
}

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
      {phase === "start" && (
        <>
          <h1 className="text-4xl font-bold mb-4">Color Guesser</h1>
          <p className="text-zinc-600 mb-8 text-center max-w-md">
            Memorize a color and try to recreate it from memory.
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
          >
            Play Now
          </button>
        </>
      )}

      {phase === "memorize" && (
        <>
          <p className="text-zinc-600 mb-4">Memorize this color</p>
          <div
            className="w-48 h-48 rounded-2xl shadow-lg mb-8"
            style={{ backgroundColor: original }}
          />
          <p className="text-2xl font-mono">{timeLeft}s</p>
        </>
      )}

      {phase === "guess" && (
        <>
          <p className="text-zinc-600 mb-6">Guess the color</p>
          <div
            className="w-32 h-32 rounded-2xl shadow-lg mb-8 border-4 border-zinc-200"
            style={{ backgroundColor: hslToHex(guess) }}
          />
          <HSLSliders hsl={guess} onChange={setGuess} />
          <button
            onClick={handleSubmit}
            className="mt-8 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
          >
            Submit
          </button>
        </>
      )}

      {phase === "results" && (
        <>
          <h1 className="text-3xl font-bold mb-2">Results</h1>
          <p className="text-5xl font-bold mb-8">{score}/100</p>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
            <div
              className="w-16 h-16 rounded-lg border border-zinc-200"
              style={{ backgroundColor: original }}
              title="Original"
            />
            <div
              className="w-16 h-16 rounded-lg border border-zinc-200"
              style={{ backgroundColor: hslToHex(guess) }}
              title="Your guess"
            />
          </div>

          <button
            onClick={() => setPhase("start")}
            className="mt-8 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
          >
            Play Again
          </button>
        </>
      )}
    </main>
  );
}
