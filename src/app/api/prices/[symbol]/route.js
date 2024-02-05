import { connectToDatabase } from "@/db/db";
import StockPrices from "@/db/models/stockPrices";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const symbol = params.symbol;
    const stock = await StockPrices.findOne({ symbol: symbol });
    const dateFrom = req.nextUrl.searchParams.get("dateFrom");
    const dateEnd = req.nextUrl.searchParams.get("dateEnd");
    const date = req.nextUrl.searchParams.get("date");
    console.log(date);
    console.log(dateFrom);
    console.log(dateEnd);
    if (!stock) {
      return new NextResponse({
        status: 404,
        body: { error: "Stock not found" },
      });
    }

    if (date) {
      console.log("Daily");
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const filteredQuotes = stock.quotes.filter((quote) => {
        const quoteDate = new Date(quote.date).toISOString().split("T")[0];
        return quoteDate === formattedDate;
      });
      stock.quotes = filteredQuotes[0];
      console.log(filteredQuotes[0]);
    }

    if (dateFrom && dateEnd) {
      console.log("Interval");
      const filteredQuotes = stock.quotes.filter((quote) => {
        return (
          quote.date >= new Date(dateFrom) && quote.date <= new Date(dateEnd)
        );
      });

      stock.quotes = filteredQuotes;
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
