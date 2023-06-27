const express = require("express");
const router = express.Router();

const SubCategory = require("../../models/subcategory");

router.get("/get-subcategory-id", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await SubCategory.findOne({ id });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-subcategory-category-id", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await SubCategory.find({ categoryId: id });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
