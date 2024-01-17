"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ data, chartType, chartOptions }) => {
  const [mergedOptions, setMergedOptions] = useState({});

  // Default chart options
  useEffect(() => {
    const defaultOptions = {
      chart: {
        id: "basic-chart",
      },
      fill: {
        opacity: 0.8,
      },
      legend: {
        show: true,
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {},
      },
      plotOptions: {
        bar: {
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 2,
          dataLabels: {
            position: "top",
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
          // formatter: function (value) {
          //   return "$" + value;
          // },
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
          // formatter: function (value) {
          //   return "$" + value;
          // },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        categories: data.categories.map((item) => item),
      },
      // Add more default options as needed
    };
    const newMergedOptions = { ...defaultOptions, ...chartOptions };
    setMergedOptions(newMergedOptions);
    console.log(chartType);
  }, [chartType]);

  // Merge default options with user-provided options

  return (
    <div>
      <ReactApexChart
        options={mergedOptions}
        series={data.series}
        type={chartType}
        height={350}
      />
    </div>
  );
};

export default Chart;
