interface StartPhaseProps {
  onStart: () => void;
}

export function StartPhase({ onStart }: StartPhaseProps) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Color Guesser</h1>
      <p className="text-zinc-600 mb-8 text-center max-w-md">
        Memorize a color and try to recreate it from memory.
      </p>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
      >
        Play Now
      </button>
    </>
  );
}
