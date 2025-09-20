const { MongoClient } = require("mongodb");
require("dotenv").config();

let client;

console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);

const initDb = async (callback) => {
  const uri = process.env.MONGODB_URI;
  if (!uri)
    return callback(
      new Error("MONGODB_URI is not defined in environment variables")
    );

  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log(" ✅ Database Connected!");
    callback();
  } catch (err) {
    callback(err);
  }
};

const getDatabase = () => {
  if (!client) throw new Error("❌ Database not initialized");
  return client; // ✅ This must be the MongoClient instance
};

module.exports = { initDb, getDatabase };
