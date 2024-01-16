import React, { useEffect, useRef, useState } from "react";

export const SlidingTabs = ({ tabs, getIndex }) => {
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
    if (getIndex) {
      getIndex(index);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-row relative mx-auto flex h-12 rounded-3xl border border-black/40 bg-neutral-800 px-2 backdrop-blur-sm">
        <span
          className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="h-full w-full rounded-3xl bg-gray-200/30" />
        </span>
        {tabs.map((tab, index) => {
          const isActive = activeTabIndex === index;

          return (
            <button
              key={index}
              ref={(el) => (tabsRef.current[index] = el)}
              className={`flex justify-center items-center  ${
                isActive ? `` : `hover:text-neutral-300`
              } my-auto cursor-pointer select-none rounded-full px-4 text-center font-light text-white`}
              onClick={() => handleTabClick(index)}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.name}
            </button>
          );
        })}
      </div>
      <div>
        {activeTabIndex !== null && tabs[activeTabIndex]?.render && (
          <div className="mt-4">{tabs[activeTabIndex].render()}</div>
        )}
      </div>
    </div>
  );
};
