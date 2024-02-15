"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "@/components/utils/cards/Card";
import { getHawkesProcess } from "@/services/PythonServices";
import { useQuery } from "react-query";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const HawkesProcess = ({ symbol }) => {
  const { isLoading, isRefetching, data } = useQuery(["data", symbol], () =>
    getHawkesProcess(symbol)
  );
  // Check if data is still loading
  if (isLoading) {
    return <p>Loading...</p>; // You can replace this with a loading indicator
  }

  const chartData = {
    labels: data.date,
    datasets: [
      {
        label: "Close",
        data: data.log_close,
        yAxisID: "y-axis-1", // Assign to the first y-axis
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 0, // Set pointRadius to 0 to remove data points
      },
      {
        label: "V Hawk",
        data: data.v_hawk,
        yAxisID: "y-axis-2", // Assign to the second y-axis
        fill: false,
        borderColor: "gold",
        pointRadius: 0, // Set pointRadius to 0 to remove data points
      },
      {
        label: "Q05",
        data: data.q05,
        yAxisID: "y-axis-2", // Assign to the second y-axis
        fill: false,
        borderColor: "red",
        pointRadius: 0, // Set pointRadius to 0 to remove data points
      },
      {
        label: "Q95",
        data: data.q95,
        yAxisID: "y-axis-2", // Assign to the second y-axis
        fill: false,
        borderColor: "blue",
        pointRadius: 0, // Set pointRadius to 0 to remove data points
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: [
        {
          id: "y-axis-1",
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Close",
          },
        },
        {
          id: "y-axis-2",
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "V Hawk, Q05, Q95",
          },
        },
      ],
    },
  };

  console.log(chartData);
  return (
    <Card>
      {" "}
      <Line data={chartData} options={chartOptions} />{" "}
    </Card>
  );
};

export default HawkesProcess;
