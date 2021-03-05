const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const CookieStrategy = require("passport-cookie").Strategy;
const { ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.auth_token;
  }
  return token;
};

passport.use(
  new JwtStrategy(
    {
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //local storage
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), //cookie
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

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const datum = await userModel.getSingleByUsername(username);

      if (datum !== null) {
        const ret = bcrypt.compareSync(password, datum.f_Password);

        if (ret) {
          return done(null, datum);
        }
      }
      return done(null, false);
    } catch (error) {
      done(error, false);
    }
  })
);

// passport.use(
//   new CookieStrategy(
//     {
//       cookieName: "auth_token",
//     },
//     async function (req, token, done) {
//       if (token) {
//         console.log("token: ", token);
//         try {
//           jwt.verify(token, "privateKey", (err, decodedToken) => {
//             if (err) {
//               console.log("err:", err);
//               return done(err, false);
//             } else {
//               console.log(decodedToken);
//               return done(null, true);
//             }
//           });
//         } catch (error) {
//           done(error, false);
//         }
//       } else {
//         return done(null, false);
//       }
//     }
//   )
// );
