"use client";
import { Card } from "@/components/utils/cards/Card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { japaneseCandlestickMarkers } from "@/services/PythonServices";
import React from "react";
import { useQuery } from "react-query";

const JapaneseCandlestickMarkers = ({ symbol }) => {
  const {
    isLoading,
    isRefetching,
    data: markers,
  } = useQuery(["markers", symbol], () => japaneseCandlestickMarkers(symbol));
  return (
    <Card>
      {isLoading || isRefetching ? (
        <>loading</>
      ) : (
        <StockPriceChart symbol={symbol} markers={markers} />
      )}
    </Card>
  );
};

export default JapaneseCandlestickMarkers;
