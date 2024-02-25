"use client";
import React, { useState } from "react";
import { Card } from "@/components/utils/cards/Card";
import { useQuery } from "react-query";
import { stockPriceSummary } from "@/services/PythonServices";
import DynamicChart from "@/components/utils/charts/DynamicChart";
import PageWrapper from "@/components/PageWrapper";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import MonthlyChangeTable from "@/app/stock/[sector]/[symbol]/chart/MonthlyChangeTable";

const Page = () => {
  const [selectedStock, setSelectedStock] = useState();

  const {
    isError,
    isSuccess,
    isLoading,
    data: priceSummary,
    error,
    refetch,
  } = useQuery(
    ["stockPriceSummary", selectedStock],
    () => stockPriceSummary(selectedStock),
    {
      enabled: !!selectedStock, // Enable the query only when a stock is selected
    }
  );

  const handleStockSelect = (stock) => {
    setSelectedStock(stock?.value);
    refetch();
  };

  return (
    <PageWrapper>
      <Card className={"mb-8"}>
        <StocksSearch
          label={"إختر سهم"}
          className={"w-full"}
          onStockSelect={handleStockSelect}
        />
      </Card>

      {priceSummary && (
        <div className="flex flex-col gap-8">
          <Card header={"التغيرات الشهرية"}>
            <MonthlyChangeTable data={priceSummary["monthly_returns"]} />
          </Card>
          <Card header={"متوسط التغيرات الشهرية"}>
            <DynamicChart
              type={"bar"}
              data={priceSummary["monthly_returns_average"]}
            />
          </Card>
          <Card header={"توزيع عدد الشموع"}>
            <DynamicChart type={"bar"} data={priceSummary["price_change"]} />
          </Card>
        </div>
      )}
    </PageWrapper>
  );
};

export default Page;
