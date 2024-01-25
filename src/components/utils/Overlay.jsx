import React from "react";

const Overlay = ({ children, direction }) => {
  return (
    <div className=" text-center group ">
      {/* Content that is always visible */}
      <div>{children[0]}</div>

      {/* Content that appears on hover */}
      <div
        className={`opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 px-3 pointer-events-none`}
      >
        {children[1]}
        <svg
          className="absolute text-black h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};

export default Overlay;
