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
  default: "bg-white text-black",
  primary: "bg-blue-500 text-white",
  secondary: "bg-green-500 text-white",
  // Add more variants as needed
};

const Card = ({
  variant = "default",
  size = "md",
  header,
  subHeader,
  children,
  className: customClassName,
}) => {
  // Merge the size and variant styles using tailwind-merge
  const cardStyles = twMerge(variants[size], variantColors[variant]);

  return (
    <div
      className={clsx(
        "container h-full rounded-lg shadow-2xl",
        cardStyles,
        customClassName
      )}
    >
      <div
        className={`mb-4  border-b-2 ${header || subHeader ? "" : "hidden"}`}
      >
        {header && (
          <h1 className="text-2xl text-primary font-bold mb-4">{header}</h1>
        )}
        {subHeader && (
          <h2 className="text-xl text-gray-600 mb-2">{subHeader}</h2>
        )}
      </div>
      <div className="my-4"> {children}</div>
    </div>
  );
};

export { Card };
