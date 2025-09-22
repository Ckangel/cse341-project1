require("dotenv").config();

console.log("🔍 Loaded DB_USER:", process.env.DB_USER);
console.log("🔍 Loaded DB_PASS:", process.env.DB_PASS);
console.log("🔍 Loaded DB_NAME:", process.env.DB_NAME);

const express = require("express");
const { swaggerUI, specs } = require("./swagger");
const { initDb } = require("./data/database");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger UI docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Routes
app.use("/", routes);

// Start server only after DB is initialized
initDb((err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err);
  } else {
    console.log("✅ Database Connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  }
});
