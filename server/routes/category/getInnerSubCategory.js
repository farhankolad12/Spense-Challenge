const express = require("express");
const router = express.Router();

const InnerSubCategory = require("../../models/innersubcategory");

router.get("/get-innersubcategory", async (req, res) => {
  try {
    const data = await InnerSubCategory.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-innersubcategory-id", async (req, res) => {
  const { id, categoryId } = req.query;
  try {
    const data = await InnerSubCategory.find({ categoryId, subCategoryId: id });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
