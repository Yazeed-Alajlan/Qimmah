import { connectToDatabase } from "@/db/db";
import StockInformation from "@/db/models/stockInformation";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    const stocks = await StockInformation.aggregate([
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
          summary: { $arrayElemAt: ["$summary", -1] }, // Get the last element from the summary array
          equityProfile: { $arrayElemAt: ["$equityProfile", -1] }, // Get the last element from the equityProfile array
        },
      },
    ]);

    if (!stocks || stocks.length === 0) {
      return new NextResponse({
        status: 404,
        body: { error: "Stock not found" },
      });
    }
    return new NextResponse(JSON.stringify(stocks));
  } catch (error) {
    console.error("Error retrieving stocks data:", error);
    return new NextResponse({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
}
