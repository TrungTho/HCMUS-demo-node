const express = require("express");
const exphbs = require("express-handlebars");
const numeral = require("numeral");
const hbs_sections = require("express-handlebars-sections");
require("express-async-errors");

const app = express();

//parser
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static("public"));

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      section: hbs_sections(),
      format(val) {
        return numeral(val).format("0,0");
      },
    },
  })
); //thay doi dinh dang duoi file main layout
// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//tai su dung middleware
app.use(require("./middlewares/local.mdw"));

//tao ra tai nguyen web
//req - request tu client, res - response tu server
app.get("/", (req, res) => {
  //res.send('Hello World!');
  res.render("home");
  console.log(res.locals.listCategories);
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

app.use("/admin/categories", require("./routes/admin/category.route"));
app.use("/admin/products", require("./routes/admin/product.route"));
app.use("/products", require("./routes/client/products.route"));
app.use("/account", require("./routes/client/account.route"));

//default route
app.use(function (req, res) {
  res.render("404", {
    layout: false,
  });
});

// false url err
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.render("500", {
    layout: false,
  });
});

//lang nghe o cong
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
