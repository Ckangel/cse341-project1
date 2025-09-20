console.log("✅ routes/index.js loaded");
const { getDatabase } = require("../data/database");
const { ObjectId } = require("mongodb");

const express = require("express");

const router = express.Router();

// GET all contacts
router.get("/contacts", async (req, res) => {
  console.log("🔥 /contacts route hit");
  try {
    const client = getDatabase();
    const db = client.db("project1");
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// ✅ Get single contact by ID
router.get("/contacts/:id", async (req, res) => {
  try {
    const client = getDatabase();
    const db = client.db("project1");
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error("❌ Error fetching contact:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch contact", details: err.message });
  }
});

// GET Test route/
router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
