"use client";
import candlestick_patterns from "@/app/chart/utils/candlestickPatterns";
import Button from "@/components/utils/buttons/Button";
import { Card } from "@/components/utils/cards/card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import InputSelect from "@/components/utils/inputs/InputSelect";
import { japaneseCandlestickFilter } from "@/services/PythonServices";
import React, { useState } from "react";
import { useQuery } from "react-query";

const JapaneseCandlestick = () => {
  const candlestickOptions = Object.entries(candlestick_patterns).map(
    ([key, value]) => ({
      value: key,
      label: value,
    })
  );
  const [selectedPattern, setSelectedPattern] = useState();
  const [selectedFilter, setSelectedFilter] = useState();

  const {
    isError,
    isSuccess,
    isLoading,
    data: filteredData,
    error,
    refetch,
  } = useQuery(
    ["filteredData", selectedPattern],
    () => japaneseCandlestickFilter(selectedPattern.value),
    {
      enabled: false,
    }
  );

  const handleSelectedPattern = () => {
    refetch();
  };

  const handleChange = (selectedOption) => {
    setSelectedPattern(selectedOption);
  };
  const handleFilterData = (selectedOption) => {
    setSelectedFilter(selectedOption);
  };

  return (
    <>
      <Card className={"mb-8"}>
        <div className="flex items-center gap-8">
          <InputSelect
            label={"النمط:"}
            options={candlestickOptions}
            value={selectedPattern}
            onChange={handleChange}
            placeholder="حدد النمط"
            labelDirection="hr"
          />
          <InputSelect
            label="النوع:"
            options={[
              { value: "bullish", label: "bullish" },
              { value: "bearish", label: "bearish" },
            ]}
            value={selectedFilter}
            onChange={handleFilterData}
            placeholder="إيجابي أو سلبي"
            isDisabled={filteredData === undefined}
            labelDirection="hr"
          />
          <Button text={"ابحث"} onClick={handleSelectedPattern} />
        </div>
      </Card>
      {filteredData && (
        <div className="flex flex-col gap-8">
          {Object.entries(filteredData).map(([symbol, type]) => (
            <Card key={symbol}>
              Symbol: {symbol}, Type: {type}
              <StockPriceChart symbol={symbol} />
            </Card>
          ))}
          {console.log(filteredData)}
        </div>
      )}
    </>
  );
};

export default JapaneseCandlestick;
