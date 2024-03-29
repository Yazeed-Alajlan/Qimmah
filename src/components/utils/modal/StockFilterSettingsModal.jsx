"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { TbX } from "react-icons/tb";
import Modal from "./Modal";
import Button from "../buttons/Button";
import InputSelect from "../inputs/InputSelect";
import Input from "../inputs/Input";

const StockFilterSettingsModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  settings,
  setSettings,
}) => {
  const [selectedType, setSelectedType] = useState("");
  const [inputValues, setInputValues] = useState({});

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    const defaultValues = {};
    settings[type].options.forEach((option) => {
      console.log(option);

      defaultValues[option.name] = option.value || option.defaultValue || "";
    });
    setInputValues(defaultValues);
  };

  const handleInputChange = (name, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const updateSettings = (type, newOptions) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings };
      updatedSettings[type].options = newOptions;
      return updatedSettings;
    });
  };

  const handleSubmit = async () => {
    // Do something with selectedType and inputValues
    console.log("Selected Type:", selectedType);
    console.log("Input Values:", inputValues);
    // Invoke the onSave method for the selected setting
    const newOptions = settings[selectedType].options.map((option) => ({
      ...option,
      value: inputValues[option.name] || option.defaultValue || "",
    }));
    updateSettings(selectedType, newOptions);
    if (
      selectedType &&
      settings[selectedType] &&
      settings[selectedType].onSave
    ) {
      console.log(inputValues);

      settings[selectedType].onSave(inputValues);
    }
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={title}
      size={"lg"}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <PanelGroup direction="horizontal">
          <Panel defaultSizePercentage={25} minSizePercentage={20}>
            <div className="flex justify-center items-center flex-col">
              {Object.keys(settings).map((type) => (
                <Button
                  variant={"text"}
                  isDefault={false}
                  fullWidth
                  text={type}
                  key={type}
                  onClick={() => handleTypeSelection(type)}
                  isActive={type === selectedType}
                  className={type === selectedType ? "bg-gray-500/10" : ""}
                  icon={settings[type].icon}
                />
              ))}
            </div>
          </Panel>
          <PanelResizeHandle className="bg-dark mx-3 w-1" />
          <Panel minSizePercentage={70}>
            <div>
              {selectedType && (
                <div>
                  {settings[selectedType].options.map((option) => (
                    <div key={option.name}>
                      {option.isSelect ? (
                        <InputSelect
                          label={option.label}
                          isMulti={option.isMulti}
                          onChange={(e) => {
                            handleInputChange(
                              option.name,
                              option.isMulti ? option.defaultValue : e?.value
                            );
                          }}
                          options={option.options}
                          defaultValue={
                            inputValues[option.name] ||
                            option.defaultValue ||
                            ""
                          }
                          value={
                            inputValues[option.name] ||
                            option.defaultValue ||
                            ""
                          }
                          placeholder={option.placeholder}
                        />
                      ) : (
                        <Input
                          type={option.type}
                          label={option.label}
                          onChange={(e) =>
                            handleInputChange(option.name, e.target.value)
                          }
                          value={
                            inputValues[option.name] ||
                            option.defaultValue ||
                            ""
                          }
                          placeholder={option.placeholder}
                          max={option.max}
                          min={option.min}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
        <div className="flex itmes-center justify-end">
          <Button text={"Save"} onClick={handleSubmit} />
        </div>
      </motion.div>
    </Modal>
  );
};

export default StockFilterSettingsModal;
