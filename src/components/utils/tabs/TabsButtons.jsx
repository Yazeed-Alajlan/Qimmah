import React, { useState } from "react";
import { Button } from "../buttons/Button";

const Tabs = ({ children, activeTab }) => {
  const [active, setActive] = useState(activeTab || 1);

  const changeTab = (tab) => {
    setActive(tab);
  };

  const tabElements = [];
  const filterElements = [];

  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child) && child.type.name === "Tab") {
      const { text, icon } = child.props;
      tabElements.push(
        <Button
          key={index}
          text={text}
          icon={icon}
          onClick={() => changeTab(index + 1)}
          className={`${
            active === index + 1
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border border-blue-500"
          } px-4 py-2 rounded`}
        >
          {child}
        </Button>
      );
    } else {
      filterElements.push(child);
    }
  });

  return (
    <div>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-wrap items-center gap-4">{tabElements}</div>
        {filterElements}
      </div>
      {/* Load Tab Content */}
      <div className="mt-4">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            if (
              React.isValidElement(child) &&
              child.type.name === "ButtonsGroup"
            )
              return null;
            return React.cloneElement(child, {
              isActive: index + 1 === active,
            });
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ children, isActive }) => {
  return (
    <div style={{ display: isActive ? "block" : "none" }}>
      <span>{children}</span>
    </div>
  );
};

export { Tabs, Tab };
