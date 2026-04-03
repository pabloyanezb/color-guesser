import { ColorSwatch } from "@/components/ui/ColorSwatch";

interface ResultsPhaseProps {
  original: string;
  guess: string;
  score: number;
  onPlayAgain: () => void;
}

export function ResultsPhase({ original, guess, score, onPlayAgain }: ResultsPhaseProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Results</h1>
      <p className="text-5xl font-bold mb-8">{score}/100</p>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
        <ColorSwatch color={original} size="sm" />
        <ColorSwatch color={guess} size="sm" />
      </div>

      <button
        onClick={onPlayAgain}
        className="mt-8 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
      >
        Play Again
      </button>
    </>
  );
}
