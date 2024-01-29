import axios from "axios";

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

export { fetchStockFinancialData };
