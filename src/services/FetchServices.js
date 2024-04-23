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

async function getTotalMarketCapitalizationOfTASI() {
  const allStocksData = await fetchAllStocksInformationData();

  let totalMarketCap = 0;

  allStocksData.forEach((stockData) => {
    const issuedSharesString = stockData.equityProfile[0]["Issued Shares"];
    const lastClosePriceString =
      stockData.summary[stockData?.summary.length - 1]["close"];

    const issuedShares = parseFloat(issuedSharesString.replace(/,/g, ""));
    const lastClosePrice = parseFloat(lastClosePriceString.replace(/,/g, ""));
    const marketCap = issuedShares * lastClosePrice;

    totalMarketCap += marketCap;
  });
  return totalMarketCap;
}

async function getTotalCapitalOfTASI() {
  const allStocksData = await fetchAllStocksInformationData();
  let totalCap = 0;
  let c = 0;
  allStocksData.forEach((stockData) => {
    const stockCapString = stockData.equityProfile[0]["Paid Capital (SAR)"];
    const stockCap = parseFloat(stockCapString.replace(/,/g, ""));
    totalCap += stockCap;
  });
  return totalCap;
}

async function getStockWeightInTasi(symbol) {
  const totalTASICap = await getTotalMarketCapitalizationOfTASI();
  const stockData = await fetchStockInformationData(symbol);

  const issuedSharesString = stockData?.equityProfile[0]["Issued Shares"];
  const lastClosePriceString =
    stockData?.summary[stockData?.summary.length - 1]["close"];
  const issuedShares = parseFloat(issuedSharesString.replace(/,/g, ""));
  const lastClosePrice = parseFloat(lastClosePriceString.replace(/,/g, ""));
  const stockMarketCap = issuedShares * lastClosePrice;

  console.log(totalTASICap);
  console.log(stockMarketCap);
  console.log(stockMarketCap / totalTASICap);
  return stockMarketCap / totalTASICap;
}
async function calculateNewTASIWithSymbol(initialTASI, symbol, newClosePrice) {
  try {
    // Fetch data for the specific stock
    const stockData = await fetchStockInformationData(symbol);
    const lastClosePriceString =
      stockData?.summary[stockData?.summary.length - 1]["close"];
    const lastClosePrice = parseFloat(lastClosePriceString.replace(/,/g, ""));
    const closePriceChange = (newClosePrice - lastClosePrice) / lastClosePrice;
    const stockWeight = await getStockWeightInTasi(symbol);
    const newTASI = initialTASI * closePriceChange * stockWeight;

    console.log(lastClosePrice);
    console.log(newClosePrice);
    console.log(closePriceChange);
    console.log(stockWeight);
    console.log(newTASI);
    return newTASI;
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
};
