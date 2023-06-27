const express = require("express");
const router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");

router.post("/logout", checkAuth, async (req, res) => {
  return res.status(200).clearCookie("userToken").json({ success: true });
});

module.exports = router;
