"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Button from "@/components/utils/buttons/Button";

const IndicatorsSelection = ({ settings, setSettings }) => {
  const [selectedType, setSelectedType] = useState("Indicators");

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", duration: 0.5 }}
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
                onClick={() => setSelectedType(type)}
                isActive={type === selectedType}
                className={type === selectedType ? "bg-gray-500/10" : ""}
                icon={settings[type].icon}
              />
            ))}
          </div>
        </Panel>
        <PanelResizeHandle
          className="bg-dark-light mx-2"
          style={{ width: "3px" }}
        />
        <Panel minSizePercentage={70}>
          <div className="overflow-auto max-h-60">
            {selectedType && (
              <div className="flex flex-col">
                {settings[selectedType]?.options?.map((option) => (
                  <div
                    key={option.value}
                    className="p-1 cursor-pointer "
                    onClick={() =>
                      settings[selectedType].onSelectFunction(option.value)
                    }
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "lightgray";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Panel>
      </PanelGroup>
    </motion.div>
  );
};

export default IndicatorsSelection;
