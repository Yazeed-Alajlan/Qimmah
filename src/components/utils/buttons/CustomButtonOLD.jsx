import PropTypes from "prop-types";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: {
    base: "bg-blue-500 hover:bg-blue-400 focus:ring-blue-300 text-white",
  },
  "primary-outline": {
    base: "text-blue-500 border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500",
  },
  secondary: {
    base: "bg-slate-500 hover:bg-slate-400 focus:ring-slate-300 text-white",
  },
  "secondary-outline": {
    base: "text-slate-500 border-[1px] border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-slate-500",
  },
  // ... add more variants as needed
};

const Button = ({ className, children, rounded, variant, ...props }) => {
  const variantStyles = variants[variant] || variants.primary;

  const baseClasses = clsx(
    "px-4 py-2 cursor-pointer select-none [outline:none] shadow-md focus:ring-[1px] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-100 disabled:shadow-inner",
    rounded && "rounded",
    variantStyles.base,
    className
  );

  return (
    <button className={twMerge(baseClasses)} {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  rounded: true,
  variant: "primary",
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  rounded: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "primary-outline",
    "secondary",
    "secondary-outline",
    // Add more variants as needed
  ]),
};

export default Button;
