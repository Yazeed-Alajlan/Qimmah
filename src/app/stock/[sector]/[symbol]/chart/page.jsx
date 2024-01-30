"use client";

import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { symbol } = useParams();

  return (
    <div>
      HELLO
      <StockPriceChart symbol={symbol} />
    </div>
  );
};

export default Page;
