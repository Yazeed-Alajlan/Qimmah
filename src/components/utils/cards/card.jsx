import React from "react";

const cardVariants = {
  size: {
    default: "p-4",
    lg: "p-6",
  },
};

const Card = ({ className, size, children, header, subHeader, ...props }) => {
  const classes = `bg-light shadow-md rounded-md p-6 ${cardVariants.size[size]} ${className}`;

  return (
    <div className={classes} {...props}>
      <div className={`mb-4 border-b-2 ${header || subHeader ? "" : "hidden"}`}>
        {header && (
          <h1 className="text-2xl text-primary font-bold mb-4">{header}</h1>
        )}
        {subHeader && (
          <h2 className="text-xl text-gray-600 mb-2">{subHeader}</h2>
        )}
      </div>

      {children}
    </div>
  );
};

Card.displayName = "Card";

export { Card, cardVariants };
