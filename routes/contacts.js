const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");
const router = require(".");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

module.exports = router;

router.use("/contacts", require("./routes/contacts"));

module.exports = router;
