"use client";
import ButtonGroup from "@/components/utils/buttons/ButtonGroup";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import { useState } from "react";

export default function Home() {
  const [text, settext] = useState();
  const buttons = [
    {
      text: "Option 1",
      icon: "🔍",
    },
    {
      text: "Option 2",
      icon: "🔄",
    },
    // Add more buttons as needed
  ];
  return (
    <main className="my-100">
      <div className=" h-screen">
        <div>
          <h2>Checkbox Button Group</h2>
          <ButtonGroup buttons={buttons} type="checkbox" />

          <h2>Radio Button Group</h2>
          <ButtonGroup buttons={buttons} type="radio" />
        </div>{" "}
        {text}
        <StocksSearch />
      </div>
    </main>
  );
}
