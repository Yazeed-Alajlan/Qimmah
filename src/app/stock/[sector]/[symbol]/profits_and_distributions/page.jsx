"use client";
import React from "react";
import Table from "@/components/utils/table/Table";
import { Card } from "@/components/utils/cards/Card";
import { fetchStockFinancialData } from "@/services/FetchServices";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import DynamicChart from "@/components/utils/charts/DynamicChart";

function extractKeyValue(arr, key, value) {
  return arr.map((obj) => {
    const newObj = {};
    newObj[key] = obj[key];
    newObj[value] = obj[value];
    return newObj;
  });
}

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
                    Header: "تاريخ الإعلان",
                    accessor: "announced_date",
                  },
                  {
                    Header: "تاريخ الإستحقاق",
                    accessor: "distribution_date",
                  },
                  {
                    Header: "تاريخ التوزيع",
                    accessor: "distribution_way",
                  },
                  {
                    Header: "طريقة التوزيع",
                    accessor: "dividend_per_share",
                  },
                  {
                    Header: "الربح الموزع",
                    accessor: "eligibility_date",
                  },
                ]}
              />
              <DynamicChart
                type={"bar"}
                data={extractKeyValue(
                  stockFinancialData.dividends,
                  "announced_date",
                  "dividend_per_share"
                )}
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
