const express = require("express");
const router = express.Router();

const EndUsers = require("../../models/endusers");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

router.get(
  "/customers",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    try {
      const data = await EndUsers.find({}, { otp: 0, password: 0 });
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
