import { HSL, hslToHex } from "@/lib/game";
import { HSLSliders } from "@/components/ui/HSLSliders";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

interface GuessPhaseProps {
  hsl: HSL;
  onChange: (hsl: HSL) => void;
  onSubmit: () => void;
}

export function GuessPhase({ hsl, onChange, onSubmit }: GuessPhaseProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xl uppercase font-bold tracking-widest">Guess</p>
      <ColorSwatch color={hslToHex(hsl)} size="lg" border />
      <div className="w-full max-w-lg">
        <HSLSliders hsl={hsl} onChange={onChange} />
      </div>
      <button
        onClick={onSubmit}
        className="py-4 bg-black text-white text-2xl uppercase font-bold border-4 border-black cursor-pointer hover:bg-zinc-800 transition-colors w-48"
      >
        Submit
      </button>
    </div>
  );
}
