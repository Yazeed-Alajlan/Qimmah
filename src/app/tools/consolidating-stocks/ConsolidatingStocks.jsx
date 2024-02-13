"use client";
import Button from "@/components/utils/buttons/Button";
import { Card } from "@/components/utils/cards/card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import Input from "@/components/utils/inputs/Input";
import { consolidatingStocksFilter } from "@/services/PythonServices";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";

const ConsolidatingStocks = () => {
  const [numberOfCandles, setNumberOfCandles] = useState(14);
  const [percentageRange, setPercentageRange] = useState(2.5);
  const {
    isError,
    isSuccess,
    isLoading,
    data: consolidatingData,
    error,
  } = useQuery(["consolidatingData"], () =>
    consolidatingStocksFilter(numberOfCandles, percentageRange)
  );

  return (
    <>
      <>
        <>
          <Input
            label={"عدد الشموع:"}
            type={"number"}
            value={numberOfCandles}
            onChange={(event) => {
              setNumberOfCandles(event.target.value);
            }}
            placeholder="حدد عدد الشموع"
          />
        </>
        <>
          <Input
            label={" نسبة النطاق:"}
            type={"number"}
            value={percentageRange}
            onChange={(event) => {
              setPercentageRange(event.target.value);
            }}
            placeholder="حدد نسبة النطاق "
          />
        </>
        <>
          <Button
            text={"ابحث"}
            onClick={consolidatingStocksFilter(
              numberOfCandles,
              percentageRange
            )}
          />
        </>
      </>
      <Card className="d-flex flex-column">
        {consolidatingData &&
          Object.keys(consolidatingData).map((symbol, index) => (
            <Card
              className="d-flex flex-column border-3 border-bottom"
              key={index}
            >
              <p>الرمز:{symbol}</p>
              <StockPriceChart symbol={symbol} />
            </Card>
          ))}
      </Card>
    </>
  );
};

export default ConsolidatingStocks;
