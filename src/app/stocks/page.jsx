"use client";
import PageWrapper from "@/components/PageWrapper";
import Divider from "@/components/utils/Divider";
import { Card } from "@/components/utils/cards/Card";
import StocksTable from "@/components/utils/table/StocksTable";
import { useStocksData } from "@/context/StocksDataContext";
import React, { useEffect, useState } from "react";

const StocksPage = () => {
  const { stocksData } = useStocksData();
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (stocksData) {
      console.log(stocksData);
      const formattedData = stocksData.map((data) => ({
        company: data.symbol + " - " + data.tradingNameAr,
        sectorNameAr: data.sectorNameEn,

        ...data.summary[data.summary.length - 1],
      }));
      setFilteredData(formattedData);
    }
    console.log(stocksData);
  }, [stocksData]);

  return (
    <PageWrapper>
      {filteredData && (
        <Card>
          <StocksTable
            className="w-full z-10"
            filterBy={"sectorNameAr"}
            searchBy={"company"}
            tableData={filteredData}
            tableColumns={[
              {
                Header: "الشركة",
                accessor: "company",
                maxWidth: 400,
                minWidth: 140,
                width: 400,
              },
              {
                Header: "الإفتتاح",
                accessor: "open",
              },
              {
                Header: "الأعلى",
                accessor: "high",
              },
              {
                Header: "الأدنى",
                accessor: "low",
              },
              {
                Header: "الإغلاق",
                accessor: "close",
              },
              {
                Header: "التغيير",
                accessor: "change_value",
              },
              {
                Header: "التغيير (%)",
                accessor: "change_ratio",
              },
              {
                Header: "الكمية المتداولة",
                accessor: "trade_count",
              },
              {
                Header: "القيمة المتداولة",
                accessor: "trade_value",
              },
              {
                Header: "الأعلى آخر 52 أسبوع",
                accessor: "fifty_two_week_high",
              },
              {
                Header: "الأدنى آخر 52 أسبوع",
                accessor: "fifty_two_week_low",
              },
            ]}
          />
        </Card>
      )}
    </PageWrapper>
  );
};

export default StocksPage;
