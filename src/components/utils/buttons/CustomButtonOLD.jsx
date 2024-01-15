import React from "react";

const Button = ({ bgColor, color, size, type, children, isPill }) => {
  var buttonClass =
    "select-none font-sans text-xs font-bold uppercase transition-all align-middle ";

  const colorClass = bgColor || "bg-primary"; // Default color if not provided

  // Apply color class to the button
  buttonClass += colorClass;
  // Set size classes based on the size prop
  switch (size) {
    case "small":
      buttonClass += " text-xs py-2 px-4";
      break;
    case "large":
      buttonClass += " text-lg py-4 px-8";
      break;
    default:
      // Default size if size prop is not recognized
      buttonClass += " text-sm py-3 px-6";
  }

  // Check the button type and set appropriate styles
  switch (type) {
    case "outlined":
      buttonClass +=
        buttonClass += ` border border-${color}-900 text-${color}-900 hover:opacity-75 focus:ring focus:ring-${color}-300 active:opacity-[0.85]`;
      break;
    case "text":
      buttonClass += ` bg-transparent text-${colorClass}-900 hover:${colorClass} active:bg-${bgColor}-900/20`;
      break;
    default:
      // Default to a filled button if type prop is not recognized
      buttonClass +=
        " rounded-lg shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85]";
  }
  console.log(buttonClass);
  // Add pill-shaped style if isPill prop is true
  if (isPill) {
    buttonClass += " rounded-full";
  }

  return (
    <button
      className={buttonClass}
      type="button"
      disabled={type === "disabled"}
    >
      {children}
    </button>
  );
};

export default Button;
