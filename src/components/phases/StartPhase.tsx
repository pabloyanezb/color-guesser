import { useState } from "react";
import type { StartPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";

const PLAYER_TAG_MIN_LENGTH = 3;
const PLAYER_TAG_MAX_LENGTH = 4;

export function StartPhase({
  onStart,
  activePlayerName = "",
  onChangePlayerName,
}: StartPhaseProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [playerTag, setPlayerTag] = useState(activePlayerName);
  const [showTagError, setShowTagError] = useState(false);

  const handleStartEditing = () => {
    setPlayerTag(activePlayerName);
    setShowTagError(false);
    setIsEditingName(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="fade-in text-8xl uppercase font-anton leading-none max-w-sm">
        COLOR GUESSER
      </h1>
      <p className="fade-in text-lg text-zinc-600 max-w-sm">
        How well can you remember colors? We show you one color, then you recreate it.
      </p>
      <div className="fade-in">
        <Button
          onClick={onStart}
          variant="brand"
          fullWidth
        >
          PLAY
        </Button>
      </div>
      <div className="fade-in flex flex-col gap-2">
        {!isEditingName && (
          <div className="text-end py-2">
            <button
              type="button"
              onClick={handleStartEditing}
              className="cursor-pointer text-md font-bold uppercase tracking-widest underline underline-offset-4"
            >
              Player: {activePlayerName || "Set Name"}
            </button>
          </div>
        )}
        {isEditingName && (
          <form
            className="flex flex-col gap-2 items-end"
            onSubmit={() => {
              if (playerTag.length < PLAYER_TAG_MIN_LENGTH) {
                setShowTagError(true);
                return;
              }
              onChangePlayerName?.(playerTag);
              setIsEditingName(false);
            }}
          >
            <div className="flex items-center underline underline-offset-4 whitespace-pre-wrap">
              <span className="text-md font-bold uppercase tracking-widest py-2">Player: </span>
              <input
                type="text"
                value={playerTag}
                onChange={(event) => {
                  const nextTag = event.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, PLAYER_TAG_MAX_LENGTH);
                  setPlayerTag(nextTag);
                  if (nextTag.length >= PLAYER_TAG_MIN_LENGTH) {
                    setShowTagError(false);
                  }
                }}
                placeholder="NAME"
                className="bg-transparent text-md font-bold uppercase tracking-widest outline-none w-14"
                minLength={PLAYER_TAG_MIN_LENGTH}
                maxLength={PLAYER_TAG_MAX_LENGTH}
                autoComplete="off"
                aria-label="Player name"
                autoFocus
              />
              <Button
                size="xs"
                variant="primary"
                type="submit"
              >
                ✓
              </Button>
            </div>
            {showTagError && (
              <p className="text-xs font-bold uppercase tracking-wider text-red-700">
                Name required (3-4 letters or numbers)
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
