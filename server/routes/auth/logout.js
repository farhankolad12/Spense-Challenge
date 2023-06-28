const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");

router.post("/logout", checkAuth, async (req, res) => {
  res.clearCookie("userToken")
  return res.status(200).json({ success: true });
});

module.exports = router;
