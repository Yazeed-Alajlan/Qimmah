"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";
import { useQuery } from "react-query";
import { fetchStockPriceData } from "@/services/FetchServices";
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
