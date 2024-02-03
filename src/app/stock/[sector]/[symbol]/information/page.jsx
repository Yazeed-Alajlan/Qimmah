"use client";
import React from "react";
import { Card } from "@/components/utils/cards/Card";
import { useParams } from "next/navigation";
import { fetchStockInformationData } from "@/services/FetchServices";
import { useQuery } from "react-query";
import List from "./List";
import ButtonGroup from "@/components/utils/buttons/ButtonGroup";
import StockPriceChart from "@/components/utils/charts/StockPriceChart";

const StockInformation = () => {
  const { symbol } = useParams();
  const {
    isError,
    isSuccess,
    isLoading,
    data: stockInformationData,
    error,
  } = useQuery(["stockInformationData", symbol], () =>
    fetchStockInformationData(symbol)
  );

  const data = [
    {
      name: "القيمة السوقية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
    {
      name: "ربحية السهم EPS",
      info: "daily",
      value: stockInformationData?.summary[0]?.basic_earnings_per_share_ttm,
    },
    {
      name: "مكرر الربحية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
    {
      name: "القيمة الدفترية",
      info: "daily",
      value: stockInformationData?.summary[0]?.book_value_per_share_ttm,
    },
    {
      name: "مضاعف القيمة الدفترية",
      info: "daily",
      value: stockInformationData?.summary[0]?.basic_earnings_per_share_ttm,
    },
    {
      name: "نسبة التوزيعات النقدية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
    {
      name: "رأس المال المصرّح",
      info: "daily",
      value: stockInformationData?.capital?.[0]?.newCApital ?? "N/A",
    },
  ];
  const data2 = [
    {
      name: "القيمة السوقية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
    {
      name: "ربحية السهم EPS",
      info: "daily",
      value: stockInformationData?.summary[0]?.basic_earnings_per_share_ttm,
    },
    {
      name: "مكرر الربحية",
      info: "daily",
      value: stockInformationData?.summary[0]?.daily_price_to_earnings,
    },
  ];

  const periodButtons = [
    {
      label: "سنوي",
      render: () => <List data={data} />,
    },
    {
      label: "ربع سنوي",
      render: () => <List data={data2} />,
    },
  ];

  return (
    <>
      {stockInformationData ? (
        <div className="flex gap-4">
          <Card header="تحركات السهم">
            <StockPriceChart symbol={symbol} />
          </Card>
          <Card>
            <ButtonGroup buttons={periodButtons} />
          </Card>
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default StockInformation;
