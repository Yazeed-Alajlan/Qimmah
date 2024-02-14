"use client";
import React, { useState } from "react";
import ChartPatterns from "./ChartPatterns";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/card";
import StocksSearch from "@/components/utils/inputs/StocksSearch";

const Page = () => {
  const [symbol, setSymbol] = useState();
  return (
    <PageWrapper>
      {console.log(symbol)}
      <Card className={"mb-8"}>
        <StocksSearch
          label={"إختر سهم"}
          className={"w-full"}
          onStockSelect={(data) => setSymbol(data.value)}
        />
      </Card>
      {symbol && <ChartPatterns symbol={symbol} />}
    </PageWrapper>
  );
};

export default Page;
