import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { fetchStockPriceData } from "@/services/FetchServices";
import { createChart } from "lightweight-charts";
import {
  formatCandlestickData,
  formatIndicatorkData,
  createTooltip,
  addVolumeHistogram,
  addLegend,
} from "./StockChartServices";
const StockPriceChart = ({
  symbol,
  flagsPennantsData,
  markers,
  indicators,
}) => {
  const [legend, setLegend] = useState(() => ({
    close: "",
    open: "",
    high: "",
    low: "",
    volume: "",
    changePercent: "",
  }));
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
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
        rightPriceScale: {
          scaleMargins: {
            top: 0, // Adjust top margin to remove the black line on the y-axis
            bottom: 0,
          },
        },
      });

      // Add a candlestick series to the chart
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(formattedData);

      new ResizeObserver((entries) => {
        if (
          entries.length === 0 ||
          entries[0].target !== chartContainerRef.current
        ) {
          return;
        }
        const newRect = entries[0].contentRect;

        chart.applyOptions({ height: 400, width: newRect.width });
      }).observe(chartContainerRef.current);
      createTooltip(chartContainerId, chart, candlestickSeries);
      const volumeSeries = addVolumeHistogram(chart, stockPriceData.quotes);
      addLegend(chart, setLegend, candlestickSeries, volumeSeries);

      if (flagsPennantsData) {
        var tldata = [];
        Object.keys(flagsPennantsData).map((pattern) => {
          if (pattern == []) return;
          Object.entries(flagsPennantsData[pattern]).map((item) => {
            item[1].map((draw) => {
              tldata.push({
                time: new Date(draw[0]).toISOString().split("T")[0],
                value: draw[1],
                color: pattern.includes("bull") ? "green" : "red",
              });
            });
          });

          tldata.forEach((point, index) => {
            if (index % 2 !== 0 || index === tldata.length - 1) return;

            const lineSeries = chart.addLineSeries({
              lastValueVisible: false,
              priceLineVisible: false,
              color: point.color,
            });
            lineSeries.setData([
              { time: point.time, value: point.value },
              { time: tldata[index + 1].time, value: tldata[index + 1].value },
            ]);
          });
        });
      }

      if (markers) {
        const markers_list = [];
        Object.keys(markers).forEach((pattern) => {
          markers[pattern].forEach((timestampPattern) => {
            const [timestamp, patternName] = timestampPattern;
            const formattedDate = new Date(timestamp)
              .toISOString()
              .split("T")[0];

            markers_list.push({
              time: formattedDate,
              position: "aboveBar",
              color: "#f68410", // Change the color as needed
              shape: "circle", // Change the shape if required
              text: patternName || pattern, // Use the pattern name or default to the key
            });
          });
        });
        const sortedList = markers_list.sort((a, b) => {
          const dateA = new Date(a.time);
          const dateB = new Date(b.time);
          return dateA - dateB;
        });

        candlestickSeries.setMarkers(markers_list);
      }

      if (indicators) {
        console.log(indicators);
        indicators.forEach((indicator, index) => {
          console.log(indicator);
          indicator.lines.map((data) => {
            Object.entries(data).map((line) => {
              if (line[0] == "signalperiod") {
                chart
                  .addHistogramSeries({
                    title: line[0],
                    pane: indicator.pane,
                    color: data.color,
                  })
                  .setData(formatIndicatorkData(Object.values(line)[1]));
              } else {
                chart
                  .addLineSeries({
                    title: line[0],
                    pane: indicator.pane,
                    color: data.color,
                  })
                  .setData(formatIndicatorkData(Object.values(line)[1]));
              }
            });
            console.log(data);
          });
        });
      }

      return () => {
        chart.remove();
      };
    }
  }, [isSuccess, stockPriceData]);

  return (
    <div className="h-full">
      <div
        className={`flex justify-center text-sm  gap-4 text-${
          legend.open > legend.close ? "danger" : "success"
        }`}
      >
        <span className="flex ">
          التغيير (%):
          {legend.changePercent === "NaN" ? "" : legend.changePercent}
        </span>
        <span className="flex ">L:{legend.low}</span>
        <span className="flex ">H: {legend.high}</span>
        <span className="flex ">O: {legend.open}</span>
        <span className="flex ">C: {legend.close}</span>
        <span className="flex ">Vol: {legend.volume}</span>
      </div>
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
