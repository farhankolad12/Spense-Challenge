const express = require("express");
const router = express.Router();

// Middlewares
const checkAuth = require("../../middlewares/checkAuth");
const { upload } = require("../../middlewares/upload");

// Models
const EndUsers = require("../../models/endusers");

router.post("/save-profile", checkAuth, upload.any(), async (req, res) => {
  const currentUser = req.user;
  const { fullName, email, mobile, profileImg } = req.body;

  try {
    await EndUsers.updateOne(
      { id: currentUser.id },
      {
        $set: {
          fullName,
          email,
          mobile,
          profileImg: req.files[0] ? req.files[0].filename : profileImg,
        },
      }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
});

module.exports = router;
