"use client";
import Button from "@/components/utils/buttons/Button";
import StocksTable from "@/components/utils/table/StocksTable";
import { useStocksData } from "@/context/StocksDataContext";
import { useTechnicalAnalysis } from "@/context/TechnicalAnalysisContext";
import React, { useEffect, useState } from "react";
import { TbFilter, TbFilterOff } from "react-icons/tb";
import { TbArrowMergeBoth, TbChartCandle } from "react-icons/tb";

const SidebarSelection = () => {
  const { stocksData } = useStocksData();
  const { filteredStocks, setFilteredStocks, selectedStock, setSelectedStock } =
    useTechnicalAnalysis();
  const [data, setData] = useState([]);

  const handleRowClick = (symbol) => {
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
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      {/* <div className="filters d-flex justify-content-between">
        <Button
          icon={TbFilter}
          hoverText={"Filter Stocks"}
          onClick={() => setIsModalOpen(true)}
        />

        <Button
          icon={TbFilterOff}
          hoverText={"Delete Filters"}
          onClick={() => setFilteredStocks("")}
        />
      </div> */}
      {data && (
        <div className="h-full">
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
        </div>
      )}
    </div>
  );
};

export default SidebarSelection;
