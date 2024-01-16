"use client";

import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const Chart = ({ chartData, chartType }) => {
  useEffect(() => {
    let options = {
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          show: true,
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26,
        },
      },
      series: chartData.series,
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: chartType, // Dynamically set the chart type
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      fill: {
        opacity: 0.8,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      xaxis: {
        categories: chartData.categories,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value) {
            return "$" + value;
          },
        },
      },
    };

    const tooltipChartElement = document.getElementById("tooltip-chart");

    // Clear previous chart if it exists
    if (tooltipChartElement && tooltipChartElement.innerHTML !== "") {
      tooltipChartElement.innerHTML = "";
    }

    const chart = new ApexCharts(tooltipChartElement, options);
    chart.render();

    // Clean up chart on component unmount
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartData, chartType]);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div id="tooltip-chart"></div>
    </div>
  );
};

export default Chart;
