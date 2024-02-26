import Button from "@/components/utils/buttons/Button";
import StockFilterSettingsModal from "@/components/utils/modal/StockFilterSettingsModal";
import { useTechnicalAnalysis } from "@/context/TechnicalAnalysisContext";
import React, { useState } from "react";
import {
  TbArrowMergeBoth,
  TbChartCandle,
  TbFilter,
  TbFilterOff,
} from "react-icons/tb";
import candlestick_patterns from "../utils/candlestickPatterns";

const StocksFilter = () => {
  const {
    setFilteredStocks,
    consolidatingStocksFilter,
    japaneseCandlestickFilter,
  } = useTechnicalAnalysis();

  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    "Consolidating Stocks": {
      icon: TbArrowMergeBoth, // Add the icon for this category
      onSave: consolidatingStocksFilter,
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
      onSave: japaneseCandlestickFilter,
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
  return (
    <div>
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
    </div>
  );
};

export default StocksFilter;
