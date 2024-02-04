"use client";
import React from "react";

import { Card } from "@/components/utils/cards/Card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { stockPriceSummary } from "@/services/PythonServices";
import MonthlyReturnTable from "./MonthlyReturnTable";
import DynamicChart from "@/components/utils/charts/DynamicChart";

const Page = () => {
  const { symbol } = useParams();
  const {
    isError,
    isSuccess,
    isLoading,
    data: priceSummary,
    error,
  } = useQuery(["stockPriceSummary", symbol], () => stockPriceSummary(symbol));
  return (
    <div className="flex flex-row flex-wrap gap-4 mb-10">
      <Card header={"تحركات السهم"}>
        <StockPriceChart symbol={symbol} />
      </Card>

      {priceSummary && (
        <>
          {console.log(priceSummary["monthly_returns_average"])}
          <Card header={"العوائد الشهرية"}>
            <MonthlyReturnTable data={priceSummary["monthly_returns"]} />
          </Card>
          <Card header={"متوسط العوائد الشهرية"}>
            <DynamicChart
              type={"bar"}
              data={priceSummary["monthly_returns_average"]}
            />
          </Card>
          <Card header={"توزيع عدد الشموع"}>
            <DynamicChart type={"bar"} data={priceSummary["price_change"]} />
          </Card>
        </>
      )}
    </div>
  );
};

export default Page;
