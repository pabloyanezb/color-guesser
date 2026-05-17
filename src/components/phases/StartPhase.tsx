import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import type { StartPhaseProps } from "@/types";
import { Button } from "@/components/ui/Button";

const PLAYER_TAG_MIN_LENGTH = 3;
const PLAYER_TAG_MAX_LENGTH = 4;

export function StartPhase({
  onStart,
  onViewHighScores,
  activePlayerName = "",
  onChangePlayerName,
}: StartPhaseProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [playerTag, setPlayerTag] = useState(activePlayerName);
  const [showTagError, setShowTagError] = useState(false);
  const canConfirm = playerTag.length >= PLAYER_TAG_MIN_LENGTH;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName) {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(playerTag.length, playerTag.length);
    }
  }, [isEditingName, playerTag]);

  const handleStartEditing = () => {
    setPlayerTag(activePlayerName);
    setShowTagError(false);
    setIsEditingName(true);
  };

  return (
    <>
      {onViewHighScores && (
        <button
          type="button"
          onClick={onViewHighScores}
          className="fixed top-4 right-4 z-50 text-xs font-bold uppercase tracking-widest underline underline-offset-4 hover:text-zinc-600 transition-colors cursor-pointer"
        >
          View High Scores
        </button>
      )}
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
        <form
          className="fade-in flex flex-col items-end"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (!isEditingName) {
              return;
            }
            if (playerTag.length < PLAYER_TAG_MIN_LENGTH) {
              setShowTagError(true);
              return;
            }
            onChangePlayerName?.(playerTag);
            setIsEditingName(false);
          }}
        >
          <div className="flex items-center whitespace-pre-wrap transition-all duration-200 ease-out">
            <span className="text-md font-bold uppercase tracking-widest underline underline-offset-4 py-2">Player: </span>

            <div className="relative w-12">
              <button
                type="button"
                onClick={handleStartEditing}
                className={clsx(
                  "absolute inset-0 text-left text-md font-bold uppercase tracking-widest",
                  "underline underline-offset-4 transition-all duration-200 ease-out",
                  isEditingName
                    ? "opacity-0 -translate-x-1 pointer-events-none"
                    : "opacity-100 translate-x-0",
                )}
              >
                {activePlayerName || "Set Name"}
              </button>

              <input
                ref={inputRef}
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
                className={clsx(
                  "bg-transparent text-md font-bold uppercase tracking-widest",
                  "outline-none underline underline-offset-4 w-full",
                  "transition-all duration-200 ease-out",
                  isEditingName
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-1 pointer-events-none",
                )}
                maxLength={PLAYER_TAG_MAX_LENGTH}
                autoComplete="off"
                aria-label="Player name"
              />
            </div>

            <div
              className={clsx(
                "overflow-hidden transition-all duration-200 ease-out",
                isEditingName && canConfirm
                  ? "ml-2 w-7 opacity-100 translate-x-0"
                  : "ml-0 w-0 opacity-0 translate-x-2",
              )}
            >
              <Button
                size="xs"
                variant="primary"
                type="submit"
                className={isEditingName && canConfirm ? "" : "pointer-events-none"}
              >
                ✓
              </Button>
            </div>
          </div>

          <p
            className={clsx(
              "text-xs font-bold uppercase tracking-wider text-red-700",
              "transition-all duration-200 ease-out",
              showTagError
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 h-0 overflow-hidden",
            )}
          >
            Name required (3-4 letters or numbers)
          </p>
        </form>
      </div>
    </>
  );
}
