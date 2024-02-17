"use client";
import React, { useState } from "react";
import Modal from "../modal/Modal";
import Button from "../buttons/Button";
import Input from "../inputs/Input";

const Indicators = ({ indicators }) => {
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [updatedParams, setUpdatedParams] = useState({});

  const openModal = (indicator) => {
    setSelectedIndicator(indicator);
  };

  const closeModal = () => {
    setSelectedIndicator(null);
  };
  const handleInputChange = (paramName, e) => {
    const newValue = e.target.value;
    setUpdatedParams((prevParams) => ({
      ...prevParams,
      [paramName]: newValue,
    }));
  };

  const handleSubmit = () => {
    // Combine the existing indicator data with the updated parameters
    const updatedIndicator = {
      params: {
        ...selectedIndicator.params,
        kwargs: {
          ...selectedIndicator.params.kwargs,
          ...updatedParams,
        },
      },
    };

    // Call your function with the updated indicator
    // Example: getIndicatorData(symbol, updatedIndicator);

    // For demonstration, let's log the updated indicator
    console.log("Updated Indicator:", updatedIndicator);

    // Reset the updatedParams state after submission
    setUpdatedParams({});
    setSelectedIndicator(null);
  };

  return (
    <div>
      {indicators.map((indicator, index) => (
        <div
          key={index}
          onClick={() => openModal(indicator)}
          style={{ cursor: "pointer" }}
        >
          {indicator.name}
        </div>
      ))}

      {selectedIndicator && (
        <Modal
          title={selectedIndicator.fullName}
          isModalOpen={!!selectedIndicator}
          setIsModalOpen={closeModal}
          size="lg"
        >
          <div className="flex flex-col gap-6 justify-center items-center content-center">
            <h3>Parameters</h3>
            {Object.entries(selectedIndicator.params.kwargs).map(
              ([paramName, paramValue]) => (
                <Input
                  key={paramName}
                  label={paramName}
                  labelDirection="hr"
                  type="number" // You may want to adjust the type based on the parameter type
                  defaultValue={paramValue}
                  onChange={(e) => handleInputChange(paramName, e)}
                />
              )
            )}
            <h3>Other Settings</h3>
            <Input
              label="Color"
              type="color"
              labelDirection="hr"
              value={selectedIndicator.color}
              onChange={(e) => handleInputChange("color", e)}
            />
            <Input
              label="Pane Number"
              type="number"
              labelDirection="hr"
              value={selectedIndicator.pane}
              onChange={(e) => handleInputChange("pane", e)}
            />
          </div>
          <div></div>
          <Button onClick={handleSubmit} text="Submit" />
        </Modal>
      )}
    </div>
  );
};

export default Indicators;
