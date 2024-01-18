// Test.jsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/utils/buttons/Button";
import Dropdown from "@/components/utils/inputs/Dropdown";
import { FaHeart } from "react-icons/fa";
// import ChartCard from "@/components/utils/cards/ChartCard";
import Drawer from "@/components/utils/drawer/Drawer";
import Table from "@/components/utils/table/Table";
import InputSelect from "@/components/utils/inputs/InputSelect";
import FinancialMetricsTable from "@/components/utils/table/FinancialMetricsTable";

const Test = () => {
  // Dummy data for the table
  const dummyData = [
    { _id: 1, companyName: "ABC Corp", sector: "Technology", revenue: 1000000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 21212 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 3333 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 4444 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 750000 },
    { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 22222 },
    // Add more dummy data as needed
  ];

  // Define table columns
  const tableColumns = [
    {
      Header: "Company Name",
      accessor: "companyName",
      maxWidth: 400,
      minWidth: 140,
      width: 400,
    },
    {
      Header: "Sector",
      accessor: "sector",
      maxWidth: 400,
      minWidth: 140,
      width: 200,
    },
  ];
  return (
    <main className="flex  w-full">
      <FinancialMetricsTable
        header={"ربحية السهم الأساسية الأساسية"}
        tableData={dummyData}
        tableColumns={tableColumns}
        // searchBy="companyName"
        // filterBy="sector"
        removeFilterFromColumn={false}
        isScrollable={true}
      />
    </main>
  );
};

export default Test;
