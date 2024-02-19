"use client";
import React, { useState } from "react";
import Modal from "../modal/Modal";
import Button from "../buttons/Button";
import Input from "../inputs/Input";

const Indicators = ({ indicators, setIndicators }) => {
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [updatedParams, setUpdatedParams] = useState({});

  const openModal = (indicator) => {
    setSelectedIndicator(indicator);
  };

  const closeModal = () => {
    setSelectedIndicator(null);
  };
  const handleInputChange = (paramName, value, lineIndex, name) => {
    value = parseInt(value);
    const updatedObject = { ...selectedIndicator };
    updatedObject.params.kwargs[name] = value;
    updatedObject.lines[lineIndex].arg = value;
    setUpdatedParams(updatedObject);
  };
  const handleSubmit = () => {
    console.log("--------------------------------------------");
    console.log(updatedParams);

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
            {/* {Object.entries(selectedIndicator.params.kwargs).map(
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
            )} */}
            {Object.entries(selectedIndicator.lines).map(
              ([key, line], index) => (
                <>
                  <Input
                    key={line.name}
                    label={line.name}
                    labelDirection="hr"
                    type="number" // You may want to adjust the type based on the parameter type
                    defaultValue={line.arg}
                    onChange={(e) =>
                      handleInputChange("arg", e.target.value, index, line.name)
                    }
                  />
                  <Input
                    label="Color"
                    type="color"
                    labelDirection="hr"
                    defaultValue={line.color}
                    onChange={(e) => handleInputChange("color", e)}
                  />
                </>
              )
            )}

            <Input
              label="Pane Number"
              type="number"
              labelDirection="hr"
              defaultValue={selectedIndicator.pane}
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
