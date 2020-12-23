const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../../models/user.model");

router.get("/login", async function (req, res) {
  res.render("vAccount/login", {
    layout: false,
  });
});

router.post("/login", async function (req, res) {
  const datum = await userModel.getSingleByUsername(req.body.f_Username);
  // console.log("---");
  // console.log(inputUsername);
  // console.log(inputPassword);
  // console.log("---");
  // console.log(datum);

  //login information is correct!!!
  if (datum !== null) {
    const ret = bcrypt.compareSync(req.body.f_Password, datum.f_Password);
    if (ret) {
      req.session.isLogin = true;
      req.session.loggedinUser = datum;
      res.redirect("/");
    }
  }

  //login information is wrong
  res.render("vAccount/login", {
    layout: false,
    err_message: "Somethings wrong, please check again!!!",
  });
});

router.get("/is-available", async function (req, res) {
  const username = req.query.user;
  const datum = await userModel.getSingleByUsername(username);
  if (datum === null) return res.json(true);
  //console.log(datum);
  return res.json(false);
});

router.get("/register", async function (req, res) {
  res.render("vAccount/register");
});

router.post("/register", async function (req, res) {
  try {
    const hashedPass = bcrypt.hashSync(req.body.f_Password, 10);
    const convertedDOB = moment(req.body.f_DOB, "DD/MM/YYY").format(
      "YYYY/MM/DD"
    );
    const newUser = {
      f_Username: req.body.f_Username,
      f_Password: hashedPass,
      f_DOB: convertedDOB,
      f_Name: req.body.f_Name,
      f_Email: req.body.f_Email,
      f_Permission: 0,
    };
    await userModel.add(newUser);
    // console.log(newUser);
    // console.log("hihi");
    res.render("vAccount/register");
  } catch (error) {
    res.render("vAccount/register", {
      err_message: "Somethings wrong, please check again!!!",
    });
  }
});

module.exports = router;
