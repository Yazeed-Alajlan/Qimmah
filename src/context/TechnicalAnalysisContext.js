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

  const value = {
    filteredStocks,
    setFilteredStocks,
    selectedIndicators,
    setSelectedIndicators,
    selectedStock,
    setSelectedStock,
    getIndicatorData,
  };

  return (
    <TechnicalAnalysisContext.Provider value={value}>
      {children}
    </TechnicalAnalysisContext.Provider>
  );
}
