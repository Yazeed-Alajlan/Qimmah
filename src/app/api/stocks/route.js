import { connectToDatabase } from "@/db/db";
import StockInformation from "@/db/models/stockInformation";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    console.log("GEEEEEEEEEEET ALLLL");
    // Connect to the MongoDB database
    await connectToDatabase();
    const stocks = await StockInformation.find().select(
      "symbol companyNameEN sectorNameEn tradingNameEn sectorNameAr tradingNameAr companyNameAR market_type summary"
    );
    if (!stocks) {
      return new NextResponse({
        status: 404,
        body: { error: "Stock not found" },
      });
    }
    console.log("GEEEEEEEEEEET ALLLL DONENOEDONENOONEDON");

    return new NextResponse(JSON.stringify(stocks));
  } catch (error) {
    console.error("Error retrieving stock financials:", error);
    return new NextResponse({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
}
