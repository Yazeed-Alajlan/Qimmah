"use client";
import useFetch from "@/hooks/useFetch";
import axios from "axios";

function getStockInformationData(symbol) {
  const { data, error, loading } = useFetch(`/api/stocks/${symbol}`);
  return data;
}

function getStockFinancialData(symbol) {
  const { data, error, loading, refetch } = useFetch(
    `/api/financials/${symbol}`
  );
  return { data, error, loading, refetch };
}

function getStockPriceData(symbol) {
  const { data, error, loading } = useFetch(`/api/prices/${symbol}`);
  return data;
}

export { getStockInformationData, getStockFinancialData, getStockPriceData };
