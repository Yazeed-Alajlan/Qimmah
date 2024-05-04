import axios from "axios";

async function fetchStockInformationData(symbol) {
  console.log(symbol);
  return axios
    .get(`/api/stocks/${symbol}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

async function fetchDetailedStockInformationData(symbol) {
  console.log(symbol);
  return axios
    .get(`/api/stocks/information/${symbol}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
async function fetchAllStocksInformationData() {
  return axios
    .get(`/api/stocks/`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

async function fetchStockFinancialData(symbol) {
  return axios
    .get(`/api/financials/${symbol}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
async function fetchStockPriceData(symbol) {
  return axios
    .get(`/api/prices/${symbol}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
async function getStockPriceDataByDate(symbol, date) {
  console.log(date);
  return axios
    .get(`/api/prices/${symbol}/?date=${date}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
async function getStockPriceDataByDateInterval(symbol, dateFrom, dateEnd) {
  return axios
    .get(`/api/prices/${symbol}/?date=${dateFrom}&dateEnd=${dateEnd}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

async function getTASIValue() {
  return axios
    .get(`/api/prices/TASI`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
async function getLastTASIValue() {
  try {
    const response = await axios.get(`/api/prices/TASI`);
    const data = response.data;
    const lastObject = data.quotes.slice(-1)[0];
    return lastObject;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getTopGainersAndLosers() {
  const allStocksData = await fetchAllStocksInformationData();
  allStocksData.sort(
    (a, b) =>
      parseFloat(a.summary[a.summary.length - 1].change_ratio) -
      parseFloat(b.summary[b.summary.length - 1].change_ratio)
  );
  const topLosers = allStocksData.slice(0, 5);
  const topGainers = allStocksData
    .slice(-5)
    .sort(
      (a, b) =>
        parseFloat(b.summary[b.summary.length - 1].change_ratio) -
        parseFloat(a.summary[a.summary.length - 1].change_ratio)
    );
  allStocksData.sort(
    (a, b) =>
      parseFloat(b.summary[b.summary.length - 1].trade_volume) -
      parseFloat(a.summary[a.summary.length - 1].trade_volume)
  );
  const topByCount = allStocksData.slice(0, 5);

  allStocksData.sort(
    (a, b) =>
      parseFloat(b.summary[b.summary.length - 1].trade_value) -
      parseFloat(a.summary[a.summary.length - 1].trade_value)
  );
  const topByValue = allStocksData.slice(0, 5);

  // Get the first 5 objects

  return { topGainers, topLosers, topByCount, topByValue };
}

async function getTotalMarketCapitalizationOfTASI() {
  const allStocksData = await fetchAllStocksInformationData();
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
  const stockData = await fetchStockInformationData(symbol);

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

// 31.25

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
  fetchStockInformationData,
  fetchDetailedStockInformationData,
  fetchAllStocksInformationData,
  fetchStockFinancialData,
  fetchStockPriceData,
  getStockPriceDataByDate,
  getStockPriceDataByDateInterval,
  getTotalMarketCapitalizationOfTASI,
  getStockWeightInTasi,
  calculateNewTASIWithSymbol,
  getTopGainersAndLosers,
};
