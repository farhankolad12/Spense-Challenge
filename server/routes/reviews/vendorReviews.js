const express = require("express");
const router = express.Router();

const Reviews = require("../../models/reviews");
const Vendors = require("../../models/admins");

router.get("/vendor-review", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await Reviews.find({ vendorId: id });
    const vendorName = await Vendors.findOne({ id });
    return res
      .status(200)
      .json(vendorName ? [...data, vendorName.storeName] : null);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
