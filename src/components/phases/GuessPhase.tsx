import { hslToHex } from "@/lib/game";
import type { GuessPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { HSLSliders } from "@/components/ui/HSLSliders";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

export function GuessPhase({ hsl, onChange, onSubmit }: GuessPhaseProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="animate-in text-xl uppercase font-bold tracking-widest">Guess</p>
      <div className="w-full animate-in animate-in-delay-1">
        <HSLSliders
          hsl={hsl}
          onChange={onChange}
        />
      </div>
      <div className="flex justify-center">
        <ColorSwatch
          color={hslToHex(hsl)}
          size="lg"
          bordered
        />
      </div>
      <div className="animate-in animate-in-delay-3">
        <Button
          onClick={onSubmit}
          variant="primary"
          fullWidth
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
