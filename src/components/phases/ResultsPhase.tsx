import { ColorSwatch } from "@/components/ui/ColorSwatch";

interface ResultsPhaseProps {
  original: string;
  guess: string;
  score: number;
  onPlayAgain: () => void;
}

export function ResultsPhase({ original, guess, score, onPlayAgain }: ResultsPhaseProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-xl uppercase font-bold tracking-widest">Results</p>
      <div className="text-7xl font-bold text-center">{score}/100</div>
      
      <div className="flex justify-center">
        <ColorSwatch color={original} size="lg" bordered>
          <div className="flex items-center justify-center gap-0 w-full h-full">
            <div
              className="flex-1 h-full"
              style={{ backgroundColor: original }}
            />
            <div
              className="flex-1 h-full border-l-4 border-black"
              style={{ backgroundColor: guess }}
            />
          </div>
        </ColorSwatch>
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full py-4 bg-red-500 text-black text-2xl uppercase font-bold border-4 border-black cursor-pointer hover:bg-red-400 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}
