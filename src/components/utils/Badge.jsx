import React from "react";
import { cva } from "class-variance-authority";

// Define your color palette
const colors = {
  primary: "#3f51b5",
  primary_light: "#757de8",
  secondary: "#003f8f",
  secondary_light: "#2196f3",
  success: "#198754",
  info: "#0dcaf0",
  warning: "#ffc107",
  danger: "#dc3545",
  white: "#f7f7f7",
  light: "#f5f5f5",
  dark: "#131722",
  dark_light: "#2a2e39",
  grey: "#494d58",
  dark_green: "#104a31",
  light_green: "#46a681",
  dark_red: "#800000",
  light_red: "#ff0000",
};

const badgeVariants = cva("text-xs font-medium me-2 px-2.5 py-0.5 rounded", {
  variants: {
    color: Object.keys(colors).reduce((acc, color) => {
      acc[
        color
      ] = `bg-${color}-100 text-${color}-800 hover:bg-${color}-200 dark:bg-${color}-900 dark:text-${color}-300 dark:hover:bg-${color}-800`;
      return acc;
    }, {}),
  },
  defaultVariants: {
    color: "primary",
  },
});

const Badge = ({ color, text, className }) => {
  const classes = `${badgeVariants({ color })} ${className || ""}`;

  return <span className={classes}>{text}</span>;
};

export default Badge;
