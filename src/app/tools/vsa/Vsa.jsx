"use client";
import React from "react";
import { Card } from "@/components/utils/cards/Card";
// import CandlestickAndIndicatorsChart from "@/app/chart/components/CandlestickAndIndicatorsChart";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { useQuery } from "react-query";
import { getIndicatorData } from "@/services/PythonServices";

const Vsa = ({ symbol }) => {
  const { isLoading, isRefetching, data } = useQuery(["data", symbol], () =>
    getIndicatorData(symbol, "MACD", {
      MACD: {
        name: "Moving Average Convergence Divergence",
        kwargs: {
          fastperiod: 12,
          slowperiod: 26,
          signalperiod: 9,
        },
      },

      // VSA: {
      //   name: "Volume Spread Indicator",
      //   kwargs: {},
      // },
    })
  );

  return (
    <Card>
      {isLoading || isRefetching ? (
        <>loading</>
      ) : (
        <StockPriceChart
          symbol={symbol}
          indicators={[
            {
              name: "MACD",
              fullName: "Moving average Convergence Divergence",
              pane: 1,
              params: {
                name: "Moving average Convergence Divergence",
                kwargs: {
                  fastperiod: 12,
                  slowperiod: 26,
                  signalperiod: 9,
                },
              },
              lines: [
                {
                  name: "fastperiod",
                  arg: 12,
                  type: "line",
                  color: "red",
                  data: data.fastperiod,
                },
                {
                  name: "slowperiod",
                  arg: 26,
                  type: "line",
                  color: "red",
                  data: data.slowperiod,
                },
                {
                  name: "signalperiod",
                  arg: 9,
                  type: "line",
                  color: "red",
                  data: data.signalperiod,
                  type: "histogram",
                },
              ],
            },
            // {
            //   name: "VSA",
            //   fullName: "Volume Spread Indicator",
            //   pane: 1,
            //   params: {
            //     name: "Volume Spread Indicator",
            //     kwargs: {},
            //   },
            //   lines: [
            //     {
            //       name: "vsa",
            //       type: "line",
            //       color: "red",
            //       data: data,
            //     },
            //   ],
            // },
          ]}
        />
      )}
    </Card>
  );
};

export default Vsa;
