"use client";

import React from "react";
import InputSelect from "./InputSelect";
import { useStocksData } from "@/context/StocksDataContext";
import { useRouter } from "next/navigation";

const StocksSearch = () => {
  const { stocksData, selectedStock, setSelectedStock } = useStocksData();
  const { push } = useRouter();

  const handleStockSelect = (selectedOption) => {
    console.log(selectedOption);
    setSelectedStock(selectedOption);
    push(`/stock/${selectedOption.sector}/${selectedOption.value}/information`);
  };

  return (
    <div>
      <InputSelect
        className="z-50"
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
