const router = require("express").Router();
exports.router = router;

router.get("/", (req, res) => {
  res.send("Contacts API");
});

// Keep Hello World for testing
router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;

//  const express = require("express");
/// const router = express.Router();
/// const { getDb } = require("../data/database");

// Route to display contacts
/// router.get("./contacts", async (req, res) => {
/// try {
///   const data = getDatabase();
///   const contacts = await data.database("contacts").find().toArray();
///    res.json(contacts); // send as JSON to browser
///////// } catch (err) {
///   res.status(500).json({ error: "Failed to fetch contacts" });
// }
// });

// Keep Hello World for testing
// router.get("/", (req, res) => {
// res.send("Hello World!");
/// });

///  module.exports = router;
