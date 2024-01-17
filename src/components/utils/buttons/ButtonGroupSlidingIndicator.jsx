import React, { useEffect, useRef, useState } from "react";

export const ButtonGroupSlidingIndicator = ({
  buttons,
  activeButtonIndex,
  onButtonClick,
  fullWidth = false,
  iconsOnly = true,
}) => {
  const buttonsRef = useRef([]);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorLeft, setIndicatorLeft] = useState(0);

  useEffect(() => {
    if (activeButtonIndex === null) {
      return;
    }

    const setIndicatorPosition = () => {
      const currentButton = buttonsRef.current[activeButtonIndex];
      setIndicatorLeft(currentButton?.offsetLeft ?? 0);
      setIndicatorWidth(currentButton?.clientWidth ?? 0);
    };

    setIndicatorPosition();
  }, [activeButtonIndex]);

  const handleButtonClick = (index, value, label) => {
    if (onButtonClick) {
      onButtonClick({ index, value, label });
    }
  };

  return (
    <div
      className="flex-row justify-center  relative mx-auto me-auto flex h-12 rounded-3xl border border-black/40 bg-neutral-800 px-2 backdrop-blur-sm"
      style={{ width: fullWidth ? "100%" : "min-content" }}
    >
      <span
        className="indicator absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
        style={{ left: indicatorLeft, width: indicatorWidth }}
      >
        <span className="h-full w-full rounded-3xl bg-gray-200/30" />
      </span>
      {buttons.map((button, index) => {
        const isActive = activeButtonIndex === index;

        return (
          <button
            key={index}
            ref={(el) => (buttonsRef.current[index] = el)}
            className={`flex justify-center items-center ${
              isActive ? `` : `hover:text-neutral-300`
            } my-auto cursor-pointer select-none rounded-full px-4 text-center font-light text-white`}
            onClick={() => handleButtonClick(index, button.value, button.label)}
          >
            <span className="me-2"> {button.icon}</span>
            {iconsOnly ? <></> : <span> {button.label}</span>}
          </button>
        );
      })}
    </div>
  );
};
