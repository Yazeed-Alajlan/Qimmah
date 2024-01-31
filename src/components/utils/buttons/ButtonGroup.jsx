"use client";
import React, { useState, useEffect } from "react";

const ButtonGroup = ({ buttons, type, setState }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (button) => {
    console.log(selectedButtons);
    if (type === "checkbox") {
      // Toggle the selected state for checkboxes
      setSelectedButtons((prevSelected) =>
        prevSelected.includes(button)
          ? prevSelected.filter((b) => b !== button)
          : [...prevSelected, button]
      );
      button.onClick();
    } else if (type === "radio") {
      button.onClick();

      // Select only one for radio buttons
      setSelectedButtons([button]);
    }
    // setState("HELLO FROM CHILD" + type);
    console.log("HELLO");
    if (button.onClick) {
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
