import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Button from "./CustomButtonOLD";

const tabContentVariants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};

const ButtonGroup = ({ tabs, indicatorType = "line" }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleClick = (e, tab, tabClick) => {
    e.preventDefault();
    setActiveTab(tab);
    if (tabClick) tabClick();
  };
  const isSelected = (tab) => activeTab.name === tab.name;

  const indicatorClass = clsx({
    "absolute w-full  bg-gray-900/30": true,
    " mt-2  left-0 right-0 h-1  rounded ": indicatorType === "line",
    "top-0 bottom-0 left-0 right-0 h-full rounded-3xl":
      indicatorType !== "line",
  });

  return (
    <div className="flex flex-col">
      <div className="flex gap-6 border-b-4 py-2 backdrop-blur-sm bg-neutral-500">
        {tabs?.map((tab) => (
          <div
            key={tab.name}
            className={`relative ${
              isSelected(tab) ? "transition-all duration-300 bg-red-500" : ""
            }`}
          >
            <Button
              onClick={(e) => handleClick(e, tab, tab.onClick)}
              variant={"transparent"}
              text={tab.label}
              icon={<tab.icon />}
            >
              {/* {tab.label} */}
            </Button>

            {isSelected(tab) && (
              <motion.div layoutId="indicator" className={indicatorClass} />
            )}
          </div>
        ))}
      </div>

      <div className="tab-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.name || "empty"}
            variants={tabContentVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.3,
            }}
          >
            {activeTab && activeTab.render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ButtonGroup;
