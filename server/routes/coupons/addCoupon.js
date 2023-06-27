const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const Coupons = require("../../models/coupons");

router.post(
  "/add-coupon",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const {
      id,
      name,
      type,
      amount,
      usagePerUser,
      perUser,
      startDate,
      endDate,
      minimumAmount,
    } = req.body;

    try {
      const isExsist = await Coupons.findOne({ id });

      if (isExsist) {
        await Coupons.updateOne(
          { id },
          {
            $set: {
              name,
              type,
              amount,
              usagePerUser,
              perUser,
              startDate,
              endDate,
              minimumAmount,
            },
          }
        );

        return res.status(200).json({ success: true });
      }

      await Coupons.create({
        id,
        name,
        type,
        amount,
        usagePerUser,
        perUser,
        startDate,
        endDate,
        minimumAmount,
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
