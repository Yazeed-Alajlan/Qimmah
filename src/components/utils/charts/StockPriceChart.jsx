import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { fetchStockPriceData } from "@/services/FetchServices";
import { createChart } from "lightweight-charts";
import { Card } from "../cards/Card";
import { formatCandlestickData, createTooltip } from "./StockChartServices";
const StockPriceChart = ({ symbol }) => {
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockPriceData,
    error,
  } = useQuery(["stockPriceData", symbol], () => fetchStockPriceData(symbol));

  // Use ref to hold a reference to the chart container
  const chartContainerRef = useRef(null);
  const chartContainerId = `chart-container-${symbol}`;

  useEffect(() => {
    if (isSuccess && stockPriceData) {
      const formattedData = formatCandlestickData(stockPriceData.quotes);

      // Create a new candlestick chart
      const chart = createChart(chartContainerRef.current, {
        width: 800,
        height: 400,
      });

      // Add a candlestick series to the chart
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(formattedData);
      createTooltip(chartContainerId, chart, candlestickSeries);

      return () => {
        chart.remove();
      };
    }
  }, [isSuccess, stockPriceData]);

  return (
    <>
      <div
        className="relative"
        id={chartContainerId}
        ref={chartContainerRef}
      ></div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
    </>
  );
};

export default StockPriceChart;
