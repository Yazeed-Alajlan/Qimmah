import mongoose from "mongoose";

const pricesSchema = new mongoose.Schema({
  symbol: String,
  quotes: [
    {
      date: Date,
      open: Number,
      close: Number,
      high: Number,
      low: Number,
      volume: Number,
    },
  ],
});

const Prices = mongoose.models.Prices || mongoose.model("Prices", pricesSchema);

export default Prices;
