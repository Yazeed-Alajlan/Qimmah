"use client";

import React, { useState, useContext } from "react";

const TechnicalAnalysisContext = React.createContext();

export function useTechnicalAnalysis() {
  return useContext(TechnicalAnalysisContext);
}

export function TechnicalAnalysisProvider({ children }) {
  const [filteredStocks, setFilteredStocks] = useState();
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [selectedStock, setSelectedStock] = useState();

  const value = {
    filteredStocks,
    setFilteredStocks,
    selectedIndicators,
    setSelectedIndicators,
    selectedStock,
    setSelectedStock,
  };

  return (
    <TechnicalAnalysisContext.Provider value={value}>
      {children}
    </TechnicalAnalysisContext.Provider>
  );
}
