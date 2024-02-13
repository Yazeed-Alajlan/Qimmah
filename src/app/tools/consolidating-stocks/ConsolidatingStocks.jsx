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
    refetch,
  } = useQuery(
    ["consolidatingData"],
    () => consolidatingStocksFilter(numberOfCandles, percentageRange),
    { enabled: false }
  );

  const handleSearchClick = () => {
    // Trigger refetch only when the submit button is clicked
    refetch();
  };

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
          <Button text={"ابحث"} onClick={handleSearchClick} />
        </>
      </>
      <div className="flex justify-center items-center flex-col gap-8 w-full">
        {consolidatingData &&
          Object.keys(consolidatingData).map((symbol, index) => (
            <Card className="flex flex-col border-3 border-bottom" key={index}>
              <p>الرمز:{symbol}</p>
              <StockPriceChart symbol={symbol} />
            </Card>
          ))}
      </div>
    </>
  );
};

export default ConsolidatingStocks;
