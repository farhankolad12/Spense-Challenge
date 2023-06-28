const express = require("express");
const router = express.Router();

const Vendors = require("../../models/admins");

const jwt = require("jsonwebtoken");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

router.post(
  "/login-vendor",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id } = req.body;

    try {
      const vendor = await Vendors.findOne({ type: "vendor", id });

      if (vendor) {
        vendor.password = undefined;

        const token = jwt.sign({ user: vendor }, process.env.JWT_SECRECT_KEY, {
          expiresIn: "1d",
        });
        const options = {
          expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          path: "/",
          secure: true
        };
        return res
          .status(200)
          .cookie("adminToken", token, options)
          .json({ success: true });
      }

      return res.status(500).json({ success: false, message: "Not allowed!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
