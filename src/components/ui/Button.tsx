import { clsx } from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "brand" | "info" | "success" | "warning";
  size?: "md" | "sm" | "xs";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const variants = {
  primary: {
    bg: "bg-black",
    text: "text-white",
    hover: "hover:bg-zinc-800",
  },
  brand: {
    bg: "bg-red-500",
    text: "text-black",
    hover: "hover:bg-red-400",
  },
  info: {
    bg: "bg-blue-400",
    text: "text-black",
    hover: "hover:bg-blue-300",
  },
  success: {
    bg: "bg-green-400",
    text: "text-black",
    hover: "hover:bg-green-300",
  },
  warning: {
    bg: "bg-yellow-300",
    text: "text-black",
    hover: "hover:bg-yellow-400",
  },
};

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  className,
}: ButtonProps) {
  const v = variants[variant];
  const sizes = {
    md: "py-4 px-8 text-2xl",
    sm: "py-2 px-4 text-base",
    xs: "py-0 px-1 text-sm",
  };

  const sizeClass = sizes[size];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        v.bg,
        v.text,
        !disabled && v.hover,
        "uppercase font-bold border-4 border-black",
        sizeClass,
        "cursor-pointer transition-colors",
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
    >
      {children}
    </button>
  );
}
