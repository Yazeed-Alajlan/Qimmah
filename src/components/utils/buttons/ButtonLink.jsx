// components/ButtonLink.js
import React from "react";

const ButtonLink = ({ text, icon, href }) => {
  return (
    <div className="p-6 pt-0">
      <a href={href} className="inline-block">
        <button
          className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
          type="button"
        >
          {text}
          {icon && <span className="ml-2">{icon}</span>}
        </button>
      </a>
    </div>
  );
};

export default ButtonLink;
