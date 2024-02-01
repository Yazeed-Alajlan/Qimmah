"use client";
import ButtonGroup from "@/components/utils/buttons/ButtonGroupNew";
import Button from "@/components/utils/buttons/CustomButtonOLD";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import { useState } from "react";
import { TbChartBar, TbChartLine, TbTable } from "react-icons/tb";

export default function Home() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const [text, setText] = useState();
  const [index, setIndex] = useState(false);

  const buttons = [
    { icon: <TbChartBar />, label: "Button 1xxxx", value: "value1" },
    { icon: <TbChartBar />, label: "Button 2xxxx", value: "value2" },
    // Add more buttons as needed
  ];
  const handleButtonClick = ({ index, value, label }) => {
    // Handle button click logic, e.g., update state
    setActiveButtonIndex(index);
    console.log(`Button clicked: ${label}, Value: ${value}`);
  };
  return (
    <main className="my-100">
      <div className=" h-screen">
        {text}
        <ButtonGroup
          buttons={buttons}
          activeButtonIndex={activeButtonIndex}
          onButtonClick={handleButtonClick}
        />
        <Button
          variant="primary"
          type="tag"
          onClick={() => {
            setIndex(!index);
            setText(index === true ? "True" : "False");
          }}
          className={` ${index === true ? "bg-red-800" : ""}`}
        >
          Primary Button
        </Button>
        <Button variant="danger" type="tag" className="">
          Primary Button
        </Button>
      </div>
    </main>
  );
}
