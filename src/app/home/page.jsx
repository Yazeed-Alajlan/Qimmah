import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import StocksSearch from "@/components/utils/inputs/StocksSearch";
import FinancialMetricsTable from "@/components/utils/table/FinancialMetricsTable";
import { useStocksData } from "@/context/StocksDataContext";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllBasicEarningsPerShareTTM } from "@/services/FinancialServices";

const Page = () => {
  const {
    isError,
    isSuccess,
    isLoading,
    data: earningsData,
    error,
  } = useQuery(["earningsData"], () => getAllBasicEarningsPerShareTTM());
  return (
    <PageWrapper className={"gap-16"}>
      <Card header="مؤشر السوق الرئيسية (تاسي)">
        <StockPriceChart symbol={"2222"} />
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {earningsData && (
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
        )}
        {earningsData && (
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
        )}
      </div>
    </PageWrapper>
  );
};

export default Page;
