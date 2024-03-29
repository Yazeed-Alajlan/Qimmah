import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const variants = {
  primary: {
    filled:
      "bg-primary-700 hover:bg-primary-500 focus:ring-primary-300 text-white",
    outline:
      "text-primary-700 border-[1px] border-primary-700 hover:bg-primary-700 hover:text-white focus:ring-primary-700",
    tag: "text-primary  bg-gray-600/10  rounded-xl ",
  },
  secondary: {
    filled: "bg-slate-500 hover:bg-slate-400 focus:ring-slate-300 text-white",
    outline:
      "text-slate-500 border-[1px] border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-slate-500",
  },
  danger: {
    filled: "bg-red-500 hover:bg-red-400 focus:ring-red-300 text-white",
    outline:
      "text-red-500 border-[1px] border-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500",
    tag: "text-black text-sm bg-red-500/10 hover:bg-red-900/20 active:bg-red-900/30 rounded-xl transition-all select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none",
  },
  success: {
    filled: "bg-green-500 hover:bg-green-400 focus:ring-green-300 text-white",
    outline:
      "text-green-500 border-[1px] border-green-500 hover:bg-green-500 hover:text-white focus:ring-green-500",
  },
  warning: {
    filled:
      "bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-300 text-black",
    outline:
      "text-yellow-500 border-[1px] border-yellow-500 hover:bg-yellow-500 hover:text-black focus:ring-yellow-500",
  },
  transparent: {
    filled: "bg-transparent text-black",
  },
  text: {
    filled:
      "flex  items-center gap-2  px-4 py-2 font-sans  font-bold text-center text-gray-900 transition-all rounded-lg select-none  hover:bg-gray-900/10 active:bg-gray-900/20",
  },
};

const sizeVariants = {
  sm: "px-2 py-2",
  md: "px-4 py-2",
  lg: "px-6 py-4",
};

const Button = ({
  className,
  children,
  rounded = true,
  variant = "primary",
  size = "md",
  type = "filled",
  isDefault = true,
  fullWidth,
  disabled,

  icon: Icon,
  text,
  onClick,
}) => {
  const variantStyles = variants[variant] || variants.primary;
  //focus:ring-[1px]
  const baseClasses = clsx(
    isDefault &&
      "flex jsutify-center items-center gap-2 text-lg  select-none [outline:none] shadow-md disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-100 disabled:shadow-inner",
    rounded && "rounded-md",
    fullWidth && "w-full",
    variantStyles[type],
    sizeVariants[size],
    className
  );
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${fullWidth ? "w-full" : ""} inline-flex`}
      style={{ display: "inline-flex" }} // Set to inline-flex to avoid block behavior
    >
      <button
        onClick={onClick}
        className={twMerge(baseClasses)}
        disabled={disabled}
      >
        {children}
        {Icon && <>{<Icon />}</>}

        {text && <span> {text}</span>}
      </button>
    </motion.div>
  );
};

export default Button;
