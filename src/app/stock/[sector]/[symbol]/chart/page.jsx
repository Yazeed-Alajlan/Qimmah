"use client";

import { Card } from "@/components/utils/cards/Card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { symbol } = useParams();

  return (
    <Card header={"تحركات السهم"}>
      <StockPriceChart symbol={symbol} />
    </Card>
  );
};

export default Page;
