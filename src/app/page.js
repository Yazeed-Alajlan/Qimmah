"use client";
import ButtonGroup from "@/components/utils/buttons/ButtonGroupNew";
import Button from "@/components/utils/buttons/CustomButtonOLD";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import { useState } from "react";
import { TbChartBar, TbChartLine, TbTable } from "react-icons/tb";

export default function Home() {
  const tabs = [
    {
      name: "tab1",
      label: "Tab 1",
      icon: TbChartBar,
      onClick: () => {
        console.log("HEEEEEEEEEEEEElo");
      },
      render: () => {
        return (
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
        );
      },
    },
    {
      name: "tab2",
      label: "Tab 2",
      icon: TbChartBar,
      render: () => {
        return (
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit...</p>
        );
      },
    },
    {
      name: "tab3",
      label: "Tab 3",
      icon: TbChartBar,
      render: () => {
        return (
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit...</p>
        );
      },
    },
  ];

  return (
    <main className="my-100">
      <div className=" h-screen">
        <ButtonGroup tabs={tabs} />
      </div>
    </main>
  );
}
