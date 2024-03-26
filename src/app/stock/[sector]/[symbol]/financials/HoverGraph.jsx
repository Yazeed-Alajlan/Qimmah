import React from "react";
// import { OverlayTrigger, Card } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Card } from "@/components/utils/cards/Card";

Chart.register(...registerables);
const HoverGraph = ({ text, data, years }) => {
  const chartData = {
    labels: years,

    datasets: [
      {
        label: "Data",
        data: data.map((value) => parseFloat(value.replace(/,/g, ""))),
        borderColor: "#3f51b5",
      },
    ],
  };
  // Configure chart options
  const chartOptions = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-96 h-min p-4">
      <Card>
        <Bar data={chartData} options={chartOptions} />
      </Card>
      {text}
    </div>
  );
};

export default HoverGraph;
