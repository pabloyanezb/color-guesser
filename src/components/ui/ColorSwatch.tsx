interface ColorSwatchProps {
  color: string;
  size?: "sm" | "md" | "lg";
  border?: boolean;
  children?: React.ReactNode;
}

const sizes = {
  sm: "w-16 h-16",
  md: "w-40 h-40",
  lg: "w-64 h-64",
};

export function ColorSwatch({ color, size = "md", border = false, children }: ColorSwatchProps) {
  return (
    <div
      className={`${sizes[size]} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center ${border ? "border-4 border-black" : ""}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}
