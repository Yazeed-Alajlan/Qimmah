// Button.jsx
import classnames from "classnames";

function Button({ size, bgColor, textColor, children }) {
  return (
    <button
      className={classnames(
        ` bg-${bgColor} text-${textColor} font-bold py-2 px-4 rounded`,
        {
          "text-xs": size === "sm",
          "text-xl": size === "lg",
        }
      )}
    >
      {children}
    </button>
  );
}

export default Button;
