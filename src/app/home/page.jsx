"use client";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/Card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import FinancialMetricsTable from "@/components/utils/table/FinancialMetricsTable";
import { useStocksData } from "@/context/StocksDataContext";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getAllBasicEarningsPerShareTTM,
  getFinancialMetric,
  prepareFinancialMetricsComparisonTableData,
} from "@/services/FinancialServices";
import FinancialMetricsComparisonTable from "../comparison/components/FinancialMetricsComparisonTable";
import InputSelect from "@/components/utils/inputs/InputSelect";

const Page = () => {
  const {
    isError,
    isSuccess,
    isLoading,
    data: earningsData,
    error,
  } = useQuery(["earningsData"], () => getAllBasicEarningsPerShareTTM());

  const { data: comparisonTableData } = useQuery(["comparisonTableData"], () =>
    prepareFinancialMetricsComparisonTableData()
  );
  // const { data: leverage } = useQuery(["leverageData"], () =>
  //   getFinancialMetric("Leverage")
  // );

  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { value: "Leverage", label: "Leverage" },
    { value: "DebtToEquityRatio", label: "DebtToEquityRatio" },
    { value: "NetProfitMargin", label: "NetProfitMargin" },
    // Add more options as needed
  ];
  const handleSelectChange = async (selected) => {
    setSelectedOptions(selected);
    console.log(selectedOptions);
    const newData = [];

    for (const option of selected) {
      try {
        const response = await getFinancialMetric(option.value);
        newData.push({ [option.value]: response });
      } catch (error) {
        console.error(`Error fetching data for ${option.value}:`, error);
      }
    }
    console.log(newData);
    console.log(data);
    setData(newData);
  };

  return (
    <PageWrapper className={"gap-16"}>
      <Card header="مؤشر السوق الرئيسية (تاسي)">
        <StockPriceChart symbol={"2222"} />
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        <Card header={"ربحية السهم الأساسية الأساسية"}>
          <FinancialMetricsTable
            tableData={earningsData}
            isScrollable
            deleteButton={false}
            divider={false}
            filterBy={"sectorNameAr"}
            removeFilterFromColumn
          />
        </Card>
        <Card header={"ربحية السهم الأساسية الأساسية"}>
          <FinancialMetricsTable
            tableData={earningsData}
            isScrollable
            deleteButton={false}
            divider={false}
            filterBy={"sectorNameAr"}
            removeFilterFromColumn
          />
        </Card>
        {/* <Card header={"Leverage"}>
            <FinancialMetricsTable
              tableData={leverage}
              isScrollable
              deleteButton={false}
              divider={false}
              filterBy={"sectorNameAr"}
              removeFilterFromColumn
            />
          </Card> */}
      </div>
      <>
        <Card header={"قارن البيانات المالية"}>
          <FinancialMetricsComparisonTable
            tableData={comparisonTableData}
            isScrollable
            filterBy={"sectorNameAr"}
            divider={false}
            removeFilterFromColumn
          />
        </Card>
      </>
    </PageWrapper>
  );
};

export default Page;
