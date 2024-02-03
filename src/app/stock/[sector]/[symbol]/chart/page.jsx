"use client";
import React from "react";

import { Card } from "@/components/utils/cards/Card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { stockPriceSummary } from "@/services/PythonServices";
import MonthlyReturnTable from "./MonthlyReturnTable";

const Page = () => {
  const { symbol } = useParams();
  const {
    isError,
    isSuccess,
    isLoading,
    data: priceSummary,
    error,
  } = useQuery(["stockPriceSummary", symbol], () => stockPriceSummary(symbol));
  console.log(priceSummary);
  return (
    <div className="flex flex-row flex-wrap gap-4 mb-10">
      <Card header={"تحركات السهم"}>
        <StockPriceChart symbol={symbol} />
      </Card>
      <Card>
        {priceSummary && (
          <>
            <MonthlyReturnTable data={priceSummary["monthly_returns"]} />
          </>
        )}
        {/* <MonthlyReturnTable data={priceSummary["monthly_returns"]} /> */}
      </Card>
    </div>
  );
};

export default Page;
