"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function transformData(inputData) {
  if (inputData == null || inputData.length === 0) {
    return {
      series: [],
      categories: [],
    };
  }

  console.log(inputData);
  const series = Object.keys(inputData).map((key) => {
    const color = "#31C48D"; // Function to generate random colors
    const data = inputData[key].map((item) =>
      parseInt(item.value.replace(/,/g, ""))
    );
    return {
      name: key,
      color: color,
      data: data,
    };
  });

  const categories = inputData[Object.keys(inputData)[0]].map(
    (item) => item.year.split("-")[1]
  );

  const data = {
    series: series,
    categories: categories,
  };

  return data;
}

const ApexChart = ({ data, chartType, chartOptions, height, width }) => {
  const [mergedOptions, setMergedOptions] = useState({});

  data = transformData(data);
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
        categories: data?.categories?.map((item) => item),
      },
      // Add more default options as needed
    };
    if (typeof window !== "undefined") {
      const newMergedOptions = { ...defaultOptions, ...chartOptions };
      setMergedOptions(newMergedOptions);
    }

    console.log(chartType);
  }, [chartType, chartOptions, data]);

  // Merge default options with user-provided options

  return (
    <div>
      {typeof window !== "undefined" && data && (
        <ReactApexChart
          options={mergedOptions}
          series={data.series}
          type={chartType}
          height={height}
          width={width}
        />
      )}
    </div>
  );
};

export default ApexChart;
