import React from "react";

const cardVariants = {
  size: {
    default: "p-4",
    lg: "p-6",
  },
};

const Card = ({ className, size, children, header, subHeader, ...props }) => {
  const classes = `bg-white shadow-md rounded-md ${cardVariants.size[size]} ${className}`;

  return (
    <div className={classes} {...props}>
      {header && <h2 className="text-xl font-bold mb-2">{header}</h2>}
      {subHeader && <p className="text-gray-600 mb-4">{subHeader}</p>}
      {children}
    </div>
  );
};

Card.displayName = "Card";

export { Card, cardVariants };
