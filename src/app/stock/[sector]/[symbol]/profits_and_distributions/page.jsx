"use client";
import React from "react";
import Table from "@/components/utils/table/Table";
import { Card } from "@/components/utils/cards/Card";
import { fetchStockFinancialData } from "@/services/FetchServices";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
const Dividend = () => {
  const { symbol } = useParams();
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockFinancialData,
    error,
  } = useQuery(["stockFinancialData", symbol], () =>
    fetchStockFinancialData(symbol)
  );
  console.log(stockFinancialData);
  return (
    <>
      {stockFinancialData ? (
        <Card header={"الأرباح و التوزيعات"}>
          {stockFinancialData && (
            <>
              <Table
                className=" w-full"
                isScrollable
                // filterBy={"sectorNameAr"}
                searchBy={"announced_date"}
                tableData={stockFinancialData.dividends}
                tableColumns={[
                  {
                    Header: "announced_date",
                    accessor: "announced_date",
                  },
                  {
                    Header: "distribution_date",
                    accessor: "distribution_date",
                  },
                  {
                    Header: "الأعلى",
                    accessor: "distribution_way",
                  },
                  {
                    Header: "الأدنى",
                    accessor: "dividend_per_share",
                  },
                  {
                    Header: "الإغلاق",
                    accessor: "eligibility_date",
                  },
                ]}
              />
            </>
          )}
        </Card>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default Dividend;
