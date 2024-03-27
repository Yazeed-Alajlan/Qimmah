"use client";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/Card";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";
import FinancialMetricsTable from "@/components/utils/table/FinancialMetricsTable";
import React from "react";
import { useQuery } from "react-query";
import {
  getLastDateForChange,
  prepareFinancialMetricsComparisonTableData,
} from "@/services/FinancialServices";
import FinancialMetricsComparisonTable from "../comparison/components/FinancialMetricsComparisonTable";
import { useStocksData } from "@/context/StocksDataContext";
import Link from "next/link";
import Badge from "@/components/utils/Badge";

const Page = () => {
  const { stocksData } = useStocksData();

  const { data: comparisonTableData } = useQuery(["comparisonTableData"], () =>
    prepareFinancialMetricsComparisonTableData()
  );

  const { data: lastChangeData } = useQuery(["lastChangeData"], () =>
    getLastDateForChange()
  );

  return (
    <PageWrapper className={"gap-16"}>
      <Card header="مؤشر السوق الرئيسية (تاسي)">
        <StockPriceChart symbol={"2222"} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {/* <Card header={"ربحية السهم الأساسية الأساسية"}>
          <FinancialMetricsTable
            tableData={basic_earnings_per_share_ttm}
            isScrollable
            deleteButton={false}
            divider={false}
            filterBy={"sectorNameAr"}
            removeFilterFromColumn
          />
        </Card> */}
        <Card header={"القيمة الدفترية"}>
          {stocksData ? (
            <>
              <FinancialMetricsTable
                isScrollable
                filterBy={"sectorNameAr"}
                // searchBy={"symbol"}
                tableData={stocksData}
                tableColumns={[
                  {
                    Header: "الشركة",
                    accessor: "symbol",
                    Cell: ({ row }) => (
                      <>
                        <Link
                          href={`/stock/${row.original.sectorNameAr}/${row.original.symbol}/information`}
                        >
                          <span>
                            <Badge
                              className="fw-bold me-2"
                              variant="primary" // Use variant instead of color
                              text={row.original.symbol}
                            />
                          </span>
                        </Link>

                        <span>{row.original.tradingNameAr}</span>
                      </>
                    ),
                  },
                  {
                    Header: "الافتتاح",
                    accessor: (row) =>
                      row?.summary[0]?.book_value_per_share_ttm,
                  },
                ]}
              />
              <span> {lastChangeData}</span>
            </>
          ) : (
            <>loading</>
          )}
        </Card>
        <Card header={"daily_price_to_earnings"}>
          {stocksData ? (
            <>
              <FinancialMetricsTable
                isScrollable
                filterBy={"sectorNameAr"}
                // searchBy={"symbol"}
                tableData={stocksData}
                tableColumns={[
                  {
                    Header: "الشركة",
                    accessor: "symbol",
                    Cell: ({ row }) => (
                      <>
                        <Link
                          href={`/stock/${row.original.sectorNameAr}/${row.original.symbol}/information`}
                        >
                          <span>
                            <Badge
                              className="fw-bold me-2"
                              variant="primary" // Use variant instead of color
                              text={row.original.symbol}
                            />
                          </span>
                        </Link>

                        <span>{row.original.tradingNameAr}</span>
                      </>
                    ),
                  },
                  {
                    Header: "الافتتاح",
                    accessor: (row) => row?.summary[0]?.daily_price_to_earnings,
                  },
                ]}
              />
              <span> {lastChangeData}</span>
            </>
          ) : (
            <>loading</>
          )}
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
