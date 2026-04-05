interface StartPhaseProps {
  onStart: () => void;
}

export function StartPhase({ onStart }: StartPhaseProps) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-8xl uppercase font-anton leading-none">
        COLOR<br />GUESSER
      </h1>
      <p className="text-lg text-zinc-600 max-w-sm">
        How well can you remember colors? We show you one color, then you recreate it.
      </p>
      <button
        onClick={onStart}
        className="py-4 bg-red-500 text-black text-2xl uppercase font-anton border-4 border-black cursor-pointer hover:bg-red-400 transition-colors"
      >
        PLAY
      </button>
    </div>
  );
}
