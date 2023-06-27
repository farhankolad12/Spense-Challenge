const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const checkAuthSuperAdmin = require("../../middlewares/checkAuthSuperAdmin");

const Attributes = require("../../models/attributes");

router.post(
  "/add-attribute",
  checkAuthAdmin,
  checkAuthSuperAdmin,
  async (req, res) => {
    const { id, name } = req.body;

    try {
      await Attributes.create({
        id,
        name,
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
