import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

// Define variant styles using class-variance-authority
const sizeVariants = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

// Define variant styles for background colors
const colorVariants = {
  primary:
    "bg-primary-900  text-white  hover:bg-primary-700 dark:bg-primary-50 dark:text-primary-900 border-primary",
  danger: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
  subtle:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
  ghost:
    "bg-transparent dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-state=open:bg-transparent dark-data-state=open:bg-transparent",
  link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-300 hover:bg-transparent dark:hover:bg-transparent",
  hover:
    "text-black text-sm bg-gray-500/10 hover:bg-gray-900/20 active:bg-gray-900/30 rounded-xl transition-all select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none",
};
const typeVariants = {
  outline: "bg-white border  text-black",
  outline_rounded: "bg-transparent border rounded-xl  text-black",
  filled: "rounded-md",
  rounded: "rounded-xl",
  // Add more type variants as needed
};
const Button = ({
  children,
  href,
  color,
  size,
  text,
  type,
  icon: Icon,
  onClick,
  className: customClassName,
}) => {
  // Merge the size and variant styles using tailwind-merge
  const buttonStyles = twMerge(
    sizeVariants[size],
    colorVariants[color],
    typeVariants[type]
  );
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{ display: "inline-flex" }} // Set to inline-flex to avoid block behavior
    >
      <button
        className={clsx(
          "inline-flex items-center gap-2 justify-center rounded px-4 py-2",
          buttonStyles,
          customClassName
        )}
        onClick={onClick}
      >
        {Icon && (
          <span className=" text-lg">
            <Icon />
          </span>
        )}
        {text}
      </button>
    </motion.div>
  );
};

Button.defaultProps = {
  size: "md",
  type: "filled",
  color: "primary",
};

export { Button };
