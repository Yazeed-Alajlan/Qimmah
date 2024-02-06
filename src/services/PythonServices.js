import axios from "axios";

async function stockPriceSummary(symbol) {
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

export { stockPriceSummary, correlationMatrix };
