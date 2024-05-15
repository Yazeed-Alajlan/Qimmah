"use client";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/Card";
import InputSelect from "@/components/utils/inputs/InputSelect";
import { useStocksData } from "@/context/StocksDataContext";
import React, { useState } from "react";
import ComparisonChart from "./components/ComparisonChart";
import { useQuery } from "react-query";
import { getStockFinancials } from "@/services/StockFinancialsServices";

const Page = () => {
  const { stocksData } = useStocksData();
  const [selectedStocks, setSelectedStocks] = useState([]);
  const maxSelectedOptions = 4;
  const {
    isError,
    isSuccess,
    isLoading,
    data: stocksFinancialData,
    error,
  } = useQuery(
    ["stockFinancialData", selectedStocks],
    () =>
      Promise.all(
        selectedStocks.map((option) => getStockFinancials(option.value))
      ),
    {
      enabled: selectedStocks.length > 0,
    }
  );

  return (
    <PageWrapper className={"gap-16"}>
      <Card header={"قارن البيانات المالية"}>
        <InputSelect
          label={"اختر شركتين للمقارنة من نفس القطاع"}
          labelDirection={"hr"}
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
            if (selected.length <= maxSelectedOptions) {
              setSelectedStocks(selected);
            }
          }}
        />
        {stocksFinancialData && (
          <>
            <ComparisonChart stockFinancialData={stocksFinancialData} />
            {/* <br />
            <br />
            <ComparisonTable /> */}
          </>
        )}
      </Card>
    </PageWrapper>
  );
};

export default Page;
