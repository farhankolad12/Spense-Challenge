const express = require("express");
const router = express.Router();

const NewsLetter = require("../../models/newsletter");

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

router.get(
  "/get-subscribers",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    try {
      const data = await NewsLetter.find();
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
