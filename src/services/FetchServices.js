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

export {
  fetchStockInformationData,
  fetchDetailedStockInformationData,
  fetchAllStocksInformationData,
  fetchStockFinancialData,
  fetchStockPriceData,
  getStockPriceDataByDate,
  getStockPriceDataByDateInterval,
};
