const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");
const router = require(".");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

module.exports = router;

router.use("/contacts", require("./routes/contacts"));

router.get("/contacts", async (req, res) => {
  console.log("🔥 /contacts route hit");
  try {
    const db = getDatabase();
    const contacts = await db.collection("contacts").find().toArray();
    console.log("Contacts:", contacts);
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

module.exports = router;
