import type { StartPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";

export function StartPhase({ onStart }: StartPhaseProps) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-8xl uppercase font-anton leading-none max-w-sm">
        COLOR GUESSER
      </h1>
      <p className="text-lg text-zinc-600 max-w-sm">
        How well can you remember colors? We show you one color, then you recreate it.
      </p>
      <Button
        onClick={onStart}
        variant="brand"
        fullWidth
      >
        PLAY
      </Button>
    </div>
  );
}
