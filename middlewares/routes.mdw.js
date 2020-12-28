const isAuth = require("./auth.mdw");

module.exports = function (app) {
  //tao ra tai nguyen web
  //req - request tu client, res - response tu server
  app.get("/", (req, res) => {
    res.render("home");

    console.log("still ok");

    //console.log(res.locals.listCategories);
    // console.log(req.session.isLogin);
    // console.log(req.session.loggedinUser);
  });

  app.get("/bs4", (req, res) => {
    const isShow = +req.query.show || "0"; //dau + la ep ve kieu chuoi

    res.render("bs3", {
      //this
      layout: false, //khong connect voi file layouts.main.handlebars
      data: { visible: isShow != "0" }, //truyen tham so cho handlebar if condition ben ui cua file bs3.hbs
    });
  });

  app.get("/myRoute", (req, res) => {
    throw new error("BROKEN");
    res.sendFile(`${__dirname}/bs4.html`);
  });

  app.use("/admin/categories", require("../routes/admin/category.route"));
  app.use("/admin/products", require("../routes/admin/product.route"));
  app.use("/products", require("../routes/client/products.route"));
  app.use("/account", require("../routes/client/account.route"));
  app.use("/cart", isAuth, require("../routes/client/cart.route"));
};
