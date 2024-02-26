"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { moving_average_bounce_penetration_percentage } from "@/services/PythonServices";
import PageWrapper from "@/components/PageWrapper";
import { Card } from "@/components/utils/cards/Card";
import DynamicChart from "@/components/utils/charts/DynamicChart";
import StocksSearch from "@/components/utils/inputs/StocksSearch";

const Page = () => {
  const [selectedStock, setSelectedStock] = useState();
  const [formattedData, setFormattedData] = useState(null);

  const { data, refetch } = useQuery(
    [selectedStock],
    () => moving_average_bounce_penetration_percentage(selectedStock),
    {
      enabled: !!selectedStock,
    }
  );

  useEffect(() => {
    const formatData = async (data) => {
      const formattedData = {
        bounce_percentage: [],
        penetration_percentage: [],
        resistance_bounces_percentage: [],
        support_bounces_percentage: [],
        total_intersections: [],
      };

      data.forEach((period) => {
        formattedData.bounce_percentage.push({
          year: period.period,
          value: period.bounce_percentage,
        });

        formattedData.penetration_percentage.push({
          year: period.period,
          value: period.penetration_percentage,
        });

        formattedData.resistance_bounces_percentage.push({
          year: period.period,
          value: period.resistance_bounces_percentage,
        });

        formattedData.support_bounces_percentage.push({
          year: period.period,
          value: period.support_bounces_percentage,
        });

        formattedData.total_intersections.push({
          year: period.period,
          value: period.total_intersections,
        });
      });

      setFormattedData(formattedData);
    };

    if (data) {
      formatData(data);
    }
  }, [data]);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock?.value);
    refetch();
  };

  return (
    <PageWrapper>
      <Card className={"mb-8"}>
        <StocksSearch
          label={"إختر سهم"}
          className={"w-full"}
          onStockSelect={handleStockSelect}
        />
      </Card>
      {formattedData && (
        <Card className="">
          <DynamicChart type={"line"} data={formattedData} />
        </Card>
      )}
    </PageWrapper>
  );
};

export default Page;
