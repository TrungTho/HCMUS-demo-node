const express = require("express");
const router = express.Router();
const cartModel = require("../../models/cart.model");

router.get("/", async function (req, res) {});

router.post("/add", async function (req, res) {
  const quantity = +req.body.quantity;
  const id = +req.body.proid;
  //   console.log(proid + quantity);

  cartModel.add(req.session.cart, { id, quantity });
  res.redirect(req.headers.referer);
});

module.exports = router;
