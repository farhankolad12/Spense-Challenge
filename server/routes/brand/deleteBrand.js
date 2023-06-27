const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const Brands = require("../../models/brand");

router.post(
  "/delete-brand",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id } = req.body;

    try {
      await Brands.deleteOne({ id });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  }
);

module.exports = router;
