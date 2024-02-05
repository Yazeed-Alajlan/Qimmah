"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/utils/table/Table";
import { Card } from "@/components/utils/cards/Card";
import {
  fetchStockFinancialData,
  getStockPriceDataByDate,
} from "@/services/FetchServices";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import DynamicChart from "@/components/utils/charts/DynamicChart";

function extractKeyValue(arr, key, value) {
  return arr.reduce((result, obj) => {
    result[obj[key]] = obj[value];
    return result;
  }, {});
}
const calculateDividendYield = (dividendPerShare, stockPrice) => {
  return (dividendPerShare / stockPrice) * 100;
};

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

  const [data, setData] = useState();

  useEffect(() => {
    const fetchYieldData = async () => {
      if (stockFinancialData && stockFinancialData.dividends) {
        const updatedDividends = [];

        for (const item of stockFinancialData.dividends) {
          var announced_date = new Date(
            item.announced_date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
          )
            .toISOString()
            .split("T")[0];

          var eligibility_date = new Date(
            item.eligibility_date.replace(
              /(\d{2})\/(\d{2})\/(\d{4})/,
              "$3-$2-$1"
            )
          )
            .toISOString()
            .split("T")[0];

          const announcedDataStockPriceData = await getStockPriceDataByDate(
            symbol,
            announced_date
          );
          const eligibilityDateStockPriceData = await getStockPriceDataByDate(
            symbol,
            eligibility_date
          );
          const announcedDataClosePrice =
            announcedDataStockPriceData?.quotes?.[0]?.close !== undefined
              ? announcedDataStockPriceData.quotes[0].close
              : 0;
          const eligibilityDateClosePrice =
            eligibilityDateStockPriceData?.quotes?.[0]?.close !== undefined
              ? eligibilityDateStockPriceData.quotes[0].close
              : 0;

          const yieldValue =
            announcedDataClosePrice == 0
              ? 0
              : (
                  (parseFloat(item.dividend_per_share) /
                    announcedDataClosePrice) *
                  100
                ).toFixed(2);
          const ratio = (
            ((eligibilityDateClosePrice - announcedDataClosePrice) /
              announcedDataClosePrice) *
            100
          ).toFixed(2);
          const updatedItem = {
            ...item,
            yield: announcedDataClosePrice + "---" + yieldValue,
            ratio: ratio,
          };

          updatedDividends.push(updatedItem);
        }
        setData(updatedDividends);
        stockFinancialData.dividends = updatedDividends;
      }
    };
    console.log(stockFinancialData);
    fetchYieldData();
  }, [symbol, stockFinancialData]);

  return (
    <>
      {data ? (
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

                    accessor: "eligibility_date",
                  },
                  {
                    Header: "تاريخ التوزيع",
                    accessor: "distribution_date",
                  },
                  {
                    Header: "طريقة التوزيع",
                    accessor: "distribution_way",
                  },
                  {
                    Header: "الربح الموزع",
                    accessor: "dividend_per_share",
                  },
                  {
                    Header: "نسبة الربح الموزع",
                    accessor: "yield",
                  },
                  {
                    Header: "التغيير",
                    accessor: "ratio",
                  },
                ]}
              />
              {/* <DynamicChart
                type={"bar"}
                data={extractKeyValue(
                  stockFinancialData.dividends,
                  "announced_date",
                  "dividend_per_share"
                )}
              /> */}
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
