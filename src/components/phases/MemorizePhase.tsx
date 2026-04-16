"use client";

import { useState, useEffect } from "react";
import { generateColorSequence, getRotationDelay } from "@/lib/game";
import type { MemorizePhaseProps } from "@/types";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

const ROTATION_COUNT = 4;
const TARGET_DISPLAY_TIME = 400;
const MEMORIZE_TIME = 5;

export function MemorizePhase({ targetColor, onComplete }: MemorizePhaseProps) {
  const [displayColor, setDisplayColor] = useState("");
  const [phase, setPhase] = useState<"rotate" | "display" | "countdown">("rotate");
  const [countdown, setCountdown] = useState(MEMORIZE_TIME);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (phase !== "rotate") return;

    const sequence = generateColorSequence(ROTATION_COUNT, targetColor);
    let index = 0;

    const tick = () => {
      if (index < sequence.length) {
        setDisplayColor(sequence[index]);
        setKey((k) => k + 1);
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
    if (countdown <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, countdown, onComplete]);

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <p className="animate-in text-xl uppercase font-bold tracking-widest">
        {phase === "countdown" ? "Memorize" : "Get Ready"}
      </p>
      <ColorSwatch
        color={displayColor || targetColor}
        size="lg"
        bordered
        key={key}
      >
        {phase === "countdown" && <span className="text-6xl font-bold">{countdown}</span>}
      </ColorSwatch>
    </div>
  );
}
