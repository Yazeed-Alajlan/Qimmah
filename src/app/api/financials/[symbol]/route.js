import { connectToDatabase } from "@/db/db";
import StockFinancials from "@/db/models/stockFinancials";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    // const searchParams = req.nextUrl.searchParams;
    // const name = searchParams.get("symbol");

    const symbol = params.symbol;
    const stock = await StockFinancials.findOne({ symbol: symbol });

    if (!stock) {
      return new NextResponse({
        status: 404,
        body: { error: "Stock not found" },
      });
    }

    return new NextResponse(JSON.stringify(stock));
  } catch (error) {
    console.error("Error retrieving stock financials:", error);
    return new NextResponse({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
}
