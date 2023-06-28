const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

router.post("/admin-logout", checkAuthAdmin, async (req, res) => {
  res.clearCookie("adminToken")
  return res.status(200).json({ success: true });
});

module.exports = router;
