// Test.jsx
"use client";
import React, { useState } from "react";
import Chart from "@/components/charts/Chart";
import { Button } from "@/components/utils/buttons/Button";
import Dropdown from "@/components/utils/inputs/Dropdown";
import { FaHeart, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import ChartCard from "@/components/utils/cards/ChartCard";

const Test = () => {
  const options = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Settings", value: "settings" },
    { label: "Earnings", value: "earnings" },
    { label: "Sign out", value: "sign-out" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChartCard />

      <Dropdown
        options={options}
        header="Select an option"
        icon={<FaHeart />}
      />
    </main>
  );
};

export default Test;
