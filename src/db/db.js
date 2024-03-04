import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://yazeedal3jlan:p8pBtAzqaDl27dk0@cluster0.6vsagou.mongodb.net/stockDB";
// console.log(process.env.CONNECTION_STRING);

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
