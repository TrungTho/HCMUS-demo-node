const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../../models/user.model");
const Auth = require("../../middlewares/auth.mdw");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("../../middlewares/passport.mdw");
const jwt = require("jsonwebtoken");

const encodedToken = (userID) => {
  return jwt.sign(
    {
      iss: "HCMUSStudents",
      sub: userID,
      iat: new Date().getTime(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    "privateKey"
  );
};

router.get("/login", async function (req, res) {
  const pass = req.query.hehe;
  console.log(pass);
  const trytogetpass = await userModel.getPassByUsername("admin");
  let item = [];
  item.push(trytogetpass);
  const ret = bcrypt.compareSync(pass, String(trytogetpass));
  item.push(ret);
  res.send(item);
});

//using passport
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async function (req, res) {
    if (req.user == "Unauthorized") {
      res.send({ success: false });
    } else {
      const token = encodedToken(req.user.f_Username);

      //res.setHeader("Authorization", token);
      res.cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, //1hour
      });
      res.send({ success: true });
    }
  }
);

//test function
// router.post("/login", async function (req, res) {
//   const token = encodedToken(req.body.username);
//   console.log(token);
//   res.send(token);
// });

router.post("/logout", async function (req, res) {
  req.session.isLogin = false;
  req.session.loggedinUser = null;
  req.session.cart = []; //reset cart to empty when client log out

  res.clearCookie("auth_token").send("Log out successful!!!");

  // res.redirect(req.headers.referer);
  res.redirect("/");
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

router.get("/profile", Auth, async function (req, res) {
  res.render("vAccount/profile");
});

router.post("/profile", async function (req, res) {
  try {
    res.render("vAccount/profile");
  } catch (error) {
    res.render("vAccount/profile", {
      err_message: "Somethings wrong, please check again!!!",
    });
  }
});

module.exports = router;
