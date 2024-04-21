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
    // console.log(stockData.symbol);
    // console.log(lastClosePrice);
    // console.log(issuedShares);
    // console.log(marketCap);
    totalMarketCap += marketCap;
  });
  // console.log(totalMarketCap);
  return totalMarketCap;
}
async function getTotalCapitalOfTASI() {
  const allStocksData = await fetchAllStocksInformationData();
  let totalCap = 0;
  allStocksData.forEach((stockData) => {
    const stockCapString =
      stockData.equityProfile[0]["Authorized Capital (SAR)"];
    const stockCap = parseFloat(stockCapString.replace(/,/g, ""));
    console.log(stockData.symbol);
    console.log(stockCap);

    totalCap += stockCap;
  });
  return totalCap;
}

async function getStockWeightInTasi(symbol) {
  console.log(
    "---------------------------------------------------------------------"
  );
  const totalTASICap = await getTotalCapitalOfTASI();
  const totalTASIMarketCap = await getTotalMarketCapitalizationOfTASI(); // Assuming you have this function
  const stockData = await fetchStockInformationData(symbol);

  const issuedSharesString = stockData?.equityProfile[0]["Issued Shares"];
  const lastClosePriceString =
    stockData?.summary[stockData?.summary.length - 1]["close"];
  const issuedShares = parseFloat(issuedSharesString.replace(/,/g, ""));
  const lastClosePrice = parseFloat(lastClosePriceString.replace(/,/g, ""));
  const stockMarketCap = issuedShares * lastClosePrice;

  console.log(totalTASIMarketCap);
  console.log(totalTASICap);
  console.log(stockMarketCap);

  console.log((stockMarketCap / totalTASIMarketCap) * 100);
  console.log((stockMarketCap / totalTASICap) * 100);
  return (stockMarketCap / totalTASIMarketCap) * 100;
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
};
