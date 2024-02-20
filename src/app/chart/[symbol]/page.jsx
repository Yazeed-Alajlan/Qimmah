"use client";
import { useParams } from "next/navigation";
import React from "react";
import AdvancedChart from "../components/AdvancedChart";

const Page = () => {
  const { symbol } = useParams();

  return (
    <>
      <AdvancedChart symbol={symbol} />
    </>
  );
};

export default Page;
