import { clsx } from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

export function Button({ children, onClick, variant = "primary", fullWidth = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "py-4 text-2xl uppercase font-bold border-4 border-black",
        "cursor-pointer transition-colors",
        fullWidth && "w-full",
        variant === "primary" && "bg-black text-white hover:bg-zinc-800",
        variant === "secondary" && "bg-zinc-200 text-zinc-800 hover:bg-zinc-300",
        variant === "danger" && "bg-red-500 text-black hover:bg-red-400"
      )}
    >
      {children}
    </button>
  );
}
