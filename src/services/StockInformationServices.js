import axios from "axios";

async function getStockInformation(symbol) {
  return axios
    .get(`/api/stocks/information/${symbol}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

async function getDetailedStockInformation(symbol) {
  return axios
    .get(`/api/stocks/information/${symbol}?detailed=${true}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
async function getAllStocksInformation() {
  return axios
    .get(`/api/stocks/`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

export {
  getStockInformation,
  getDetailedStockInformation,
  getAllStocksInformation,
};
