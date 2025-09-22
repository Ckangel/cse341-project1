const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const router = require(".");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", contactsController.createcontact);

router.put("/:id", contactsController.updatecontact);

router.delete("/:id", contactsController.deletecontact);

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const createcontact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const updatecontact = {
  $set: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  },

  const deletecontact = {:
  $set: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  },

module.exports = {
  getAll,
  getSingle,
  createcontact,
  updatecontact,
  deletecontact,
};
};
  const result = await mongodb

    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contact);
  res.status(201).json(result);
};

