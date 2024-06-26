import axios from "axios";

async function getStockFinancials(symbol) {
  return axios
    .get(`/api/stocks/financials/${symbol}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

async function getFinancialMetric(name) {
  console.log(name);
  const stocksData = await fetchAllStocksInformationData();

  try {
    if (stocksData) {
      const formattedData = await Promise.all(
        stocksData.map(async (stock) => {
          try {
            const financialData = await fetchStockFinancialData(stock.symbol);
            if (financialData) {
              const functionName = `calculate${name}`; // Assuming the function name follows a specific pattern
              const calculatedValue = eval(`${functionName}(financialData)`);
              return {
                company: stock.symbol + " - " + stock.tradingNameAr,
                sectorNameAr: stock.sectorNameAr,
                [name]: calculatedValue,
              };
            }
          } catch (error) {
            console.error(`Error fetching data for ${stock.symbol}:`, error);
            // If an error occurs fetching data for a stock, return null for that stock
            return null;
          }
        })
      );
      const filteredData = formattedData.filter((data) => data !== null);
      return filteredData;
    }
    return [];
  } catch (error) {
    console.error("Error while calculating working capital ratios:", error);
    return [];
  }
}

function calculateWorkingCapitalRatio(financialData) {
  console.log(financialData);
  const currentAssets = parseFloat(
    financialData.balanceSheet[0].current_assets.replace(/,/g, "")
  );
  const currentLiabilities = parseFloat(
    financialData.balanceSheet[0].current_liabilities.replace(/,/g, "")
  );
  const workingCapitalRatio = currentAssets / currentLiabilities;
  return workingCapitalRatio.toFixed(2);
}

function calculateGrossProfitMargin(financialData) {
  const sales = parseFloat(
    financialData.incomeSheet[0].total_income.replace(/,/g, "")
  );
  const costOfGoodsSold = parseFloat(
    financialData.incomeSheet[0].sales_cost.replace(/,/g, "")
  );
  const grossProfit = sales - costOfGoodsSold;

  if (!isNaN(sales) && !isNaN(costOfGoodsSold) && sales !== 0) {
    const grossProfitMargin = (grossProfit / sales) * 100;
    return grossProfitMargin.toFixed(2);
  } else {
    return null;
  }
}

function calculateNetProfitMargin(financialData) {
  const netIncome = parseFloat(
    financialData.incomeSheet[0].net_income.replace(/,/g, "")
  );
  const totalIncome = parseFloat(
    financialData.incomeSheet[0].total_income.replace(/,/g, "")
  );

  if (!isNaN(netIncome) && !isNaN(totalIncome) && totalIncome !== 0) {
    const netProfitMargin = (netIncome / totalIncome) * 100;
    return netProfitMargin.toFixed(2);
  } else {
    return null;
  }
}

function calculateLeverage(financialData) {
  const totalLiabilities = parseFloat(
    financialData.balanceSheet[0].total_liabilities_and_shareholder_equity.replace(
      /,/g,
      ""
    )
  );
  const shareholdersEquity = parseFloat(
    financialData.balanceSheet[0].shareholders_equity.replace(/,/g, "")
  );

  if (
    !isNaN(totalLiabilities) &&
    !isNaN(shareholdersEquity) &&
    shareholdersEquity !== 0
  ) {
    const leverage = totalLiabilities / shareholdersEquity;
    return leverage.toFixed(2);
  } else {
    return null;
  }
}

function calculateDebtToEquityRatio(financialData) {
  const totalDebt = parseFloat(
    financialData.balanceSheet[0].total_debt.replace(/,/g, "")
  );
  const shareholdersEquity = parseFloat(
    financialData.balanceSheet[0].shareholders_equity.replace(/,/g, "")
  );

  if (
    !isNaN(totalDebt) &&
    !isNaN(shareholdersEquity) &&
    shareholdersEquity !== 0
  ) {
    const debtToEquityRatio = totalDebt / shareholdersEquity;
    return debtToEquityRatio.toFixed(2);
  } else {
    return null;
  }
}

export { getStockFinancials, getFinancialMetric };
