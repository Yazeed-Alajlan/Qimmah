import axios from "axios";

async function stockPriceSummary(symbol) {
  console.log(symbol);
  try {
    const response = await fetch(
      `http://127.0.0.1:4000/api/stocks/${symbol}/price-summary`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error("Failed to send pattern ");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function consolidatingStocksFilter(numberOfCandles, percentageRange) {
  try {
    const url = `http://localhost:4000/api/stocks/consolidating-stocks?numberOfCandles=${numberOfCandles}&percentageRange=${percentageRange}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function japaneseCandlestickFilter(pattern) {
  console.log(pattern);
  try {
    const response = await fetch(
      `http://localhost:4000/api/stocks/japanese-candlestick-patterns/${pattern}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data[pattern]);
      return data[pattern];
    } else {
      console.error("Failed to send pattern");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
async function japaneseCandlestickMarkers(symbol) {
  try {
    const response = await fetch(
      `http://localhost:4000/api/stocks/japanese-candlestick-patterns-markers?symbol=${symbol}`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to send pattern ");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
async function correlationMatrix(symbols) {
  try {
    const response = await fetch(
      `http://127.0.0.1:4000/api/stocks/correlation-matrix?symbols=${symbols}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error("Failed to send pattern ");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export {
  stockPriceSummary,
  correlationMatrix,
  consolidatingStocksFilter,
  japaneseCandlestickMarkers,
  japaneseCandlestickFilter,
};
