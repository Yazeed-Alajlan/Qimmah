function sortMonthlyData(data) {
  const monthsOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const sortedData = Object.fromEntries(
    monthsOrder.map((month) => [month, data[month]])
  );
  return sortedData;
}

export { sortMonthlyData };
