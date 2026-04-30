export type Phase = "start" | "memorize" | "guess" | "results" | "final";

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorResult {
  original: string;
  guess: string;
  score: number;
}

export interface GameConfig {
  rotationCount: number;
  rotationBaseDelay: number;
  rotationIncrement: number;
  targetDisplayTime: number;
  memorizeTime: number;
}

export interface GameRound {
  targetColor: string;
  guessColor?: string;
  score?: number;
}

export interface GameState {
  rounds: GameRound[];
  currentRound: number;
}

export interface StartPhaseProps {
  onStart: () => void;
}

export interface MemorizePhaseProps {
  targetColor: string;
  onComplete: () => void;
}

export interface GuessPhaseProps {
  hsl: HSL;
  colorIndex: number;
  onChange: (hsl: HSL) => void;
  onSubmit: () => void;
}

export interface ResultsPhaseProps {
  round: GameRound;
  onContinue: () => void;
}

export interface FinalResultsPhaseProps {
  rounds: GameRound[];
  onPlayAgain: () => void;
}

export interface ColorSwatchProps {
  color: string;
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  contrastText?: "auto" | "black" | "white";
  children?: React.ReactNode;
}
