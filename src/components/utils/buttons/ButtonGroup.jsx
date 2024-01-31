"use client";
import React, { useState, useEffect } from "react";

const ButtonGroup = ({ buttons, type }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  useEffect(() => {
    // Trigger the onClick callback when selectedButtons change
    selectedButtons.forEach((button) => {
      if (button.onClick) {
        button.onClick();
      }
    });
  }, [selectedButtons]);

  const handleButtonClick = (button) => {
    if (type === "checkbox") {
      // Toggle the selected state for checkboxes
      setSelectedButtons((prevSelected) =>
        prevSelected.includes(button)
          ? prevSelected.filter((b) => b !== button)
          : [...prevSelected, button]
      );
    } else if (type === "radio") {
      // Select only one for radio buttons
      setSelectedButtons([button]);
    }
  };

  return (
    <div className="flex space-x-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(button)}
          className={`px-4 py-2 rounded-md focus:outline-none ${
            selectedButtons.includes(button)
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {button.icon && <span className="mr-2">{button.icon}</span>}
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
