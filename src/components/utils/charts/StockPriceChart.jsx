import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  fetchStockPriceData,
  fetchStockInformationData,
} from "@/services/FetchServices";
import { createChart } from "lightweight-charts";
import {
  formatCandlestickData,
  formatIndicatorData,
  createTooltip,
  addVolumeHistogram,
  addLegend,
} from "./StockChartServices";
import Indicators from "./Indicators";
import Badge from "../Badge";
import Skeleton from "@/components/Skeleton";
const StockPriceChart = ({
  symbol,
  flagsPennantsData,
  markers,
  indicators,
}) => {
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockPriceData,
    error,
  } = useQuery(["stockPriceData", symbol], () => fetchStockPriceData(symbol));
  const { data: stockInformationData } = useQuery(
    ["stockInformationData", symbol],
    () => fetchStockInformationData(symbol)
  );

  const [legend, setLegend] = useState(() => ({
    close: "",
    open: "",
    high: "",
    low: "",
    volume: "",
    changePercent: "",
  }));
  const [indicatorList, setIndicatorList] = useState(indicators);

  const chartContainerRef = useRef(null);
  const chartContainerId = `chart-container-${symbol}`;

  useEffect(() => {
    if (isSuccess && stockPriceData) {
      const formattedData = formatCandlestickData(stockPriceData.quotes);

      setLegend({
        close: formattedData[formattedData.length - 1].close,
        open: formattedData[formattedData.length - 1].open,
        high: formattedData[formattedData.length - 1].high,
        low: formattedData[formattedData.length - 1].low,
        volume: formattedData[formattedData.length - 1].volume,
        changePercent: "",
      });
      const chart = createChart(chartContainerRef.current, {
        height: 400,
        width: 1000,
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
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      candlestickSeries.setData(formattedData);
      new ResizeObserver((entries) => {
        if (
          entries.length === 0 ||
          entries[0].target !== chartContainerRef.current
        ) {
          return;
        }
        const newRect = entries[0].contentRect;

        chart.applyOptions({ height: newRect.height, width: newRect.width });
        // chart.applyOptions({ height: 500, width: newRect.width });
      }).observe(chartContainerRef.current);

      createTooltip(chartContainerId, chart, candlestickSeries);
      const volumeSeries = addVolumeHistogram(chart, stockPriceData.quotes);
      addLegend(
        chart,
        setLegend,
        candlestickSeries,
        volumeSeries,
        formattedData[formattedData.length - 1]
      );

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

      if (indicatorList) {
        indicatorList.forEach((indicator) => {
          indicator.lines.forEach((line) => {
            if (line.type === "histogram") {
              chart
                .addHistogramSeries({
                  priceLineVisible: false,
                  title: line.name,
                  pane: indicator.pane,
                  color: line.color,
                })
                .setData(formatIndicatorData(line.data));
            } else if (line.type === "line") {
              chart
                .addLineSeries({
                  priceLineVisible: false,
                  title: line.name,
                  pane: indicator.pane,
                  color: line.color,
                })
                .setData(formatIndicatorData(line.data));
            }
          });
        });
      }

      return () => {
        chart.remove();
      };
    }
  }, [isSuccess, indicators, stockPriceData, indicatorList]);

  return (
    <div className="h-full relative">
      {!isLoading && (
        <>
          {indicatorList && (
            <Indicators
              symbol={symbol}
              indicators={indicatorList}
              setIndicators={setIndicatorList}
            />
          )}
          <div className={`flex flex-col absolute top-0 right-2  z-10 `}>
            <div className="flex gap-10">
              {/* <div>
                <span>{stockInformationData?.tradingNameAr}</span>
              </div> */}
              <Badge
                variant={"transparent"}
                text={
                  stockInformationData?.tradingNameAr +
                  "   " +
                  stockInformationData?.symbol
                }
                size={"sm"}
              />
              <div
                className={`flex flex-row-reverse justify-center text-sm  gap-4 text-${
                  legend.open > legend.close ? "danger" : "success"
                }`}
              >
                <span>O {legend.open}</span>
                <span>H {legend.high}</span>
                <span>L {legend.low}</span>
                <span>C {legend.close}</span>
                <span>
                  {legend.changePercent === "NaN" ? "" : legend.changePercent}%
                </span>
                <span>Vol {legend.volume}</span>
              </div>
            </div>
          </div>
          <div
            className="relative"
            id={chartContainerId}
            ref={chartContainerRef}
          ></div>
        </>
      )}

      {isLoading && <Skeleton />}
      {isError && <p>Error: {error.message}</p>}
    </div>
  );
};

export default StockPriceChart;
