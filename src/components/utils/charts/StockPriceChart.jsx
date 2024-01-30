import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { fetchStockPriceData } from "@/services/FetchServices";
import { createChart } from "lightweight-charts";
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
      const chart = createChart(chartContainerRef.current);

      // Add a candlestick series to the chart
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(formattedData);
      // Make Chart Responsive with screen resize
      // Make Chart Responsive with screen resize
      new ResizeObserver((entries) => {
        if (
          entries.length === 0 ||
          entries[0].target !== chartContainerRef.current
        ) {
          return;
        }
        const newRect = entries[0].contentRect;
        console.log(newRect);

        chart.applyOptions({ height: 400, width: newRect.width });
      }).observe(chartContainerRef.current);
      createTooltip(chartContainerId, chart, candlestickSeries);

      return () => {
        chart.remove();
      };
    }
  }, [isSuccess, stockPriceData]);

  return (
    <div className="h-96">
      <div
        className="relative"
        id={chartContainerId}
        ref={chartContainerRef}
      ></div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
    </div>
  );
};

export default StockPriceChart;
