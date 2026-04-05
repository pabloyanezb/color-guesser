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
    <div className="flex flex-col gap-8 w-full">
      <p className="text-xl uppercase font-bold tracking-widest">Guess</p>
      <div className="w-full">
        <HSLSliders hsl={hsl} onChange={onChange} />
      </div>
      <div className="flex justify-center">
        <ColorSwatch color={hslToHex(hsl)} size="lg" bordered />
      </div>
      <button
        onClick={onSubmit}
        className="w-full py-4 bg-black text-white text-2xl uppercase font-bold border-4 border-black cursor-pointer hover:bg-zinc-800 transition-colors"
      >
        Submit
      </button>
    </div>
  );
}
