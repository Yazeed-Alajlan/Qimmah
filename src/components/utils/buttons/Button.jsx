import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Define variant styles using class-variance-authority
const variants = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

// Define variant styles for background colors
const variantColors = {
  default:
    "bg-primary-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
  danger: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
  outline:
    "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
  subtle:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
  ghost:
    "bg-transparent dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
  link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-300 hover:bg-transparent dark:hover:bg-transparent",
  // Add more variants as needed
};

const Button = ({
  children,
  href,
  variant,
  size,
  text,
  icon: Icon,
  onClick,
  className: customClassName,
}) => {
  // Merge the size and variant styles using tailwind-merge
  const buttonStyles = twMerge(variants[size], variantColors[variant]);
  console.log(text);
  return (
    <button
      className={clsx(
        "inline-flex items-center  justify-center rounded-md text-sm font-medium transition-colors  dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
        buttonStyles,
        customClassName
      )}
      onClick={onClick}
    >
      {Icon && (
        <span className=" text-lg mr-2">
          <Icon />
        </span>
      )}
      {text && <div className="font-bold">{text}</div>}
      <div className="flex items-center gap-2">{children}</div>
    </button>
  );
};

Button.defaultProps = {
  size: "md",
  variant: "default",
};

export { Button };
