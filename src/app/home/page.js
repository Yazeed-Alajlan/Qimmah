import Chart from "@/components/charts/chart";
import YourReactComponent from "@/components/charts/test";

export default function Home() {
  const chartData = {
    series: [
      {
        name: "Developer Edition",
        data: [1500, 1418, 1456, 1526, 1356, 1256],
        color: "#1A56DB",
      },
      {
        name: "Designer Edition",
        data: [643, 413, 765, 412, 1423, 1731],
        color: "#7E3BF2",
      },
    ],
    categories: [
      "01 February",
      "02 February",
      "03 February",
      "04 February",
      "05 February",
      "06 February",
      "07 February",
    ],
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      HOME
      <Chart chartData={chartData} chartType={"line"} />
      <Chart chartData={chartData} chartType={"bar"} />
      <YourReactComponent />
    </main>
  );
}
