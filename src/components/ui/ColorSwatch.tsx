interface ColorSwatchProps {
  color: string;
  size?: "sm" | "md" | "lg";
  border?: boolean;
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-32 h-32",
  lg: "w-48 h-48",
};

export function ColorSwatch({ color, size = "md", border = false }: ColorSwatchProps) {
  return (
    <div
      className={`${sizes[size]} rounded-2xl shadow-lg ${border ? "border-4 border-zinc-200" : ""}`}
      style={{ backgroundColor: color }}
    />
  );
}
