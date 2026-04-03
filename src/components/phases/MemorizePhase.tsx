import { ColorSwatch } from "@/components/ui/ColorSwatch";

interface MemorizePhaseProps {
  color: string;
  timeLeft: number;
}

export function MemorizePhase({ color, timeLeft }: MemorizePhaseProps) {
  return (
    <>
      <p className="text-zinc-600 mb-4">Memorize this color</p>
      <ColorSwatch color={color} size="lg" />
      <p className="text-2xl font-mono mt-8">{timeLeft}s</p>
    </>
  );
}
