const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const userModel = require("../models/user.model");

passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "privateKey",
    },
    async (payload, done) => {
      try {
        const datum = await userModel.getSingleByUsername(payload.sub); //get datum in db

        if (!datum) {
          return done(null, false); //return null if datum is not existed
        }

        done(null, datum); //return datum as user if everything true
      } catch (error) {
        done(error, false); //loi
      }
    }
  )
);
