import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "blue" | "dark-outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] cursor-pointer tracking-wide";

  const variants = {
    primary:
      "bg-yellow-accent text-navy-base hover:bg-yellow-hover shadow-[0_4px_20px_rgba(250,204,21,0.15)] hover:shadow-[0_4px_25px_rgba(250,204,21,0.3)] focus:ring-yellow-accent border border-yellow-accent",
    secondary:
      "bg-navy-light text-white hover:bg-navy-base focus:ring-navy-light border border-navy-light",
    outline:
      "border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/30 focus:ring-slate-300",
    "dark-outline":
      "border border-white/20 text-white hover:bg-white/10 hover:border-white/40 focus:ring-white/20",
    ghost:
      "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40 focus:ring-slate-400",
    blue:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.4)] focus:ring-blue-500 border border-blue-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
