"use client";
import React, { useState, useContext } from "react";
import axios from "axios";

const PytohnServerContext = React.createContext();

export function usePytohnServer() {
  return useContext(PytohnServerContext);
}

export function PytohnServerProvider({ children }) {
  async function consolidatingStocksFilter({
    numberOfCandles,
    percentageRange,
  }) {
    try {
      const url = `http://localhost:5000/python-api/consolidating-stocks?numberOfCandles=${numberOfCandles}&percentageRange=${percentageRange}`;
      const response = await axios.get(url);
      console.log(response.data);
      setFilteredStocks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function japaneseCandlestickFilter({ pattern }) {
    try {
      const response = await fetch(
        `http://localhost:5000/python-api/japanese-candlestick-patterns/${pattern}`
      );

      if (response.ok) {
        const data = await response.json();
        setFilteredStocks(data[pattern]);
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
        `http://localhost:5000/python-api/japanese-candlestick-patterns-markers?symbol=${symbol}`
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

  const value = {
    consolidatingStocksFilter,
    japaneseCandlestickFilter,

    japaneseCandlestickMarkers,
    correlationMatrix,
  };

  return (
    <PytohnServerContext.Provider value={value}>
      {children}
    </PytohnServerContext.Provider>
  );
}
