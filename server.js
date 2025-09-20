const express = require("express");

const { initDb } = require("./data/database");
const routes = require("./routes");

/// const mongodb = require("./data/database");
const app = express();
app.use(express.json());

// Mount routes
// app.use("/", routes);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Contacts API 🚀",
    endpoints: {
      allContacts: "/contacts",
      singleContact: "/contacts/:id",
    },
  });
});

/// const port = process.env.PORT || 3000;

/// app.use("/", require("./routes"));

/// mongodb.initDb((err) => {
initDb((err) => {
  if (err) {
    /// console.log(err);
    console.error(err);
  } else {
    app.listen(3000, () => {
      console.log(`Database is listening and node Running on port 3000`);
    });
  }
});
