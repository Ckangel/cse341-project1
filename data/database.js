require("dotenv").config();
const { MongoClient } = require("mongodb");

let client;

const initDb = async (callback) => {
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const dbName = process.env.DB_NAME;

  if (!user || !pass || !dbName) {
    return callback(new Error("❌ Missing DB credentials in environment"));
  }

  const uri = `mongodb+srv://${user}:${pass}@cluster0.cz9zwrc.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Database Connected!");
    callback();
  } catch (err) {
    callback(err);
  }
};

const getDatabase = () => {
  if (!client) throw new Error("❌ Database not initialized");
  return client;
};

module.exports = { initDb, getDatabase };
