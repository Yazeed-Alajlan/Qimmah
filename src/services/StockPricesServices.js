import axios from "axios";

async function getStockPrices(symbol) {
  return axios
    .get(`/api/stocks/prices/${symbol}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
async function getStockPricesByDate(symbol, date) {
  console.log(date);
  return axios
    .get(`/api/stocks/prices/${symbol}/?date=${date}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

async function getStockPriceByDateInterval(symbol, dateFrom, dateEnd) {
  return axios
    .get(`/api/stocks/prices/${symbol}/?date=${dateFrom}&dateEnd=${dateEnd}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

async function getTASIPrice() {
  return axios
    .get(`/api/stocks/prices/TASI`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
async function getLastTASIPrice() {
  try {
    const response = await axios.get(`/api/stocks/prices/TASI`);
    const data = response.data;
    const lastObject = data.quotes.slice(-1)[0];
    return lastObject;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export {
  getStockPrices,
  getStockPricesByDate,
  getStockPriceByDateInterval,
  getTASIPrice,
  getLastTASIPrice,
};
