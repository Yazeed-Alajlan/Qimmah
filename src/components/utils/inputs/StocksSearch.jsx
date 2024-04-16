"use client";
import React from "react";
import InputSelect from "./InputSelect";
import { useStocksData } from "@/context/StocksDataContext";
import { useRouter } from "next/navigation";

const StocksSearch = ({ className, onStockSelect, label }) => {
  const { stocksData, selectedStock, setSelectedStock } = useStocksData();
  const { push } = useRouter();

  const handleStockSelect = (selectedOption) => {
    setSelectedStock(selectedOption);
    if (selectedOption) {
      if (onStockSelect) {
        // Call the onStockSelect callback with the selected stock
        onStockSelect(selectedOption);
      } else {
        // If onStockSelect prop is not provided, push to the URL
        push(
          `/stock/${selectedOption.sector}/${selectedOption.value}/information`
        );
      }
    }
  };

  return (
    <div className={className}>
      <InputSelect
        label={label}
        className="z-30 w-w-96"
        placeholder="ابحث  باسم الشركة أو الرمز"
        value={selectedStock}
        options={stocksData?.map((stock) => ({
          value: stock.symbol,
          label: `${stock.tradingNameAr} (${stock.symbol})`,
          sector: stock.sectorNameEn,
        }))}
        labelDirection="hr"
        onChange={handleStockSelect}
      />
    </div>
  );
};

export default StocksSearch;
