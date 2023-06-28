const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

router.post("/admin-logout", checkAuthAdmin, async (req, res) => {
  res.clearCookie("adminToken", {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    path: "/",
    secure: true,
    sameSite: "none"
  })
  return res.status(200).json({ success: true });
});

module.exports = router;
