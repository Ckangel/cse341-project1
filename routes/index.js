console.log("✅ routes/index.js loaded");

const express = require("express");
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../data/database");

const router = express.Router();
const dbName = "project1";

// --- GET all contacts ---
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/contacts", async (req, res) => {
  console.log("🔥 /contacts route hit");
  try {
    const db = getDatabase().db(dbName);
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// --- GET single contact by ID ---
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */
router.get("/contacts/:id", async (req, res) => {
  try {
    const db = getDatabase().db(dbName);
    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(req.params.id),
    });

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

// --- POST new contact ---
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Add a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               favoriteColor: { type: string }
 *               birthday: { type: string }
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post("/contacts", async (req, res) => {
  try {
    const db = getDatabase().db(dbName);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const result = await db.collection("contacts").insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    res.status(201).json({ message: "Contact created", id: result.insertedId });
  } catch (err) {
    console.error("❌ Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact" });
  }
});

// --- PUT update contact ---
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               favoriteColor: { type: string }
 *               birthday: { type: string }
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 */
router.put("/contacts/:id", async (req, res) => {
  try {
    const db = getDatabase().db(dbName);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const result = await db
      .collection("contacts")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { firstName, lastName, email, favoriteColor, birthday } }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated" });
  } catch (err) {
    console.error("❌ Error updating contact:", err);
    res.status(500).json({ error: "Failed to update contact" });
  }
});

// --- DELETE contact ---
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
router.delete("/contacts/:id", async (req, res) => {
  try {
    const db = getDatabase().db(dbName);
    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    console.error("❌ Error deleting contact:", err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// --- Health check route ---
router.get("/", (req, res) => {
  res.send("👋 Contacts API is live!");
});

module.exports = router;
