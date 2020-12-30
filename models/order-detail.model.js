const db = require("../utils/database");
const TABLE_NAME = "orderdetails";

module.exports = {
  all() {
    return db.load(`select * from ${TABLE_NAME}`);
  },

  add(newObj) {
    return db.add(newObj, TABLE_NAME);
  },

  del(Obj) {
    const condition = { CatID: Obj.CatID };
    return db.del(condition, TABLE_NAME);
  },

  update(Obj) {
    const condition = { CatID: Obj.CatID };
    return db.update(Obj, condition, TABLE_NAME);
  },

  async getSingle(id) {
    const rows = await db.load(`select * from ${TABLE_NAME} where ID = ${id} `);
    if (rows.length === 0) return null;
    return rows[0];
  },
};
