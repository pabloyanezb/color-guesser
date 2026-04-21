import { hslToHex } from "@/lib/game";
import type { GuessPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { HSLSliders } from "@/components/ui/HSLSliders";
import { ColorSwatch } from "@/components/ui/ColorSwatch";

export function GuessPhase({ hsl, colorIndex, onChange, onSubmit }: GuessPhaseProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="fade-in text-xl uppercase font-bold tracking-widest">
        {colorIndex + 1}/3
      </p>
      <HSLSliders
        hsl={hsl}
        onChange={onChange}
      />
      <div className="flex justify-center">
        <ColorSwatch
          color={hslToHex(hsl)}
          size="lg"
          bordered
        />
      </div>
      <div className="fade-in">
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
