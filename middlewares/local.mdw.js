const categoryModel = require("../models/category.model");

module.exports = function (app) {
  //transfer from req.session to res.locals so that view can get data
  app.use(async function (req, res, next) {
    if (req.session.isLogin === null) {
      req.session.isLogin = false;
    }

    res.locals.isLogin = req.session.isLogin;
    res.locals.loggedinUser = req.session.loggedinUser;

    next();
  });

  app.use(async function (req, res, next) {
    const rows = await categoryModel.getAllCategoryWithCount();
    res.locals.listCategories = rows;
    next();
  });
};
