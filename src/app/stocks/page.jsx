"use client";
import PageWrapper from "@/components/PageWrapper";
import Skeleton from "@/components/Skeleton";
import Badge from "@/components/utils/Badge";
import Divider from "@/components/utils/Divider";
import { Card } from "@/components/utils/cards/Card";
import StocksTable from "@/components/utils/table/StocksTable";
import Table from "@/components/utils/table/Table";
import { useStocksData } from "@/context/StocksDataContext";
import Link from "next/link";
import React from "react";

const StocksPage = () => {
  const { stocksData } = useStocksData();

  return (
    <PageWrapper>
      <Card>
        {stocksData ? (
          <StocksTable
            filterBy={"sectorNameAr"}
            searchBy={"symbol"}
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
                accessor: (row) => row?.summary[0]?.open,
              },
              {
                Header: "الاغلاق",
                accessor: (row) => row?.summary[0]?.close,
              },
              {
                Header: "الأعلى",
                accessor: (row) => row?.summary[0]?.high,
              },
              {
                Header: "الأدنى",
                accessor: (row) => row?.summary[0]?.low,
              },
              {
                Header: "التغيير",
                accessor: (row) => row?.summary[0]?.change_value,
              },
              {
                Header: "التغيير (%)",
                accessor: (row) => row?.summary[0]?.change_ratio,
              },
              {
                Header: "الكمية المتداولة",
                accessor: (row) => row?.summary[0]?.trade_count,
              },
              {
                Header: "القيمة المتداولة",
                accessor: (row) => row?.summary[0]?.trade_value,
              },
              {
                Header: "الأعلى آخر 52 أسبوع",
                accessor: (row) => row?.summary[0]?.fifty_two_week_high,
              },
              {
                Header: "الأدنى آخر 52 أسبوع",
                accessor: (row) => row?.summary[0]?.fifty_two_week_low,
              },
            ]}
          />
        ) : (
          <Skeleton />
        )}
      </Card>
    </PageWrapper>
  );
};

export default StocksPage;
