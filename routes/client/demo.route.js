const express = require("express");
const router = express.Router();

router.get("/editor", async function (req, res) {
  res.render("vDemo/editor");
});

module.exports = router;
