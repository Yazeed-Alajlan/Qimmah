import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import FinancialMetricsTable from "@/components/utils/table/FinancialMetricsTable";
import { useStocksData } from "@/context/StocksDataContext";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getAllBasicEarningsPerShareTTM,
  prepareFinancialMetricsComparisonTableData,
} from "@/services/FinancialServices";
import Table from "@/components/utils/table/Table";
import FinancialMetricsComparisonTable from "../comparison/components/FinancialMetricsComparisonTable";

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

  return (
    <PageWrapper className={"gap-16"}>
      <Card header="مؤشر السوق الرئيسية (تاسي)">
        <StockPriceChart symbol={"2222"} />
      </Card>

      <div className="grid grid-cols-2 gap-16">
        <div>
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
        </div>
        <div>
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
        </div>
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
