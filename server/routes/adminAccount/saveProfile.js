const express = require("express");
const router = express.Router();

// Middlewares
const checkAuthAdmin = require("../../middlewares/checkAuthAdmin");
const { upload } = require("../../middlewares/upload");

// Models
const Admins = require("../../models/admins");

router.post("/save-profile", checkAuthAdmin, upload.any(), async (req, res) => {
  const currentUser = req.user;
  const { storeName, email, mobile, address } = req.body;

  try {
    await Admins.updateOne(
      { id: currentUser.id },
      {
        $set: {
          address,
          email,
          logo: req.files[0] ? req.files[0].filename : currentUser.logo,
          storeName,
          mobile,
        },
      }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, success: false });
  }
});

module.exports = router;
