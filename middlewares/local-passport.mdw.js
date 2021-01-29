const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    console.log(username + "-----" + password);
    const datum = await userModel.getSingleByUsername(username);

    if (datum !== null) {
      const ret = bcrypt.compareSync(password, datum.f_Password);
      if (ret) {
        return done(null, datum);
      }
    }
    return done(null, false);
  })
);

//auth success
passport.serializeUser((user, done) => {
  done(null, user.f_Username);
});

//direct when success
passport.deserializeUser(async function (username, done) {
  const datum = await userModel.getSingleByUsername(username);

  if (datum !== null) {
    return done(null, datum);
  } else {
    return done(null, false);
  }
});

module.exports = passport;
