// Badge.js
import React from "react";
import { cva } from "class-variance-authority";

const badgeVariants = cva("text-xs font-medium me-2 px-2.5 py-0.5 rounded", {
  variants: {
    variant: {
      primary:
        "bg-primary-100 text-primary-700 hover:bg-primary-300 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800",
      primary_light:
        "bg-primary-light-100 text-primary-light-800 hover:bg-primary-light-200 dark:bg-primary-light-900 dark:text-primary-light-300 dark:hover:bg-primary-light-800",
      secondary:
        "bg-secondary-100 text-secondary-800 hover:bg-secondary-200 dark:bg-secondary-900 dark:text-secondary-300 dark:hover:bg-secondary-800",
      secondary_light:
        "bg-secondary-light-100 text-secondary-light-800 hover:bg-secondary-light-200 dark:bg-secondary-light-900 dark:text-secondary-light-300 dark:hover:bg-secondary-light-800",
      success:
        "bg-success-100 text-success-800 hover:bg-success-200 dark:bg-success-900 dark:text-success-300 dark:hover:bg-success-800",
      info: "bg-info-100 text-info-800 hover:bg-info-200 dark:bg-info-900 dark:text-info-300 dark:hover:bg-info-800",
      warning:
        "bg-warning-100 text-warning-800 hover:bg-warning-200 dark:bg-warning-900 dark:text-warning-300 dark:hover:bg-warning-800",
      danger:
        "bg-danger text-danger-800 hover:bg-danger-200 dark:bg-danger-900 dark:text-danger-300 dark:hover:bg-danger-800",
      white:
        "bg-white-100 text-white-800 hover:bg-white-200 dark:bg-white-900 dark:text-white-300 dark:hover:bg-white-800",
      light:
        "bg-light-100 text-light-800 hover:bg-light-200 dark:bg-light-900 dark:text-light-300 dark:hover:bg-light-800",
      dark: "bg-dark-100 text-dark-800 hover:bg-dark-200 dark:bg-dark-900 dark:text-dark-300 dark:hover:bg-dark-800",
      dark_light:
        "bg-dark-light-100 text-dark-light-800 hover:bg-dark-light-200 dark:bg-dark-light-900 dark:text-dark-light-300 dark:hover:bg-dark-light-800",
      grey: "bg-grey-100 text-grey-800 hover:bg-grey-200 dark:bg-grey-900 dark:text-grey-300 dark:hover:bg-grey-800",
      dark_green:
        "bg-dark-green-100 text-dark-green-800 hover:bg-dark-green-200 dark:bg-dark-green-900 dark:text-dark-green-300 dark:hover:bg-dark-green-800",
      light_green:
        "bg-light-green-100 text-light-green-800 hover:bg-light-green-200 dark:bg-light-green-900 dark:text-light-green-300 dark:hover:bg-light-green-800",
      dark_red:
        "bg-dark-red-100 text-dark-red-800 hover:bg-dark-red-200 dark:bg-dark-red-900 dark:text-dark-red-300 dark:hover:bg-dark-red-800",
      light_red:
        "bg-light-red-100 text-light-red-800 hover:bg-light-red-200 dark:bg-light-red-900 dark:text-light-red-300 dark:hover:bg-light-red-800",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const Badge = ({ variant, text, className }) => {
  const classes = `${badgeVariants({ variant })} ${className || ""}`;
  console.log(classes);
  return <span className={classes}>{text}</span>;
};

export default Badge;
