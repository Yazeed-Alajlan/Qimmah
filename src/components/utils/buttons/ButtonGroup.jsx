import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Button from "./Button";

const buttonContentVariants = {
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

const ButtonGroup = ({
  buttons,
  indicatorType = "line",
  indicator = false,
  label,
  icon: Icon,
}) => {
  const [activeButton, setActiveButton] = useState(buttons[0]);

  const handleClick = (e, button, buttonClick) => {
    e.preventDefault();
    setActiveButton(button);
    if (buttonClick) buttonClick();
  };
  const isSelected = (button) => activeButton.label === button.label;

  const indicatorClass = clsx({
    "absolute w-full  bg-gray-400/30": true,
    " mt-2  left-0 right-0 h-1  rounded ": indicatorType === "line",
    "top-0 bottom-0 left-0 right-0 h-full rounded": indicatorType !== "line",
  });

  return (
    <div className="flex flex-col">
      <div className="flex gap-6 dsaasd">
        <div className="flex gap-2 text-2xl   items-center">
          {Icon && (
            <>
              <Icon />
            </>
          )}
          {label}
        </div>
        <div className="flex gap-6  py-2 backdrop-blur-sm ">
          {buttons?.map((button, index) => (
            <div
              key={index}
              className={`relative ${isSelected(button) ? " font-bold" : ""}`}
              // transition-all duration-300
            >
              {indicator ? (
                <>
                  <Button
                    onClick={(e) => handleClick(e, button, button.onClick)}
                    variant={"transparent"}
                    className={"text-primary"}
                    text={button.label}
                    icon={button.icon}
                  >
                    {/* {button.label} */}
                  </Button>

                  {isSelected(button) && indicator && (
                    <motion.div
                      layoutId="indicator"
                      className={indicatorClass}
                    />
                  )}
                </>
              ) : (
                <Button
                  onClick={(e) => handleClick(e, button, button.onClick)}
                  variant={"primary"}
                  type={"outline"}
                  text={button.label}
                  icon={button.icon}
                  className={` ${
                    isSelected(button) ? "bg-violet-500 text-white" : ""
                  }`}
                >
                  {/* {button.label} */}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="button-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeButton.name || "empty"}
            variants={buttonContentVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.3,
            }}
          >
            {activeButton.render && activeButton.render()}
          </motion.div>
        </AnimatePresence>
      </div> */}
    </div>
  );
};

export default ButtonGroup;
