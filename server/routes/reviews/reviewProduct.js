const express = require("express");
const router = express.Router();

const Reviews = require("../../models/reviews");

router.get("/product-review", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Reviews.find({ productId: id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
