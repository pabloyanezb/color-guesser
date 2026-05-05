"use client";

import { Button } from "@/components/ui/Button";
import { useHighScoresStore } from "@/store/highscoresStore";

interface HighScoresPhaseProps {
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function HighScoresPhase({ buttonLabel, onButtonClick }: HighScoresPhaseProps) {
  const activePlayerName = useHighScoresStore((state) => state.activePlayerName);
  const getTopFiveForPlayer = useHighScoresStore((state) => state.getTopFiveForPlayer);

  const topScores = getTopFiveForPlayer(activePlayerName);

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="fade-in text-xl uppercase font-bold tracking-widest">
        High Scores
      </p>

      <div className="border-4 border-black bg-white p-4">
        <p className="text-sm font-bold uppercase tracking-widest mb-3">
          {activePlayerName ? `Top 5 (${activePlayerName})` : "Top 5"}
        </p>

        {topScores.length === 0 ? (
          <p className="text-sm font-bold uppercase tracking-wider text-zinc-600">
            No saved scores yet
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {topScores.map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between font-bold">
                <span>#{index + 1}</span>
                <span>{entry.finalScore.toFixed(1)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {buttonLabel && onButtonClick && (
        <div className="flex gap-2">
          <Button
            onClick={onButtonClick}
            variant="primary"
            fullWidth
          >
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
