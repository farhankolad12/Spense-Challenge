const express = require("express");
const router = express.Router();

const Brands = require("../../models/brand");

router.get("/get-brand", async (req, res) => {
  try {
    const data = await Brands.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-brand-id", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Brands.findOne({ id });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
