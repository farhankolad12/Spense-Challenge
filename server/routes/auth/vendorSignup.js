const express = require("express");
const router = express.Router();

const Admins = require("../../models/admins");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../../services/otp");
const { sendOTP } = require("../../services/emailService");

router.post("/vendor-signup", async (req, res) => {
  const { id, email, firstName, lastName, mobile, password } = req.body;

  try {
    const isExists = await Admins.findOne({ email });

    if (isExists !== null) {
      return res
        .status(401)
        .json({ message: "Email already exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUsers = new Admins({
      id,
      firstName,
      lastName,
      email,
      mobile,
      password: hashPassword,
      type: "vendor",
    });

    await newUsers.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
