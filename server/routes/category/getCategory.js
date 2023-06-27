const express = require("express");
const router = express.Router();

const Category = require("../../models/category");

router.get("/get-category", async (req, res) => {
  try {
    const data = await Category.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
