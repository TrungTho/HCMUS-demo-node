const mysql = require("mysql");
const util = require("util");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "qlbh",
  connectionLimit: 50,
});

const poolQuery = util.promisify(pool.query).bind(pool);

module.exports = {
  load(myQuery) {
    return poolQuery(myQuery);
  },

  add(newObj, tableName) {
    return poolQuery(`insert into ${tableName} set ?`, newObj);
  },

  del(condition, tableName) {
    return poolQuery(`delete from ${tableName} where ?`, condition);
  },

  update(Obj, condition, tableName) {
    return poolQuery(`update ${tableName} set ? where ?`, [Obj, condition]);
  },
  // loadDB(myQuery) {
  //   return new Promise(function (done, fail) {
  //     //pool.connect(); //no need
  //     pool.query(myQuery, function (err, results, field) {
  //       if (err) {
  //         fail(err);
  //       } else {
  //         done(results);
  //       }
  //       pool.end();
  //     });
  //   });
  // },
};
