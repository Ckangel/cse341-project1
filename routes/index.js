const express = require("express");
const router = express.Router();
const { getDatabase } = require("../data/database");

// GET /contacts
router.get("/contacts", async (req, res) => {
  console.log("🔥 /contacts route hit");
  try {
    const db = getDatabase();
    const contacts = await db.collection("contacts").find().toArray();
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// GET /
router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;

///  const router = require("express").Router();
///  exports.router = router;

///  router.get("/", (req, res) => {
///  res.send("Contacts API");
/// });

// Keep Hello World for testing
/// router.get("/", (req, res) => {
///  res.send("Hello World!");
/// });

///  module.exports = router;
