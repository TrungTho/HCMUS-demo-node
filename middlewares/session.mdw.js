const session = require("express-session");

module.exports = function (app) {
  //config express-session
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: "SECRET_KEY",
      resave: false,
      saveUninitialized: true,
      cookie: {
        // secure: true,
      },
    })
  );
};
