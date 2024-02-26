"use client";

import axios from "axios";
import React, { useState, useContext } from "react";

const TechnicalAnalysisContext = React.createContext();

export function useTechnicalAnalysis() {
  return useContext(TechnicalAnalysisContext);
}

export function TechnicalAnalysisProvider({ children }) {
  const [filteredStocks, setFilteredStocks] = useState();
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [selectedStock, setSelectedStock] = useState();

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

  async function consolidatingStocksFilter({
    numberOfCandles,
    percentageRange,
  }) {
    try {
      const url = `http://localhost:4000/api/stocks/consolidating-stocks?numberOfCandles=${numberOfCandles}&percentageRange=${percentageRange}`;
      const response = await axios.get(url);
      console.log(response.data);
      setFilteredStocks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function japaneseCandlestickFilter({ pattern }) {
    console.log(pattern);
    try {
      const response = await fetch(
        `http://localhost:4000/api/stocks/japanese-candlestick-patterns/${pattern}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data[pattern]);
        setFilteredStocks(data[pattern]);
      } else {
        console.error("Failed to send pattern");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const value = {
    filteredStocks,
    setFilteredStocks,
    selectedIndicators,
    setSelectedIndicators,
    selectedStock,
    setSelectedStock,
    getIndicatorData,
    consolidatingStocksFilter,
    japaneseCandlestickFilter,
  };

  return (
    <TechnicalAnalysisContext.Provider value={value}>
      {children}
    </TechnicalAnalysisContext.Provider>
  );
}
