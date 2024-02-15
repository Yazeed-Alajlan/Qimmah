"use client";
import React, { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/card";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import JapaneseCandlestickMarkers from "./JapaneseCandlestickMarkers";

const Page = () => {
  const [symbol, setSymbol] = useState();
  return (
    <PageWrapper>
      <Card className={"mb-8"}>
        <StocksSearch
          label={"إختر سهم"}
          className={"w-full"}
          onStockSelect={(data) => setSymbol(data?.value)}
        />
      </Card>
      {symbol && <JapaneseCandlestickMarkers symbol={symbol} />}
    </PageWrapper>
  );
};

export default Page;
