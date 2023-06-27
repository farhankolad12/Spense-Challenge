const express = require("express");
const router = express.Router();

// Middlewares
const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");

// Models
const EndUsers = require("../../models/endusers");

router.get("/get-info", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await EndUsers.findOne(
      { id },
      {
        email: 0,
        id: 0,
        isVerified: 0,
        password: 0,
        otp: 0,
        mobile: 0,
      }
    );

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
