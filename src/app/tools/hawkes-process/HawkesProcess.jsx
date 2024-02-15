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
                name: "q05",
                pane: 1,
                params: {
                  name: "Volume Spread Indicator",
                  kwargs: {},
                },
                color: "fff",
                lines: [{ q05: data.q05 }],
              },
              {
                name: "q95",
                pane: 1,
                params: {
                  name: "Volume Spread Indicator",
                  kwargs: {},
                },
                color: "fff",
                lines: [{ q95: data.q95 }],
              },
              {
                name: "v_hawk",
                pane: 1,
                params: {
                  name: "Volume Spread Indicator",
                  kwargs: {},
                },
                color: "fff",
                lines: [{ v_hawk: data.v_hawk }],
              },
            ]}
          />
        </>
      )}
      {/* <Line data={chartData} options={chartOptions} />{" "} */}
    </Card>
  );
};

export default HawkesProcess;
