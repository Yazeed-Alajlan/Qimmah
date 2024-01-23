import useFetch from "@/hooks/useFetch";

function getStockInformationData(symbol) {
  const { data, error, loading } = useFetch(`/api/stocks/${symbol}`);
  return data;
}

function getStockFinancialData(symbol) {
  const { data, error, loading } = useFetch(`/api/financials/${symbol}`);
  return data;
}

function getStockPriceData(symbol) {
  const { data, error, loading } = useFetch(`/api/prices/${symbol}`);
  return data;
}

export { getStockInformationData, getStockFinancialData, getStockPriceData };
