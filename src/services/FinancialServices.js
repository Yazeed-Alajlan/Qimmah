import axios from "axios";
import { fetchAllStocksInformationData } from "@/services/FetchServices";

async function getAllBasicEarningsPerShareTTM() {
  const stocksData = await fetchAllStocksInformationData();
  if (stocksData) {
    console.log(stocksData);
    const formattedData = stocksData.map((data) => ({
      company: data.symbol + " - " + data.tradingNameAr,
      sectorNameAr: data.sectorNameAr,
      basic_earnings_per_share_ttm:
        data.summary[data.summary.length - 1].basic_earnings_per_share_ttm,
    }));
    console.log(formattedData);

    return formattedData;
  }
  return [];
}

export { getAllBasicEarningsPerShareTTM };
