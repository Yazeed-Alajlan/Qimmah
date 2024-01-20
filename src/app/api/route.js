import { connectToDatabase } from "@/db/db";
import StockInformation from "@/db/models/stockInformation";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    const symbol = "2222";
    const stock = await StockInformation.findOne({ symbol: symbol });
    if (!stock) {
      return new NextResponse({
        status: 404,
        body: { error: "Stock not found" },
      });
    }

    return new NextResponse(JSON.stringify(stock));
  } catch (error) {
    console.error("Error retrieving stock:", error);
    return new NextResponse({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
}
