"use client";
import ButtonGroup from "@/components/utils/buttons/ButtonGroup";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import { useState } from "react";
import { TbChartBar } from "react-icons/tb";

export default function Home() {
  const [text, setText] = useState();
  const buttons = [
    {
      name: "tab1",
      label: "Tab 1",
      icon: TbChartBar,
      onClick: () => {
        setText("BTN1");
      },
    },
    {
      name: "tab2",
      label: "Tab 2",
      icon: TbChartBar,
      onClick: () => {
        setText("BTN2");
      },
    },
    {
      name: "tab3",
      label: "Tab 3",
      icon: TbChartBar,
      onClick: () => {
        setText("BTN3");
      },
    },
  ];

  return (
    <main className="my-100">
      <div className=" h-screen">
        <ButtonGroup buttons={buttons} />
        {text}
      </div>
    </main>
  );
}
