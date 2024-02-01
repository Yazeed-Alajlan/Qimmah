"use client";
import ButtonGroup from "@/components/utils/buttons/ButtonGroup";
import Button from "@/components/utils/buttons/CustomButtonOLD";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("HEL");
  const [index, setIndex] = useState(false);
  const buttons = [
    {
      text: "Option 1",
      icon: "🔍",
      onClick: () => {
        setText("CEHCK BOX OPT1");
      },
    },
    {
      text: "Option 2",
      icon: "🔄",
      onClick: () => {
        setText("CEHCK BOX OPT2");
      },
    },
    // Add more buttons as needed
  ];
  const buttons2 = [
    {
      text: "Option 1 RAD",
      icon: "🔍",
      onClick: () => {
        setText("RAD OP!");
      },
    },
    {
      text: "Option 2 RAD",
      icon: "🔄",
      onClick: () => {
        setText("RAD OP2");
      },
    },
    // Add more buttons as needed
  ];
  return (
    <main className="my-100">
      <div className=" h-screen">
        <div>
          <h2>Checkbox Button Group</h2>
          <ButtonGroup buttons={buttons} type="checkbox" setState={setText} />

          <h2>Radio Button Group</h2>
          <ButtonGroup buttons={buttons2} type="radio" />
        </div>
        {text}
        <Button
          variant="primary"
          type="tag"
          onClick={() => {
            setIndex(!index);
            setText(index === false ? "FALSE" : "TRUE");
          }}
          className={` ${index === false ? "bg-red-800" : ""}`}
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
