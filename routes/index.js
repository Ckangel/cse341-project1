const router = require("express").Router();
exports.router = router;

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
