const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const Coupons = require("../../models/coupons");

router.post(
  "/delete-coupon",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id } = req.body;

    try {
      await Coupons.deleteOne({ id });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
