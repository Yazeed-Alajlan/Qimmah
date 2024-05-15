import { getAllStocksInformation } from "./StockInformationServices";

async function getAllFinancialsSummary(name) {
  const stocksData = await getAllStocksInformation();
  if (stocksData) {
    const formattedData = stocksData.map((data) => {
      const summaryValue =
        data.summary?.length > 0
          ? data.summary[data.summary.length - 1][name]
          : "";
      return {
        company: data.symbol + " - " + data.tradingNameAr,
        sectorNameAr: data.sectorNameAr,
        sectorNameEn: data.sectorNameEn,
        [name]: summaryValue,
      };
    });

    return formattedData;
  }
  return [];
}

async function prepareFinancialMetricsComparisonTableData() {
  const stocksData = await getAllStocksInformation();

  if (stocksData) {
    const formattedData = stocksData.map((data) => ({
      symbol: data.symbol,
      name: data.tradingNameAr,
      sectorNameAr: data.sectorNameAr,
      ...data.summary[data.summary.length - 1],
    }));
    return formattedData;
  }
  return [];
}

export { getAllFinancialsSummary, prepareFinancialMetricsComparisonTableData };
