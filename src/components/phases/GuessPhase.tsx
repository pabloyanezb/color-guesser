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
    <>
      <p className="text-zinc-600 mb-6">Guess the color</p>
      <ColorSwatch color={hslToHex(hsl)} size="md" border />
      <HSLSliders hsl={hsl} onChange={onChange} />
      <button
        onClick={onSubmit}
        className="mt-8 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
      >
        Submit
      </button>
    </>
  );
}
