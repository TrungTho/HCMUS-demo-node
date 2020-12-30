const express = require("express");
const router = express.Router();
const cartModel = require("../../models/cart.model");
const orderModel = require("../../models/order.model");
const productModel = require("../../models/product.model");
const moment = require("moment");

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

  // let totalMoney = 0;
  // for (let item of items) {
  //   totalMoney += item.Amount;
  // }

  // console.log(
  //   "in render: " + (await cartModel.getTotalMoney(req.session.cart))
  // );

  res.render("vCart/index.hbs", {
    items,
    isEmpty: req.session.cart.length === 0,
    totalMoney: await cartModel.getTotalMoney(req.session.cart),
  });
});

router.post("/add", async function (req, res) {
  let quantity = +req.body.quantity;
  const id = +req.body.proid;
  //console.log(proid + quantity);
  // console.log(req.session.cart);
  // quantity += 1;
  cartModel.add(req.session.cart, { id, quantity });
  res.redirect(req.headers.referer);
});

router.post("/remove", async function (req, res) {
  cartModel.del(req.session.cart, +req.body.id);
  //console.log(" --- " + req.body.id);
  res.redirect(req.headers.referer);
});

router.post("/confirm", async function (req, res) {
  //step 1: add data to order table
  const newOrder = {
    OrderDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    UserID: req.session.loggedinUser.f_ID,
    Total: await cartModel.getTotalMoney(req.session.cart),
  };

  await orderModel.add(newOrder);
  console.log(newOrder);

  //step 2: add data to order detail table...

  //step 3: clear cart
  req.session.cart = [];
  res.redirect(req.headers.referer);
});

module.exports = router;
