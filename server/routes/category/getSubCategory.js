const express = require("express");
const router = express.Router();

const SubCategory = require("../../models/subcategory");

router.get("/get-subcategory", async (req, res) => {
  try {
    const data = await SubCategory.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
