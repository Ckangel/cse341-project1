const express = require("express");
const router = express.Router();
const { getDatabase } = require("../data/database");

const { ObjectId } = require("mongodb");

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

// GET single contact by ID
router.get("/contacts/:id", async (req, res) => {
  try {
    const db = getDatabase();
    const contactId = req.params.id;

    // Convert string ID to ObjectId
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

// GET Test route/
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
