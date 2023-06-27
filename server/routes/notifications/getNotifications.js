const express = require("express");
const router = express.Router();

const Notifications = require("../../models/notifications");

const checkAuth = require("../../middlewares/checkAuth");

router.get("/get-notifications", checkAuth, async (req, res) => {
  const currentUser = req.user;

  try {
    const data = await Notifications.find({ uid: currentUser.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
