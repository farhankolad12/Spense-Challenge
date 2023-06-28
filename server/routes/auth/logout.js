const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");

router.post("/logout", checkAuth, async (req, res) => {
  res.clearCookie("userToken", {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    path: "/",
    secure: true,
    sameSite: "none"
  })
  return res.status(200).json({ success: true });
});

module.exports = router;
