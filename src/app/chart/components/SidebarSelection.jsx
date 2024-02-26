"use client";
import StocksTable from "@/components/utils/table/StocksTable";
import { useStocksData } from "@/context/StocksDataContext";
import { useTechnicalAnalysis } from "@/context/TechnicalAnalysisContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StocksFilter from "./StocksFilter";

const SidebarSelection = () => {
  const router = useRouter();
  const { stocksData } = useStocksData();
  const { filteredStocks, setSelectedStock } = useTechnicalAnalysis();
  const [data, setData] = useState([]);

  const handleRowClick = (symbol) => {
    router.push(`/chart/${symbol}`);
    setSelectedStock(symbol);
  };
  useEffect(() => {
    if (filteredStocks) {
      const filteredSymbols = Object.keys(filteredStocks);
      const filteredData = stocksData.filter((item) =>
        filteredSymbols.includes(item.symbol)
      );
      setData(filteredData);
    } else {
      setData(stocksData || []);
    }
  }, [filteredStocks, stocksData]);

  return (
    <div className="flex flex-col gap-4 h-screen">
      <StocksFilter />
      {data && (
        <>
          <StocksTable
            className={"p-0 "}
            isScrollable={true}
            tableData={data}
            tableColumns={[
              {
                Header: "الشركة",
                accessor: "symbol",
                Cell: ({ row }) => <span>{row.original.symbol}</span>,
              },
              {
                Header: "الإغلاق",
                accessor: (row) => row.summary[row.summary.length - 1].close,
              },
              {
                Header: "التغيير",
                accessor: (row) =>
                  row.summary[row.summary.length - 1].change_value,
                Cell: ({ value }) => (
                  <span
                    className={
                      value.includes("-") ? "text-danger" : "text-success"
                    }
                  >
                    {value}
                  </span>
                ),
              },
              {
                Header: "نسبة التغيير",
                accessor: (row) =>
                  row.summary[row.summary.length - 1].change_ratio,
                Cell: ({ value }) => (
                  <span
                    className={
                      value.includes("-") ? "text-danger" : "text-success"
                    }
                  >
                    {value}
                  </span>
                ),
              },
            ]}
            handleRowClick={handleRowClick}
          />
        </>
      )}
    </div>
  );
};

export default SidebarSelection;
