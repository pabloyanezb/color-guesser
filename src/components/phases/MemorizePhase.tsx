import { ColorSwatch } from "@/components/ui/ColorSwatch";

interface MemorizePhaseProps {
  color: string;
  timeLeft: number;
}

export function MemorizePhase({ color, timeLeft }: MemorizePhaseProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xl uppercase font-bold tracking-widest">Memorize</p>
      <ColorSwatch color={color} size="lg">
        <span className="text-6xl font-bold">{timeLeft}</span>
      </ColorSwatch>
    </div>
  );
}
