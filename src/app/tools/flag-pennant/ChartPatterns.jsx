"use client";
import React from "react";
import { useQuery } from "react-query";
import { flags_pennants } from "@/services/PythonServices";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { Card } from "@/components/utils/cards/Card";

const ChartPatterns = ({ symbol }) => {
  const {
    isLoading,
    isRefetching,
    data: flagsPennantsData,
  } = useQuery(["flagsPennantsData", symbol], () => flags_pennants(symbol));
  return (
    <Card>
      {isLoading || isRefetching ? (
        <>loading</>
      ) : (
        <StockPriceChart
          symbol={symbol}
          flagsPennantsData={flagsPennantsData}
        />
      )}
    </Card>
  );
};

export default ChartPatterns;
