import {
  getAllStocksInformation,
  getStockInformation,
} from "./StockInformationServices";

async function getLastDateForChange() {
  const stocksData = await getAllStocksInformation();
  if (stocksData) {
    const dateObject = new Date(stocksData[0].summary.trade_date);
    const formattedDate = dateObject.toLocaleDateString("en-GB"); // Assuming 'en-GB' locale for dd/mm/yyyy format
    return formattedDate;
  }
  return null;
}

async function getTopGainersAndLosers() {
  const allStocksData = await getAllStocksInformation();
  allStocksData.sort(
    (a, b) =>
      parseFloat(a.summary.change_ratio) - parseFloat(b.summary.change_ratio)
  );
  const topLosers = allStocksData.slice(0, 5);
  const topGainers = allStocksData
    .slice(-5)
    .sort(
      (a, b) =>
        parseFloat(b.summary.change_ratio) - parseFloat(a.summary.change_ratio)
    );
  allStocksData.sort(
    (a, b) =>
      parseFloat(b.summary.trade_volume) - parseFloat(a.summary.trade_volume)
  );
  const topByCount = allStocksData.slice(0, 5);

  allStocksData.sort(
    (a, b) =>
      parseFloat(b.summary.trade_value) - parseFloat(a.summary.trade_value)
  );
  const topByValue = allStocksData.slice(0, 5);

  // Get the first 5 objects

  return { topGainers, topLosers, topByCount, topByValue };
}

async function getTotalMarketCapitalizationOfTASI() {
  const allStocksData = await getAllStocksInformation();
  let totalMarketCap = 0;

  allStocksData.forEach((stockData) => {
    const issuedSharesString =
      "Outstanding Shares" in stockData.equityProfile[0]
        ? stockData.equityProfile[0]["Outstanding Shares"]
        : stockData.equityProfile[0]["Issued Shares"];
    const lastClosePriceString =
      stockData.summary[stockData?.summary.length - 1]["close"];

    const issuedShares = parseFloat(issuedSharesString.replace(/,/g, ""));
    const lastClosePrice = parseFloat(lastClosePriceString.replace(/,/g, ""));
    const marketCap = issuedShares * lastClosePrice;

    totalMarketCap += marketCap;
  });
  return totalMarketCap;
}

async function getStockWeightInTasi(symbol) {
  const totalTASICap = await getTotalMarketCapitalizationOfTASI();
  const stockData = await getStockInformation(symbol);

  const issuedSharesString =
    "Outstanding Shares" in stockData.equityProfile[0]
      ? stockData.equityProfile[0]["Outstanding Shares"]
      : stockData.equityProfile[0]["Issued Shares"];
  const lastClosePriceString =
    stockData?.summary[stockData?.summary.length - 1]["close"];
  const issuedShares = parseFloat(issuedSharesString.replace(/,/g, ""));
  const lastClosePrice = parseFloat(lastClosePriceString.replace(/,/g, ""));
  const stockMarketCap = issuedShares * lastClosePrice;
  return stockMarketCap / totalTASICap;
}

async function calculateNewTASIWithSymbol(symbol, newClosePrice) {
  try {
    const TASILastValue = (await getLastTASIValue()).close;

    // Fetch data for the specific stock
    const stockData = await fetchStockInformationData(symbol);
    const lastClosePriceString =
      stockData?.summary[stockData?.summary.length - 1]["close"];
    const lastClosePrice = parseFloat(lastClosePriceString.replace(/,/g, ""));
    const closePriceChange = (newClosePrice - lastClosePrice) / lastClosePrice;
    const stockWeight = await getStockWeightInTasi(symbol);
    const change = TASILastValue * closePriceChange * stockWeight;
    const newTASI = TASILastValue + change;

    return { newTASI, change, stockWeight };
  } catch (error) {
    console.error("Error calculating new TASI with symbol:", error);
    throw error;
  }
}

export {
  getTotalMarketCapitalizationOfTASI,
  getStockWeightInTasi,
  calculateNewTASIWithSymbol,
  getTopGainersAndLosers,
  getLastDateForChange,
};
