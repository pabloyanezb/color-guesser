import { ColorSwatch } from "@/components/ui/ColorSwatch";

interface ResultsPhaseProps {
  original: string;
  guess: string;
  score: number;
  onPlayAgain: () => void;
}

export function ResultsPhase({ original, guess, score, onPlayAgain }: ResultsPhaseProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl uppercase font-bold tracking-widest">Results</p>
      <div className="text-7xl font-bold">{score}/100</div>

      <div className="flex items-center gap-4 bg-white p-4 border-4 border-black">
        <ColorSwatch color={original} size="sm" />
        <span className="text-2xl">→</span>
        <ColorSwatch color={guess} size="sm" />
      </div>

      <button
        onClick={onPlayAgain}
        className="py-3 bg-red-500 text-black text-xl uppercase font-bold border-4 border-black cursor-pointer hover:bg-red-400 transition-colors w-40"
      >
        Play Again
      </button>
    </div>
  );
}
