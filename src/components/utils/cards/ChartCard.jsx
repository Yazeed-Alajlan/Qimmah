"use client";

import React, { useState } from "react";
import { Card } from "./Card";
import Chart from "@/components/charts/Chart";
import { Button } from "../buttons/Button";
import { FaHeart } from "react-icons/fa";
import { ButtonGroupSlidingIndicator } from "../buttons/ButtonGroupSlidingIndicator";

const ChartCard = () => {
  const [chartType, setChartType] = useState("bar");
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const handleButtonClick = ({ index, value, label }) => {
    setChartType(value);
    setActiveButtonIndex(index);
    // Additional logic if needed
  };
  const buttons = [
    { label: "Bar", value: "bar", icon: <FaHeart /> },
    { label: "Line", value: "line", icon: <FaHeart /> },
    { label: "Scatter", value: "scatter", icon: <FaHeart /> },
    // Add more buttons as needed
  ];

  const data = {
    series: [
      {
        name: "Income",
        color: "#31C48D",
        data: ["1420", "1620", "1820", "1420", "1650", "2120"],
      },
      {
        name: "Expense",
        data: ["788", "810", "866", "788", "1100", "1200"],
        color: "#F05252",
      },
    ],
    categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  };

  return (
    <Card>
      <Chart key={chartType} data={data} chartType={chartType} width={600} />
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
