// Test.jsx
"use client";
import React, { useState } from "react";
import Chart from "@/components/charts/chart";
import { Button } from "@/components/utils/buttons/Button";

const Test = () => {
  const [chartType, setChartType] = useState("line");

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Chart data={data} chartType={chartType} />
      <div className="mt-4">
        <Button onClick={() => setChartType("bar")}>Bar Chart</Button>
        <Button onClick={() => setChartType("line")}>Line Chart</Button>
      </div>
    </main>
  );
};

export default Test;
