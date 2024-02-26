"use client";
import Button from "@/components/utils/buttons/Button";
import StocksTable from "@/components/utils/table/StocksTable";
import { useStocksData } from "@/context/StocksDataContext";
import { useTechnicalAnalysis } from "@/context/TechnicalAnalysisContext";
import React, { useEffect, useState } from "react";
import { TbFilter, TbFilterOff } from "react-icons/tb";
import { TbArrowMergeBoth, TbChartCandle } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Modal from "@/components/utils/modal/Modal";
import StockFilterSettingsModal from "@/components/utils/modal/StockFilterSettingsModal";
import candlestick_patterns from "../utils/candlestickPatterns";

const SidebarSelection = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { stocksData } = useStocksData();
  const {
    filteredStocks,
    setFilteredStocks,

    setSelectedStock,
  } = useTechnicalAnalysis();
  const [data, setData] = useState([]);

  const [settings, setSettings] = useState({
    "Consolidating Stocks": {
      // icon: TbArrowMergeBoth, // Add the icon for this category
      onSave: () => console.log("HEELo"),
      options: [
        {
          name: "numberOfCandles",
          label: "عدد الشموع",
          type: "number",
          placeholder: "حدد عدد الشموع",
          defaultValue: "14",
        },
        {
          name: "percentageRange",
          label: "نسبة النطاق",
          type: "number",
          placeholder: "حدد نسبة النطاق",
          defaultValue: 2.5,
        },
      ],
    },
    "Japanese Candlestick": {
      icon: TbChartCandle, // Add the icon for this category (assuming TbX is an icon component)
      onSave: () => console.log("HELLO"),
      options: [
        {
          isSelect: true,
          name: "pattern",
          label: "Option 3",
          // defaultValue: "CDL2CROWS",
          type: "text",
          options: Object.entries(candlestick_patterns).map(([key, value]) => ({
            value: key,
            label: value,
          })),
        },
      ],
    },
  });

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
      <div className="filters flex justify-between">
        <Button
          icon={TbFilter}
          hoverText={"Filter Stocks"}
          onClick={() => setIsOpen(true)}
        />

        <Button
          icon={TbFilterOff}
          hoverText={"Delete Filters"}
          onClick={() => setFilteredStocks("")}
        />
      </div>

      <StockFilterSettingsModal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        title={"Filter Data"}
        settings={settings}
        setSettings={setSettings}
      />

      {/* <Modal isModalOpen={isOpen} setIsModalOpen={setIsOpen} title={"Filter"}>
        <div>HELLLO</div>
      </Modal> */}
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
