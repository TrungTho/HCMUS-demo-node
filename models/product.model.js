const db = require("../utils/database");

module.exports = {
  all() {
    return db.load("select * from products");
  },

  byCat(catID) {
    return db.load(`select * from products where CatID = ${catID}`);
  },
};
