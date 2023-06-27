const express = require("express");
const router = express.Router();

const Category = require("../../models/category");
const SubCategory = require("../../models/subcategory");
const InnerSubCategory = require("../../models/innersubcategory");

router.get("/get-all-categories", async (req, res) => {
  try {
    const category = await Category.find();
    const subCategory = await SubCategory.find();
    const innerSubCategory = await InnerSubCategory.find();

    return res.status(200).json({ category, subCategory, innerSubCategory });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
