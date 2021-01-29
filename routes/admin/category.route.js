const express = require("express");
const router = express.Router();
const categoryModel = require("../../models/category.model");

router.get("/", async function (req, res) {
  //khong can try catch do ngoai index.js da co server error handling
  const rows = await categoryModel.all();
  //  console.log(rows);
  res.render("vCategory/index", {
    categories: rows,
    isEmpty: rows.length === 0,
  });
});

router.get("/add", async function (req, res) {
  res.render("vCategory/add");
});

router.post("/add", async function (req, res) {
  console.log(req.body);
  const ret = await categoryModel.add(req.body);
  //console.log(ret);
  res.render("vCategory/add");
});

router.post("/del", async function (req, res) {
  //console.log(req.body);
  const ret = await categoryModel.del(req.body);
  res.redirect("/admin/categories");
});

router.post("/update", async function (req, res) {
  //console.log(req.body);
  const ret = await categoryModel.update(req.body);
  res.redirect("/admin/categories");
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const datum = await categoryModel.getSingle(id);
  // console.log("------------------");
  // console.log(datum);
  if (datum === null) {
    return res.redirect("/admin/categories");
  } else {
    res.render("vCategory/edit", {
      category: datum,
    });
  }
});

module.exports = router;
