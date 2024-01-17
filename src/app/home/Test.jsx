// Test.jsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/utils/buttons/Button";
import Dropdown from "@/components/utils/inputs/Dropdown";
import { FaHeart } from "react-icons/fa";
// import ChartCard from "@/components/utils/cards/ChartCard";
import Drawer from "@/components/utils/drawer/Drawer";

const Test = () => {
  const options = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Settings", value: "settings" },
    { label: "Earnings", value: "earnings" },
    { label: "Sign out", value: "sign-out" },
  ];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    console.log("Drawer state:", isDrawerOpen); // Log the state for debugging
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="bg-green-600 text-white rounded px-4 py-1"
        onClick={() => setIsDrawerOpen(true)}
      >
        open
      </button>
      {/* <ChartCard /> */}
      <Drawer
        open={isDrawerOpen}
        setOpen={() => setIsDrawerOpen(!isDrawerOpen)}
        side="top"
      >
        {/* Content inside the drawer goes here */}
        <form>{/* ... */}asdasdsad</form>
      </Drawer>
      {/* <Dropdown
        options={options}
        header="Select an option"
        icon={<FaHeart />}
      /> */}
    </main>
  );
};

export default Test;
