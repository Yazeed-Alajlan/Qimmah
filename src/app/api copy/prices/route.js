import { connectToDatabase } from "@/db/db";
import StockPrices from "@/db/models/stockPrices";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();
    const stocks = await StockPrices.find();

    if (!stocks) {
      return new NextResponse({
        status: 404,
        body: { error: "Stock not found" },
      });
    }

    return new NextResponse(JSON.stringify(stocks));
  } catch (error) {
    console.error("Error retrieving stock financials:", error);
    return new NextResponse({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
}
