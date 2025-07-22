import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "default" | "primary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export const Button = ({
  variant = "default",
  className,
  children,
  icon,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-md transition-all duration-200";

  const variants: Record<ButtonVariant, string> = {
    default: "border hover:bg-accent hover:text-accent-foreground hover:bg-[#8A2BE2]/10",
    primary: "bg-[#8A2BE2] text-white px-6 py-3 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
