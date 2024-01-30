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

async function fetchStockFinancialData(symbol) {
  console.log(symbol);
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

export {
  fetchStockInformationData,
  fetchStockFinancialData,
  fetchStockPriceData,
};
