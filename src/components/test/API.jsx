"use client";
// Your React component file
import { usePytohnServer } from "@/context/pytohnServerContext";
import React, { useState, useEffect } from "react";

const YourComponent = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const { correlationMatrix } = usePytohnServer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(correlationMatrix(["4321", "2222"]));
        const response = await fetch("/api/prices/4321");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setStockData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : stockData ? (
        <pre>{JSON.stringify(stockData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default YourComponent;
