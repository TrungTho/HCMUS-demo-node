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
    }
  }

  console.log("in bycat: " + res.locals.isLogin);

  const rows = await productModel.byCat(catID);
  res.render("vProduct/byCat", {
    products: rows,
    isEmpty: rows.length === 0,
  });
});

router.get("/detail/:id", async function (req, res) {
  const datum = await productModel.getSingle(req.params.id);
  if (datum === null) {
    return res.redirect("/");
  }

  res.render("vProduct/detail", {
    product: datum,
  });
});

module.exports = router;
