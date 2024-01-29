"use client";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/Card";
import InputSelect from "@/components/utils/inputs/InputSelect";
import { useStocksData } from "@/context/StocksDataContext";
import React, { useEffect, useState } from "react";
import ComparisonChart from "./components/ComparisonChart";
import { QueryClient, useQuery } from "react-query";
import { fetchStockFinancialData } from "@/services/FetchServices";
const page = () => {
  const { getStockFinancialData, stocksData } = useStocksData();
  const [selectedStocks, setSelectedStocks] = useState([]);
  const maxSelectedOptions = 4;
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockFinancialData,
    error,
  } = useQuery(
    ["stockFinancialData", selectedStocks],
    () =>
      Promise.all(
        selectedStocks.map((option) => getStockFinancialData(option.value))
      ),
    {
      enabled: selectedStocks.length > 0,
    }
  );

  return (
    <PageWrapper>
      <Card>
        <InputSelect
          label={"اختر شركتين للمقارنة من نفس القطاع"}
          labelDirection={"vr"}
          isMulti
          options={stocksData
            ?.filter((stock) => {
              if (
                selectedStocks.length === 0 ||
                selectedStocks.every(
                  (selectedOption) =>
                    selectedOption.sector === stock.sectorNameEn
                )
              ) {
                return true;
              }
              return false;
            })
            .map((stock) => ({
              value: stock.symbol,
              label: `${stock.tradingNameAr} (${stock.symbol})`,
              sector: stock.sectorNameEn,
            }))}
          maxMenuHeight={200}
          value={selectedStocks}
          onChange={(selected) => {
            console.log(selectedStocks);
            if (selected.length <= maxSelectedOptions) {
              setSelectedStocks(selected);
            }
          }}
        />
        {stockFinancialData && (
          <>
            <ComparisonChart stockFinancialData={stockFinancialData} />
            {/* <br />
            <br />
            <ComparisonTable /> */}
          </>
        )}
      </Card>
    </PageWrapper>
  );
};

export default page;
