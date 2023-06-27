const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

// Middlewares
const checkAuth = require("../../middlewares/checkAuth");

// Models
const EndUsers = require("../../models/endusers");

router.post("/change-password", checkAuth, async (req, res) => {
  const currentUser = req.user;
  const { oldPass, newPass } = req.body;

  try {
    const isExists = await EndUsers.findOne({ id: currentUser.id });

    if (isExists && (await bcrypt.compare(oldPass, isExists.password))) {
      const hasPassword = await bcrypt.hash(newPass, 10);
      await EndUsers.updateOne(
        { id: currentUser.id },
        { $set: { password: hasPassword } }
      );
      return res.status(200).json({ success: true });
    }
    return res
      .status(401)
      .json({ success: false, message: "Invalid Password!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
