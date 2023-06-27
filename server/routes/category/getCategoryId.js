const express = require("express");
const router = express.Router();

const Category = require("../../models/category");

router.get("/get-category-id", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Category.findOne({ id });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
