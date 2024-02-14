"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";
import { useQuery } from "react-query";
import { fetchStockPriceData } from "@/services/FetchServices";
import { flags_pennants } from "@/services/PythonServices";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { Card } from "@/components/utils/cards/card";

const ChartPatterns = ({ symbol }) => {
  const [legend, setLegend] = useState(() => ({
    close: "",
    open: "",
    high: "",
    low: "",
    volume: "",
    changePercent: "",
  }));

  const chartContainerId = `chart-container-${symbol}`;

  const {
    isError,
    isSuccess,
    isLoading,
    data: stockData,
    error,
  } = useQuery(["stockPriceData", symbol], () => fetchStockPriceData(symbol));

  const { data: flagsPennantsData } = useQuery(
    ["flagsPennantsData", symbol],
    () => flags_pennants(symbol)
  );

  console.log(flagsPennantsData);

  return (
    <Card>
      {flagsPennantsData && (
        <StockPriceChart
          symbol={symbol}
          flagsPennantsData={flagsPennantsData}
        />
      )}
    </Card>
  );
};

export default ChartPatterns;
