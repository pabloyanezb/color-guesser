"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const STORAGE_KEY = "color-guesser-highscores-v1";
const MAX_HIGH_SCORES_PER_PLAYER = 5;

export interface HighScoreEntry {
  id: string;
  playerName: string;
  finalScore: number;
  roundScores: number[];
  createdAt: string;
  // totalGuessTimeMs?: number;
}

interface AddHighScoreInput {
  playerName: string;
  finalScore: number;
  roundScores: number[];
  // totalGuessTimeMs?: number;
}

interface HighScoresState {
  activePlayerName: string;
  entries: HighScoreEntry[];
  setActivePlayerName: (name: string) => void;
  addHighScore: (input: AddHighScoreInput) => void;
  getTopFiveForPlayer: (playerName?: string) => HighScoreEntry[];
  clearHighScores: (playerName?: string) => void;
}

function sortHighScores(a: HighScoreEntry, b: HighScoreEntry): number {
  if (b.finalScore !== a.finalScore) {
    return b.finalScore - a.finalScore;
  }
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function normalizePlayerName(name: string): string {
  return name.trim();
}

export const useHighScoresStore = create<HighScoresState>()(
  persist(
    (set, get) => ({
      activePlayerName: "",
      entries: [],

      setActivePlayerName: (name) => {
        set({ activePlayerName: normalizePlayerName(name) });
      },

      addHighScore: (input) => {
        const playerName = normalizePlayerName(input.playerName);
        if (!playerName) {
          return;
        }

        const now = new Date().toISOString();
        const nextEntry: HighScoreEntry = {
          id: `${playerName}-${now}`,
          playerName,
          finalScore: Number(input.finalScore.toFixed(1)),
          roundScores: input.roundScores,
          createdAt: now,
          // // totalGuessTimeMs: input.totalGuessTimeMs,
        };

        const state = get();
        const playerEntries = state.entries
          .filter((entry) => entry.playerName === playerName)
          .concat(nextEntry)
          .sort(sortHighScores)
          .slice(0, MAX_HIGH_SCORES_PER_PLAYER);

        const otherEntries = state.entries.filter((entry) => entry.playerName !== playerName);

        set({
          activePlayerName: playerName,
          entries: [...otherEntries, ...playerEntries],
        });
      },

      getTopFiveForPlayer: (playerName) => {
        const targetPlayer = normalizePlayerName(playerName ?? get().activePlayerName);
        if (!targetPlayer) {
          return [];
        }

        return get().entries
          .filter((entry) => entry.playerName === targetPlayer)
          .sort(sortHighScores)
          .slice(0, MAX_HIGH_SCORES_PER_PLAYER);
      },

      clearHighScores: (playerName) => {
        const targetPlayer = normalizePlayerName(playerName ?? get().activePlayerName);
        if (!targetPlayer) {
          set({ entries: [] });
          return;
        }

        set((state) => ({
          entries: state.entries.filter((entry) => entry.playerName !== targetPlayer),
        }));
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activePlayerName: state.activePlayerName,
        entries: state.entries,
      }),
    },
  ),
);
