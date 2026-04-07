import type { ColorSwatchProps } from "@/types";

const sizes = {
  sm: "w-24 h-16",
  md: "w-48 h-32",
  lg: "w-80 h-48",
};

export function ColorSwatch({ color, size = "md", bordered = false, children }: ColorSwatchProps) {
  return (
    <div
      className={`${sizes[size]} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center ${bordered ? "border-4 border-black" : ""}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}
