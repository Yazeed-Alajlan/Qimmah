"use client";
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
        sectorNameAr: data.sectorNameAr,

        ...data.summary[data.summary.length - 1],
      }));
      setFilteredData(formattedData);
    }
    console.log(stocksData);
  }, [stocksData]);

  return (
    <div className="flex flex-col justify-center items-center  gap-10  mt-4">
      {filteredData && (
        <StocksTable
          className=" w-3/4"
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
              Header: "نسبة التغيير",
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

            // Add more columns as needed
          ]}
        />
      )}
    </div>
  );
};

export default StocksPage;
