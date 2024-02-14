import axios from "axios";

async function getIndicatorData(symbol, indicator, params) {
  let response;
  console.log(params);
  const stringParams = JSON.stringify(params); // Stringify the params object

  try {
    response = await axios.get(
      `http://localhost:4000/api/stocks/${symbol}/indicators/${indicator}?params=${stringParams}`
    );
    // console.log(response.data);
  } catch (error) {
    console.log("Error fetching stock data:", error);
  }
  console.log(response.data);
  return response.data;
}

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
async function flags_pennants(symbol) {
  try {
    const response = await fetch(
      `http://127.0.0.1:4000/api/stocks/flags-pennants?symbol=${symbol}`
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
  getIndicatorData,
  stockPriceSummary,
  correlationMatrix,
  consolidatingStocksFilter,
  japaneseCandlestickMarkers,
  japaneseCandlestickFilter,
  flags_pennants,
};
