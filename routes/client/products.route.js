const express = require("express");
const router = express.Router();
const productModel = require("../../models/product.model");

router.get("/byCat/:id", async function (req, res) {
  const catID = req.params.id;
  // console.log(res.locals.listCategories);
  //highlight in main cat
  for (const c of res.locals.listCategories) {
    if (c.CatID === +catID) {
      c.isSelected = true;
      // console.log(catID);
    }
    // console.log(c.CatID);
  }

  const rows = await productModel.byCat(catID);
  // console.log("---------------");
  // console.log(rows);
  // console.log("---------------");
  // console.log(rows.length === 0);
  res.render("vProduct/byCat", {
    products: rows,
    isEmpty: rows.length === 0,
  });
});

module.exports = router;
