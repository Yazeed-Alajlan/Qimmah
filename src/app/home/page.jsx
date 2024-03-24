"use client";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/Card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import FinancialMetricsTable from "@/components/utils/table/FinancialMetricsTable";
import React from "react";
import { useQuery } from "react-query";
import {
  getAllFinancialsSummary,
  getFinancialMetric,
  getLastDateForChange,
  prepareFinancialMetricsComparisonTableData,
} from "@/services/FinancialServices";
import FinancialMetricsComparisonTable from "../comparison/components/FinancialMetricsComparisonTable";

const Page = () => {
  const { data: basic_earnings_per_share_ttm } = useQuery(
    ["basic_earnings_per_share_ttm"],
    () => getAllFinancialsSummary("basic_earnings_per_share_ttm")
  );
  const { data: book_value_per_share_ttm } = useQuery(
    ["book_value_per_share_ttm"],
    () => getAllFinancialsSummary("book_value_per_share_ttm")
  );
  const { data: daily_price_to_earnings } = useQuery(
    ["daily_price_to_earnings"],
    () => getAllFinancialsSummary("daily_price_to_earnings")
  );

  const { data: comparisonTableData } = useQuery(["comparisonTableData"], () =>
    prepareFinancialMetricsComparisonTableData()
  );
  const { data: lastChangeData } = useQuery(["lastChangeData"], () =>
    getLastDateForChange()
  );
  // const { data: leverage } = useQuery(["leverageData"], () =>
  //   getFinancialMetric("Leverage")
  // );

  return (
    <PageWrapper className={"gap-16"}>
      <Card header="مؤشر السوق الرئيسية (تاسي)">
        <StockPriceChart symbol={"2222"} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        <Card header={"ربحية السهم الأساسية الأساسية"}>
          <FinancialMetricsTable
            tableData={basic_earnings_per_share_ttm}
            isScrollable
            deleteButton={false}
            divider={false}
            filterBy={"sectorNameAr"}
            removeFilterFromColumn
          />
        </Card>
        <Card header={"القيمة الدفترية"}>
          <FinancialMetricsTable
            tableData={book_value_per_share_ttm}
            isScrollable
            deleteButton={false}
            divider={false}
            filterBy={"sectorNameAr"}
            removeFilterFromColumn
          />
          <span> {lastChangeData}</span>
        </Card>
        <Card header={"daily_price_to_earnings"}>
          <FinancialMetricsTable
            tableData={daily_price_to_earnings}
            isScrollable
            deleteButton={false}
            divider={false}
            filterBy={"sectorNameAr"}
            removeFilterFromColumn
          />
          <span> {lastChangeData}</span>
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
