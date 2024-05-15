import { connectToDatabase } from "@/db/db";
import StockInformation from "@/db/models/stockInformation";
import { NextResponse } from "next/server";

export async function GET(req, { params, query }) {
  try {
    await connectToDatabase();
    const symbol = params.symbol;
    const searchParams = new URLSearchParams(new URL(req.url).searchParams);
    const detailed = searchParams.get("detailed") === "true";

    let aggregationPipeline = [
      { $match: { symbol: symbol } }, // Match documents with the specified symbol
    ];

    if (detailed) {
      aggregationPipeline.push(
        { $limit: 1 }, // Limit to one document (the latest)
        {
          $project: {
            symbol: 1,
            companyNameEN: 1,
            sectorNameEn: 1,
            tradingNameEn: 1,
            sectorNameAr: 1,
            tradingNameAr: 1,
            companyNameAR: 1,
            market_type: 1,
            companyProfile: 1,
            subsidiary: 1,
            shareholdingInformation: 1,
            summary: { $arrayElemAt: ["$summary", -1] }, // Get the last element from the summary array
            ComparisonData: { $arrayElemAt: ["$ComparisonData", -1] }, // Get the last element from the ComparisonData array
            StatsOverview: { $arrayElemAt: ["$StatsOverview", -1] }, // Get the last element from the StatsOverview array
            equityProfile: { $arrayElemAt: ["$equityProfile", -1] }, // Get the last element from the equityProfile array
          },
        }
      );
    } else {
      aggregationPipeline.push({
        $project: {
          symbol: 1,
          companyNameEN: 1,
          sectorNameEn: 1,
          tradingNameEn: 1,
          sectorNameAr: 1,
          tradingNameAr: 1,
          companyNameAR: 1,
          market_type: 1,
          summary: { $arrayElemAt: ["$summary", -1] }, // Get the last element from the summary array
        },
      });
    }

    const stockObj = await StockInformation.aggregate(aggregationPipeline);

    if (!stockObj || stockObj.length === 0) {
      return new NextResponse({
        status: 404,
        body: { error: "Stock not found" },
      });
    }

    return new NextResponse(JSON.stringify(stockObj[0]));
  } catch (error) {
    console.error("Error retrieving stock financials:", error);
    return new NextResponse({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
}
