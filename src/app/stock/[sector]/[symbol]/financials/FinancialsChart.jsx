"use client";

import React, { useState, useEffect } from "react";
import InputSelect from "@/components/utils/inputs/InputSelect";
import ChartCard from "@/components/utils/cards/ChartCard";
import DynamicChart from "@/components/utils/charts/DynamicChart";

const FinancialsChart = ({ stockFinancialData }) => {
  console.log(stockFinancialData);
  const balanceSheetKeys =
    stockFinancialData.balanceSheet.length > 0
      ? Object.keys(stockFinancialData.balanceSheet[0]).slice(1)
      : [];
  const incomeSheetKeys =
    stockFinancialData.incomeSheet.length > 0
      ? Object.keys(stockFinancialData.incomeSheet[0]).slice(1)
      : [];
  const cashFlowKeys =
    stockFinancialData.cashFlow.length > 0
      ? Object.keys(stockFinancialData.cashFlow[0]).slice(1)
      : [];

  const groupedOptions = [
    {
      label: "incomeSheet",
      options: incomeSheetKeys.map((key) => ({ value: key, label: key })),
    },
    {
      label: "cashFlow",
      options: cashFlowKeys.map((key) => ({ value: key, label: key })),
    },
    {
      label: "balanceSheet",
      options: balanceSheetKeys.map((key) => ({ value: key, label: key })),
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let result = {};

    if (selectedOptions.length > 0) {
      selectedOptions.forEach((option) => {
        result[option.label] = []; // Initialize an array for each option

        stockFinancialData[option.groupLabel].forEach((item) => {
          let obj = {
            year: item["year"],
            value: item[option.value], // Changed to option.value for the correct property access
          };

          result[option.label].push(obj); // Push object into the respective option's array
        });
      });
      setChartData(result);
    } else {
      setChartData([]);
    }
  }, [selectedOptions, stockFinancialData]);

  const handleSelectChange = (selected) => {
    const optionsWithGroupLabel = selected.map((opt) => ({
      ...opt,
      groupLabel: groupedOptions.find((group) =>
        group.options.some((grpOpt) => grpOpt.value === opt.value)
      ).label,
    }));
    setSelectedOptions(optionsWithGroupLabel);
  };

  return (
    <div>
      <InputSelect
        options={groupedOptions}
        isMulti={true}
        onChange={handleSelectChange}
        defaultValue={selectedOptions}
      />
      {chartData && <ChartCard type={"bar"} data={chartData} />}
    </div>
  );
};

export default FinancialsChart;
