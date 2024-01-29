import React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center  justify-center rounded-md text-sm font-medium transition-colors  dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
        danger: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-300 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-6",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    { className, children, href, variant, size, text, icon, onClick, ...props },
    ref
  ) => {
    const classes = buttonVariants({ variant, size, className });

    const renderButtonContent = () => (
      <>
        {icon && <span className="mr-2">{icon}</span>}
        {text && <div className="font-bold">{text}</div>}
        <div className="flex items-center gap-2">{children}</div>
      </>
    );

    if (href) {
      return (
        <Link href={href} passHref>
          <a className={classes} onClick={onClick}>
            {renderButtonContent()}
          </a>
        </Link>
      );
    }

    return (
      <button className={classes} ref={ref} onClick={onClick} {...props}>
        {renderButtonContent()}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
