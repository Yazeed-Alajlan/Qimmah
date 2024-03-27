import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const NavBar = ({ routes }) => {
  const routesRef = useRef([]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = routesRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="flex">
      <div className="flex flex-row relative gap-10 border-b-2 overflow-auto    ">
        {routes.map((route, index) => {
          const isActive = activeTabIndex === index;

          return (
            <Link
              key={index}
              href={route.to}
              ref={(el) => (routesRef.current[index] = el)}
              className={`flex justify-center align-middle items-center gap-2 mb-2 px-2     ${
                isActive ? `text-primary-700 font-bold` : `hover:font-bold`
              }   `}
              onClick={() => handleTabClick(index)}
            >
              <span className="mx-2"> {route.icon && <route.icon />}</span>
              <span> {route.name}</span>
            </Link>
          );
        })}
        <span
          className="absolute bottom-0 left-0 flex overflow-hidden  pt-2 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="h-1 w-full bg-primary-500" />
        </span>
      </div>
      <div>
        {/* Render the content for the active tab if needed */}
        {/* {activeTabIndex !== null && tabs[activeTabIndex]?.render && (
          <div className="mt-4">{tabs[activeTabIndex].render()}</div>
        )} */}
      </div>
    </div>
  );
};
