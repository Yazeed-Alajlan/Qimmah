"use client";
import PageWrapper from "@/components/PageWrapper";
import React, { useState } from "react";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import { Card } from "@/components/utils/cards/Card";
import HawkesProcess from "./HawkesProcess";

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
      {symbol && <HawkesProcess symbol={symbol} />}
    </PageWrapper>
  );
};

export default Page;
