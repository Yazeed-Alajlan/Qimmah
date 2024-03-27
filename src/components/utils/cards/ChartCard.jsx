"use client";

import React, { useState } from "react";
import { Card } from "./Card";
import { FaHeart } from "react-icons/fa";
import { ButtonGroupSlidingIndicator } from "../buttons/ButtonGroupSlidingIndicator";
import DynamicChart from "../charts/DynamicChart";
import { MdShowChart } from "react-icons/md";
import { MdOutlineBarChart } from "react-icons/md";

const ChartCard = ({ data }) => {
  const [chartType, setChartType] = useState("bar");
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const handleButtonClick = ({ index, value, label }) => {
    setChartType(value);
    setActiveButtonIndex(index);
    // Additional logic if needed
  };
  const buttons = [
    { label: "Bar", value: "bar", icon: <MdOutlineBarChart /> },
    { label: "Line", value: "line", icon: <MdShowChart /> },
    // { label: "Scatter", value: "scatter", icon: <FaHeart /> },
    // Add more buttons as needed
  ];

  return (
    <Card>
      <DynamicChart data={data} type={chartType} />
      <ButtonGroupSlidingIndicator
        buttons={buttons}
        activeButtonIndex={activeButtonIndex}
        onButtonClick={handleButtonClick}
        iconsOnly={false}
      />
    </Card>
  );
};

export default ChartCard;
