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
      VSA: {
        name: "Volume Spread Indicator",
        kwargs: {},
      },
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
              name: "VSA",
              fullName: "Volume Spread Indicator",
              pane: 1,
              params: {
                name: "Volume Spread Indicator",
                kwargs: {},
              },
              lines: [
                {
                  name: "vsa",
                  type: "line",
                  color: "red",
                  data: data,
                },
              ],
            },
          ]}
        />
      )}
    </Card>
  );
};

export default Vsa;
