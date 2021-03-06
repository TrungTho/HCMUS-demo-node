const db = require("../utils/database");
const TABLE_NAME = "users";

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
    const rows = await db.load(
      `select * from ${TABLE_NAME} where f_ID = ${id} `
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  async getSingleByUsername(username) {
    const rows = await db.load(
      `select * from ${TABLE_NAME} where f_Username = "${username}" `
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  async getPassByUsername(username) {
    const rows = await db.load(
      `select f_password from ${TABLE_NAME} where f_Username = "${username}" `
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
};
