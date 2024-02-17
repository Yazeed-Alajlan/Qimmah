"use client";

import React from "react";

const Input = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  isDisabled,
  name,
  min,
  max,
  ref,
  defaultValue,
  labelDirection = "vr",
}) => {
  const isHorizontal = labelDirection === "hr" || labelDirection == null;

  return (
    <div className={`flex w-full ${isHorizontal ? "" : "flex-col"} gap-2`}>
      <p className="text-lg my-auto whitespace-nowrap font-semibold">{label}</p>
      <input
        className="w-full p-2 border rounded focus:outline-none focus:ring"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        min={min}
        max={max}
        ref={ref}
        name={name}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
