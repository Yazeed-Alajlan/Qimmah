"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const StocksDataContext = React.createContext();

export function useStocksData() {
  return useContext(StocksDataContext);
}

export function StocksDataProvider({ children }) {
  const [stocksData, setStocksData] = useState();
  const [selectedStock, setSelectedStock] = useState();
  // console.log(selectedStock);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stocks");
        const data = await response.json();
        console.log("fetch data");
        console.log(data);
        setStocksData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const value = {
    stocksData,
    setStocksData,
    selectedStock,
    setSelectedStock,
    // getStockFinancialData,
    // getStockInformationData,
    // getStockPriceData,
    // getIndicatorData,
  };

  return (
    <StocksDataContext.Provider value={value}>
      {children}
    </StocksDataContext.Provider>
  );
}

//  async function getStockFinancialData(symbol) {
//    return axios
//      .get(`/api/financials/${symbol}`)
//      .then((response) => response.data)
//      .catch((error) => {
//        console.error("Error fetching data:", error);
//        throw error;
//      });
//  }
//  async function getStockInformationData(symbol) {
//    let response;
//    try {
//      response = await axios.get(`/api/stocks/${symbol}`);
//      console.log(response.data);
//    } catch (error) {
//      console.error("Error fetching data:", error);
//    }

//    return response.data;
//  }
//  async function getStockPriceData(symbol) {
//    let response;
//    try {
//      response = await axios.get(`/api/prices/${symbol}`);

//      // console.log(response.data);
//    } catch (error) {
//      console.error("Error fetching stock data:", error);
//    }

//    return response.data;
//  }
//  async function getIndicatorData(symbol, indicator, params) {
//    let response;
//    console.log(params);
//    const stringParams = JSON.stringify(params); // Stringify the params object

//    try {
//      response = await axios.get(
//        `http://localhost:5000/python-api/${symbol}/indicators/${indicator}?params=${stringParams}`
//      );
//      // console.log(response.data);
//    } catch (error) {
//      console.log("Error fetching stock data:", error);
//    }
//    console.log(response.data);
//    return response.data;
//  }
