// Test.jsx
"use client";

import StocksTable from "@/components/utils/table/StocksTable";
import { usePytohnServer } from "@/context/PytohnServerContext";
import React, { useState, useEffect } from "react";
const Test = () => {
  const [stockData, setStockData] = useState(null);
  const { correlationMatrix } = usePytohnServer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stocks");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setStockData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount
  return (
    <div className="w-3/4  ">
      {stockData ? (
        <StocksTable
          tableData={stockData}
          tableColumns={[
            {
              Header: "Company Name",
              accessor: "symbol",
              maxWidth: 400,
              minWidth: 140,
              width: 400,
            },
            {
              Header: "Sector",
              accessor: "tradingNameAr",
              maxWidth: 400,
              minWidth: 140,
              width: 200,
            },
          ]}
          // isScrollable
          filterBy={"sectorNameAr"}
          searchBy={"tradingNameAr"}
        />
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Test;

{
  /* <FinancialMetricsTable
        header={"Earnings per share"}
        tableData={[
          {
            _id: 1,
            companyName: "ABC Corp",
            sector: "Technology",
            revenue: 1000000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 21212 },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 3333 },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 4444 },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          {
            _id: 2,
            companyName: "XYZ Inc",
            sector: "Finance",
            revenue: 750000,
          },
          { _id: 2, companyName: "XYZ Inc", sector: "Finance", revenue: 22222 },
          // Add more dummy data as needed
        ]}
        tableColumns={[
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
        ]}
        // searchBy="companyName"
        filterBy="sector"
        removeFilterFromColumn={false}
        isScrollable={true}
      /> */
}
