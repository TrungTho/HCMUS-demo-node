const express = require("express");
const router = express.Router();
const productModel = require("../../models/product.model");

router.get("/", async function (req, res) {
  try {
    const rows = await productModel.all();
    console.log(rows);
    res.render("vProduct/index", {
      products: rows,
      isEmpty: rows.length === 0,
    });
  } catch (err) {
    console.error(err);
    res.send("error, please check server console log.");
  }
});

module.exports = router;
