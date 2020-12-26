const db = require("../utils/database");
const TABLE_NAME = "products";

module.exports = {
  all() {
    return db.load("select * from products");
  },

  byCat(catID) {
    return db.load(`select * from products where CatID = ${catID}`);
  },

  async getSingle(id) {
    const rows = await db.load(
      `select * from ${TABLE_NAME} where ProID = ${id} `
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
};
