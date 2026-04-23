"use client";

import { useState, useEffect } from "react";
import { generateColorSequence, getRotationDelay } from "@/lib/game";
import type { MemorizePhaseProps } from "@/types";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { ClockTimer } from "@/components/ui/ClockTimer";

const ROTATION_COUNT = 4;
const TARGET_DISPLAY_TIME = 400;
const MEMORIZE_TIME = 5;
const COUNTDOWN_INTERVAL = 100;

export function MemorizePhase({ targetColor, onComplete }: MemorizePhaseProps) {
  const [displayColor, setDisplayColor] = useState("");
  const [phase, setPhase] = useState<"rotate" | "display" | "countdown">("rotate");
  const [countdownMs, setCountdownMs] = useState(MEMORIZE_TIME * 1000);

  useEffect(() => {
    if (phase !== "rotate") return;

    const sequence = generateColorSequence(ROTATION_COUNT, targetColor);
    let index = 0;

    const tick = () => {
      if (index < sequence.length) {
        setDisplayColor(sequence[index]);
        index++;

        if (index < sequence.length) {
          setTimeout(tick, getRotationDelay(index));
        } else {
          setPhase("display");
          setTimeout(() => setPhase("countdown"), TARGET_DISPLAY_TIME);
        }
      }
    };

    tick();
  }, [targetColor, phase]);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdownMs <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCountdownMs((c) => c - COUNTDOWN_INTERVAL), COUNTDOWN_INTERVAL);
    return () => clearTimeout(timer);
  }, [phase, countdownMs, onComplete]);

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <p className="fade-in text-xl uppercase font-bold tracking-widest">
        {phase === "countdown" ? "Memorize" : "Get Ready"}
      </p>
      <ColorSwatch
        color={displayColor || targetColor}
        size="lg"
        bordered
      >
        {phase === "countdown" && (
          <ClockTimer
            milliseconds={countdownMs}
            onComplete={() => {}}
          />
        )}
      </ColorSwatch>
    </div>
  );
}
