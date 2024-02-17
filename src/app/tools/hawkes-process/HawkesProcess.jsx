"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "@/components/utils/cards/Card";
import { getHawkesProcess } from "@/services/PythonServices";
import { useQuery } from "react-query";
import { Chart, registerables } from "chart.js";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";

Chart.register(...registerables);
const HawkesProcess = ({ symbol }) => {
  const { isLoading, isRefetching, data } = useQuery(["data", symbol], () =>
    getHawkesProcess(symbol)
  );

  return (
    <Card>
      {isLoading || isRefetching ? (
        <>loading</>
      ) : (
        <>
          <StockPriceChart
            symbol={symbol}
            indicators={[
              {
                name: "HawkesProcess",
                fullName: "HawkesProcess",
                pane: 1,
                params: {
                  name: "HawkesProcess",
                  kwargs: {},
                },
                lines: [
                  {
                    name: "q05",
                    type: "line",
                    color: "red",
                    data: data.q05,
                  },
                  {
                    name: "q95",
                    type: "line",
                    color: "yellow",
                    data: data.q95,
                  },
                  {
                    name: "v_hawk",
                    type: "line",
                    color: "blue",
                    data: data.v_hawk,
                  },
                ],
              },
            ]}
          />
        </>
      )}
      {/* <Line data={chartData} options={chartOptions} />{" "} */}
    </Card>
  );
};

// const x = {
//   name: "MACD",
//   fullName: "Moving average convergence divergence",
//   pane: 1,
//   params: {
//     name: "Volume Spread Indicator",
//     kwargs: { fastperiod: 12, signalperiod: 9, slowperiod: 26 },
//   },
//   lines: [
//     {
//       name: "Fast Length",
//       type: "line",
//       color: "red",
//       data: data.q05,
//     },
//     {
//       name: "Slow Length",
//       type: "line",
//       color: "red",
//       data: data.q05,
//     },
//     {
//       name: "Signal Smoothing",
//       type: "histogram",
//       color: "blue",
//       data: data.q05,
//     },
//   ],
// };
export default HawkesProcess;
