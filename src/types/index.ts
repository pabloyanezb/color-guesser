export type Phase = "start" | "memorize" | "guess" | "results";

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

export interface ColorSequence {
  colors: string[];
  targetColor: string;
}

export interface GameConfig {
  rotationCount: number;
  rotationBaseDelay: number;
  rotationIncrement: number;
  targetDisplayTime: number;
  memorizeTime: number;
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
  onChange: (hsl: HSL) => void;
  onSubmit: () => void;
}

export interface ResultsPhaseProps {
  original: string;
  guess: string;
  score: number;
  onPlayAgain: () => void;
}

export interface ColorSwatchProps {
  color: string;
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  children?: React.ReactNode;
}
