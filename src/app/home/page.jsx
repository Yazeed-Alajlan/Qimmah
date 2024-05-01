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
import {
  getStockWeightInTasi,
  getTotalMarketCapitalizationOfTASI,
  calculateNewTASIWithSymbol,
  getTopGainersAndLosers,
} from "@/services/FetchServices";
import ButtonGroup from "@/components/utils/buttons/ButtonGroup";
import StocksTable from "@/components/utils/table/StocksTable";
import Skeleton from "@/components/Skeleton";

//

const Page = () => {
  const { stocksData } = useStocksData();

  const { data: comparisonTableData } = useQuery(["comparisonTableData"], () =>
    prepareFinancialMetricsComparisonTableData()
  );

  const { data: lastChangeData } = useQuery(["lastChangeData"], () =>
    getLastDateForChange()
  );
  // const { data: MarketCapitalizationOfTASI } = useQuery(
  //   ["MarketCapitalizationOfTASI"],
  //   () => getTotalMarketCapitalizationOfTASI()
  // );
  // const { data: StockWeightData } = useQuery(["StockWeightData"], () =>
  //   getStockWeightInTasi("2222")
  // );
  const { data: stocksSummary } = useQuery(["stocksSummary"], () =>
    getTopGainersAndLosers()
  );

  const periodButtons = [
    {
      label: "الأكثر ارتفاعاً",
      render: () => (
        <>
          {stocksSummary ? (
            <StocksTable
              tableData={stocksSummary.topGainers}
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
                    row?.summary[row?.summary.length - 1]?.open,
                },
                {
                  Header: "الاغلاق",
                  accessor: (row) =>
                    row?.summary[row?.summary.length - 1]?.close,
                },
                {
                  Header: "الأعلى",
                  accessor: (row) =>
                    row?.summary[row?.summary.length - 1]?.high,
                },
                {
                  Header: "الأدنى",
                  accessor: (row) => row?.summary[row?.summary.length - 1]?.low,
                },
                {
                  Header: "التغيير",
                  accessor: (row) =>
                    row?.summary[row?.summary.length - 1]?.change_value,
                },
                {
                  Header: "التغيير (%)",
                  accessor: (row) =>
                    row?.summary[row?.summary.length - 1]?.change_ratio,
                },
                {
                  Header: "الكمية المتداولة",
                  accessor: (row) =>
                    row?.summary[row?.summary.length - 1]?.trade_count,
                },
                {
                  Header: "القيمة المتداولة",
                  accessor: (row) =>
                    row?.summary[row?.summary.length - 1]?.trade_value,
                },
                {
                  Header: "الأعلى آخر 52 أسبوع",
                  accessor: (row) =>
                    row?.summary[row?.summary.length - 1]?.fifty_two_week_high,
                },
                {
                  Header: "الأدنى آخر 52 أسبوع",
                  accessor: (row) =>
                    row?.summary[row?.summary.length - 1]?.fifty_two_week_low,
                },
              ]}
            />
          ) : (
            <Skeleton />
          )}
        </>
      ),
    },
    {
      label: "الأكثر انخفاضاً",
      render: () => <>HII</>,
    },
    {
      label: "الأكثر نشاطاً بالكمية",
      render: () => <>HII</>,
    },
    {
      label: "الأكثر نشاطاً بالقيمة",
      render: () => <>HII</>,
    },
  ];

  return (
    <PageWrapper className={"gap-16"}>
      {/* {StockWeightData} */}
      {console.log(stocksSummary)}
      <Card header="مؤشر السوق الرئيسية (تاسي)">
        <StockPriceChart symbol={"2222"} />
      </Card>
      <Card>{stocksSummary && <ButtonGroup buttons={periodButtons} />}</Card>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-8">
        <Card header={"ربحية السهم الأساسية الأساسية"}>
          <FinancialMetricsTable
            isScrollable
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
                Header: "ربحية السهم الأساسية الأساسية",
                accessor: (row) =>
                  row?.summary[0]?.basic_earnings_per_share_ttm,
              },
            ]}
          />
          <span> {lastChangeData}</span>
        </Card>
        <Card header={"القيمة الدفترية"}>
          <FinancialMetricsTable
            isScrollable
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
                Header: "القيمة الدفترية",
                accessor: (row) => row?.summary[0]?.book_value_per_share_ttm,
              },
            ]}
          />
          <span> {lastChangeData}</span>
        </Card>
        <Card header={"نسبة السعر الى الأرباح"}>
          <FinancialMetricsTable
            isScrollable
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
                Header: "نسبة السعر الى الأرباح",
                accessor: (row) => row?.summary[0]?.daily_price_to_earnings,
              },
            ]}
          />
          <span> {lastChangeData}</span>
        </Card>
        <Card header={"رأس المال السوقي اليومي"}>
          <FinancialMetricsTable
            isScrollable
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
                Header: "رأس المال السوقي اليومي",
                accessor: (row) => row?.summary[0]?.daily_market_capitalization,
              },
            ]}
          />
          <span> {lastChangeData}</span>
        </Card>
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
