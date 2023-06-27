const express = require("express");
const router = express.Router();

const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

router.post("/admin-logout", checkAuthAdmin, async (req, res) => {
  return res.status(200).clearCookie("adminToken").json({ success: true });
});

module.exports = router;
