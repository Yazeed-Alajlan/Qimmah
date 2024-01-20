import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/stockDB";
console.log(MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedConnection = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const dbConnection = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedConnection = dbConnection;

  return dbConnection;
}
