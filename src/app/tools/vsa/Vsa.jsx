"use client";
import React from "react";
import { Card } from "@/components/utils/cards/Card";
// import CandlestickAndIndicatorsChart from "@/app/chart/components/CandlestickAndIndicatorsChart";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import { useQuery } from "react-query";
import { getIndicatorData } from "@/services/PythonServices";

const Vsa = ({ symbol }) => {
  const { isLoading, isRefetching, data } = useQuery(
    ["data", symbol],
    () =>
      getIndicatorData(symbol, "MACD", {
        MACD: {
          name: "Moving Average Convergence Divergence",
          kwargs: {
            fastperiod: 12,
            slowperiod: 26,
            signalperiod: 9,
          },
        },
      })

    // VSA: {
    //   name: "Volume Spread Indicator",
    //   kwargs: {},
    // },
  );

  console.log(data);
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
                  type: "line",
                  color: "red",
                  data: data.fastperiod,
                },
                {
                  name: "slowperiod",
                  type: "line",
                  color: "red",
                  data: data.slowperiod,
                },
                {
                  name: "signalperiod",
                  type: "line",
                  color: "red",
                  data: data.signalperiod,
                  type: "histogram",
                },
              ],
            },
            // {
            //   name: "VSA2",
            //   fullName: "Volume Spread Indicator",
            //   pane: 2,
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

// [
//     {
//         "name": "RSI",
//         "pane": 1,
//         "params": {
//             "name": "Relative Strength Index",
//             "kwargs": {
//                 "timeperiod": 14
//             }
//         },
//         "color": "fff",
//         "lines": [
//             {
//                 "timeperiod": {
//                     "2022-01-20": 64.92537313432835,

//                 }
//             }
//         ]
//     },
//     {
//         "name": "SMA",
//         "pane": 0,
//         "params": {
//             "name": "Simple Moving Average",
//             "kwargs": {
//                 "timeperiod": 2
//             }
//         },
//         "color": "fff",
//         "lines": [
//             {
//                 "timeperiod": {
//                     "2022-01-03": 132.9,

//                 }
//             }
//         ]
//     },
//     {
//         "name": "MACD",
//         "pane": 1,
//         "params": {
//             "name": "Moving Average Convergence Divergence",
//             "kwargs": {
//                 "fastperiod": 12,
//                 "slowperiod": 26,
//                 "signalperiod": 9
//             }
//         },
//         "color": "fff",
//         "lines": [
//             {
//                 "fastperiod": {
//                     "2022-02-16": -0.015057943566489485,

//                 },
//                 "signalperiod": {
//                     "2022-02-16": -0.6912715096468705,

//                 },
//                 "slowperiod": {
//                     "2022-02-16": 0.676213566080381,

//                 }
//             }
//         ]
//     }
// ]
