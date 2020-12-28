const express = require("express");
const router = express.Router();
const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");

router.get("/", async function (req, res) {
  const items = [];
  for (let ci of req.session.cart) {
    const datum = await productModel.getSingle(ci.id);

    items.push({
      ...ci,
      product: datum,
      Amount: ci.quantity * datum.Price,
    });
  }

  let totalMoney = 0;
  for (let item of items) {
    totalMoney += item.Amount;
  }

  res.render("vCart/index.hbs", {
    items,
    isEmpty: req.session.cart.length === 0,
    totalMoney,
  });
});

router.post("/add", async function (req, res) {
  const quantity = +req.body.quantity;
  const id = +req.body.proid;
  //console.log(proid + quantity);
  console.log(req.session.cart);

  cartModel.add(req.session.cart, { id, quantity });
  res.redirect(req.headers.referer);
});

module.exports = router;
