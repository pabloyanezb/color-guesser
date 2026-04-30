import { clsx } from "clsx";
import chroma from "chroma-js";
import type { ColorSwatchProps } from "@/types";

const sizes = {
  sm: "w-24 h-16",
  md: "w-48 h-32",
  lg: "w-80 h-48",
};

function getContrastTextColor(color: string): string {
  const whiteContrast = chroma.contrast(color, "#ffffff");
  const blackContrast = chroma.contrast(color, "#000000");
  return whiteContrast > blackContrast ? "text-zinc-200" : "text-black";
}

export function ColorSwatch({
  color,
  size = "md",
  bordered = false,
  contrastText = "auto",
  children,
}: ColorSwatchProps) {
  const textColor = contrastText === "auto"
    ? getContrastTextColor(color)
    : `text-${contrastText}`;

  return (
    <div
      className={clsx(
        sizes[size],
        textColor,
        "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        "flex items-center justify-center",
        bordered && "border-4 border-black",
      )}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}
