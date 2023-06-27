const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const Coupons = require("../../models/coupons");

router.get(
  "/get-coupons",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    try {
      const data = await Coupons.find();
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.get(
  "/get-coupon-id",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id } = req.query;

    try {
      const data = await Coupons.findOne({ id });
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
