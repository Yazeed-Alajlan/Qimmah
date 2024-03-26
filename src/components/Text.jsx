import React from "react";

const Text = ({ title, text }) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <span className="text-lg font-semibold ">{title}:</span>{" "}
      {/* Add bold font and margin right */}
      <span>{text}</span>
    </div>
  );
};

export default Text;
