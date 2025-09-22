require("dotenv").config();
console.log("🔍 Loaded DB_USER:", process.env.DB_USER);
console.log("🔍 Loaded DB_PASS:", process.env.DB_PASS);
console.log("🔍 Loaded DB_NAME:", process.env.DB_NAME);

require("dotenv").config();
console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);

const express = require("express");

const { initDb } = require("./data/database");
const routes = require("./routes"); // Import all routes from routes/index.js

const app = express();

// Middleware
app.use(express.json());

// Root test endpoint
app.get("/", (req, res) => {
  res.send("API is live! Try /contacts to see contacts' data");
});
app.get("/info", (req, res) => {
  res.json({
    message: "Welcome to the Contacts API 🚀",
    endpoints: {
      allContacts: "/contacts",
      singleContact: "/contacts/:id",
      addContact: "/contacts (POST)",
      updateContact: "/contacts/:id (PUT)",
      deleteContact: "/contacts/:id (DELETE)",
    },
  });
});

// Mount all routes (contacts etc.)
app.use("/", routes);

const PORT = process.env.PORT || 3000;

// Start server only after DB is initialized
initDb((err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err);
  } else {
    app.listen(PORT, () => {
      console.log(`✅ Database is listening and node Running on port ${PORT}`);
    });
  }
});
